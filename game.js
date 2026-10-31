
// ==========================================
// 六軌音樂節奏遊戲 - game.js
// ==========================================

// ===== Supabase 設定（選用）=====
// 請填入自己的 Supabase Project URL 和 anon / publishable key
// 絕對不要使用 service_role 或 secret key
const SUPABASE_URL = "";
const SUPABASE_KEY = "";

// ===== 基本設定 =====
const $ = id => document.getElementById(id);

const canvas = $("stage");
const ctx = canvas ? canvas.getContext("2d") : null;
const audio = $("audio");

const LANES = 6;
const KEYS = ["d", "f", "j", "k", "l", ";"];
const LANE_NAMES = ["D", "F", "J", "K", "L", ";"];

const WIDTH = 600;
const HEIGHT = 700;
const HIT_LINE_Y = 590;
const NOTE_SPEED = 360;
const NOTE_HEIGHT = 18;
const SPAWN_DISTANCE = 8;

// ===== 遊戲狀態 =====
let gameRunning = false;
let gamePaused = false;
let isDemo = false;
let isEditor = false;

let score = 0;
let combo = 0;
let maxCombo = 0;

let perfectNotes = 0;
let goodNotes = 0;
let missNotes = 0;
let hitNotes = 0;
let totalNotes = 0;

let activeNotes = [];
let chart = [];
let chartIndex = 0;

let startTime = 0;
let pauseTime = 0;
let pausedDuration = 0;
let lastFrameTime = 0;

let animationId = null;
let gameDuration = 0;

let selectedMusicURL = null;
let selectedMusicName = "";

let difficulty = "normal";
let chartMode = "auto";

let bestScore = Number(localStorage.getItem("bestScore") || 0);

// ===== 編輯器狀態 =====
let editorChart = [];
let editorRecording = false;
let editorStartTime = 0;

// ===== 示範模式 =====
let demoPauseStart = 0;
let demoPausedDuration = 0;

// ===== 音符設定 =====
const difficultySettings = {
    easy: {
        speed: 300,
        interval: 0.95,
        missRange: 0.23,
        goodRange: 0.15,
        perfectRange: 0.07
    },
    normal: {
        speed: 360,
        interval: 0.65,
        missRange: 0.22,
        goodRange: 0.12,
        perfectRange: 0.055
    },
    hard: {
        speed: 430,
        interval: 0.42,
        missRange: 0.20,
        goodRange: 0.10,
        perfectRange: 0.045
    }
};

// ===== 初始化 Supabase =====
let supabaseClient = null;

if (
    SUPABASE_URL &&
    SUPABASE_KEY &&
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
}

// ==========================================
// DOM 顯示工具
// ==========================================

function showOnly(id) {
    const sections = [
        "lobby",
        "game",
        "pause",
        "result",
        "editor",
        "records",
        "account"
    ];

    sections.forEach(sectionId => {
        const element = $(sectionId);
        if (element) {
            element.classList.toggle("hidden", sectionId !== id);
        }
    });
}

function updateText(id, value) {
    const element = $(id);
    if (element) {
        element.textContent = value;
    }
}

function getDifficulty() {
    const element = $("difficulty");
    return element ? element.value : "normal";
}

function getChartMode() {
    const element = $("chartMode");
    return element ? element.value : "auto";
}

// ==========================================
// 本機最高分
// ==========================================

function loadBestScore() {
    bestScore = Number(localStorage.getItem("bestScore") || 0);
    updateText("bestScore", bestScore);
}

function saveBestScore(value) {
    if (value > bestScore) {
        bestScore = value;
        localStorage.setItem("bestScore", String(bestScore));
    }

    updateText("bestScore", bestScore);
    updateText("resultBestScore", bestScore);
}

// ==========================================
// 選擇音樂
// ==========================================

const musicInput = $("musicFile");

if (musicInput) {
    musicInput.addEventListener("change", event => {
        const file = event.target.files[0];

        if (!file) return;

        if (selectedMusicURL) {
            URL.revokeObjectURL(selectedMusicURL);
        }

        selectedMusicURL = URL.createObjectURL(file);
        selectedMusicName = file.name;

        if (audio) {
            audio.src = selectedMusicURL;
            audio.load();
        }

        updateText("musicName", selectedMusicName);
    });
}

// ==========================================
// 自動譜面
// ==========================================

function generateNotes(duration) {
    const settings = difficultySettings[difficulty];

    const result = [];
    let time = 1.5;

    while (time < duration - 1) {
        const lane = Math.floor(Math.random() * LANES);

        result.push({
            time,
            lane
        });

        // 偶爾同時出現兩個音符
        if (Math.random() < 0.12) {
            let secondLane = Math.floor(Math.random() * LANES);

            while (secondLane === lane) {
                secondLane = Math.floor(Math.random() * LANES);
            }

            result.push({
                time: time + 0.04,
                lane: secondLane
            });
        }

        time += settings.interval *
            (0.8 + Math.random() * 0.4);
    }

    return result.sort((a, b) => a.time - b.time);
}

// ==========================================
// 示範譜面
// ==========================================

function makeDemoChart() {
    const result = [];

    for (let i = 0; i < 80; i++) {
        result.push({
            time: 1 + i * 0.5,
            lane: i % LANES
        });
    }

    return result;
}

// ==========================================
// 重設遊戲資料
// ==========================================

function resetGameData() {
    score = 0;
    combo = 0;
    maxCombo = 0;

    perfectNotes = 0;
    goodNotes = 0;
    missNotes = 0;
    hitNotes = 0;
    totalNotes = 0;

    activeNotes = [];
    chartIndex = 0;

    pausedDuration = 0;
    pauseTime = 0;

    updateText("score", "0");
    updateText("combo", "0");
    updateText("judgement", "READY");
    updateText("accuracy", "100%");
}

// ==========================================
// 開始遊戲
// ==========================================

async function startGame(demo = false) {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    isDemo = demo;
    isEditor = false;
    gameRunning = true;
    gamePaused = false;

    difficulty = getDifficulty();
    chartMode = getChartMode();

    resetGameData();

    showOnly("game");

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (demo) {
        chart = makeDemoChart();
        gameDuration = 45;
        demoPausedDuration = 0;
    } else if (chartMode === "manual" && editorChart.length > 0) {
        chart = editorChart.slice();
    } else {
        chart = [];
    }

    if (!demo && selectedMusicURL && audio) {
        try {
            audio.src = selectedMusicURL;
            audio.load();

            await new Promise(resolve => {
                if (audio.readyState >= 1) {
                    resolve();
                    return;
                }

                audio.addEventListener("loadedmetadata", resolve, {
                    once: true
                });

                audio.addEventListener("error", resolve, {
                    once: true
                });
            });

            gameDuration = Number.isFinite(audio.duration)
                ? audio.duration
                : 180;

        } catch (error) {
            console.error("音樂載入失敗：", error);
            gameDuration = 180;
        }
    } else if (!demo) {
        alert("請先選擇一首音樂！");
        gameRunning = false;
        showOnly("lobby");
        return;
    }

    if (chartMode === "auto" && !demo) {
        chart = generateNotes(gameDuration);
    }

    chart.sort((a, b) => a.time - b.time);

    startTime = performance.now();
    lastFrameTime = startTime;

    if (!demo && audio) {
        audio.currentTime = 0;

        try {
            await audio.play();
        } catch (error) {
            console.warn("音樂播放失敗：", error);
        }
    }

    if (!gameRunning) return;

    animationId = requestAnimationFrame(gameLoop);
}

// ==========================================
// 遊戲時間
// ==========================================

function getElapsedTime(now) {
    if (isDemo) {
        return (
            (now - startTime - demoPausedDuration) / 1000
        );
    }

    return (
        (now - startTime - pausedDuration) / 1000
    );
}

// ==========================================
// 產生音符
// ==========================================

function spawnNotes(elapsed) {
    while (
        chartIndex < chart.length &&
        chart[chartIndex].time <= elapsed + SPAWN_DISTANCE
    ) {
        const note = chart[chartIndex];

        activeNotes.push({
            time: note.time,
            lane: note.lane,
            hit: false,
            missed: false
        });

        chartIndex++;
    }
}

// ==========================================
// 繪製背景
// ==========================================

function drawBackground() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#090b18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const laneWidth = canvas.width / LANES;

    for (let i = 0; i < LANES; i++) {
        ctx.fillStyle = i % 2 === 0
            ? "rgba(255,255,255,0.035)"
            : "rgba(255,255,255,0.07)";

        ctx.fillRect(
            i * laneWidth,
            0,
            laneWidth,
            canvas.height
        );

        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, canvas.height);
        ctx.stroke();
    }

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, HIT_LINE_Y);
    ctx.lineTo(canvas.width, HIT_LINE_Y);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";

    for (let i = 0; i < LANES; i++) {
        ctx.fillText(
            LANE_NAMES[i],
            laneWidth * (i + 0.5),
            canvas.height - 20
        );
    }
}

// ==========================================
// 繪製音符
// ==========================================

function drawNotes(elapsed) {
    if (!ctx || !canvas) return;

    const settings = difficultySettings[difficulty];
    const laneWidth = canvas.width / LANES;

    activeNotes.forEach(note => {
        if (note.hit || note.missed) return;

        const distance = note.time - elapsed;
        const y = HIT_LINE_Y - distance * settings.speed;

        if (y < -NOTE_HEIGHT || y > canvas.height) return;

        const x = note.lane * laneWidth + 7;

        const colors = [
            "#ff4f91",
            "#ff9f43",
            "#ffe66d",
            "#4cd7f6",
            "#7d83ff",
            "#b56cff"
        ];

        ctx.fillStyle = colors[note.lane];
        ctx.shadowColor = colors[note.lane];
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.roundRect(
            x,
            y,
            laneWidth - 14,
            NOTE_HEIGHT,
            7
        );
        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

// ==========================================
// 更新畫面
// ==========================================

function updateHUD() {
    updateText("score", score);
    updateText("combo", combo);

    const totalJudged =
        perfectNotes + goodNotes + missNotes;

    const accuracy = totalJudged > 0
        ? (
            (perfectNotes * 100 + goodNotes * 70) /
            totalJudged
        ).toFixed(1)
        : "100.0";

    updateText("accuracy", accuracy + "%");
}

// ==========================================
// 判定音符
// ==========================================

function hitLane(lane) {
    if (!gameRunning || gamePaused || isEditor) return;

    const settings = difficultySettings[difficulty];
    const elapsed = getElapsedTime(performance.now());

    let target = null;
    let smallestDistance = Infinity;

    activeNotes.forEach(note => {
        if (
            note.hit ||
            note.missed ||
            note.lane !== lane
        ) return;

        const distance = Math.abs(note.time - elapsed);

        if (
            distance < smallestDistance &&
            distance <= settings.missRange
        ) {
            smallestDistance = distance;
            target = note;
        }
    });

    if (!target) return;

    target.hit = true;
    hitNotes++;

    if (smallestDistance <= settings.perfectRange) {
        score += 300;
        combo++;
        perfectNotes++;
        updateText("judgement", "PERFECT");
    } else if (smallestDistance <= settings.goodRange) {
        score += 100;
        combo++;
        goodNotes++;
        updateText("judgement", "GOOD");
    } else {
        combo = 0;
        missNotes++;
        updateText("judgement", "MISS");
    }

    maxCombo = Math.max(maxCombo, combo);

    updateHUD();
}

// ==========================================
// MISS 判定
// ==========================================

function checkMisses(elapsed) {
    const settings = difficultySettings[difficulty];

    activeNotes.forEach(note => {
        if (note.hit || note.missed) return;

        if (
            elapsed - note.time >
            settings.missRange
        ) {
            note.missed = true;
            missNotes++;
            combo = 0;
            updateText("judgement", "MISS");
        }
    });

    updateHUD();

    activeNotes = activeNotes.filter(note => {
        return !note.hit && !note.missed;
    });
}

// ==========================================
// 遊戲主迴圈
// ==========================================

function gameLoop(now) {
    if (!gameRunning || gamePaused) return;

    const elapsed = getElapsedTime(now);

    drawBackground();

    spawnNotes(elapsed);
    drawNotes(elapsed);
    checkMisses(elapsed);

    if (isDemo) {
        if (elapsed >= gameDuration) {
            finishGame();
            return;
        }
    } else if (audio && audio.ended) {
        if (
            chartIndex >= chart.length &&
            activeNotes.length === 0
        ) {
            finishGame();
            return;
        }
    } else if (!audio && elapsed >= gameDuration) {
        finishGame();
        return;
    }

    lastFrameTime = now;
    animationId = requestAnimationFrame(gameLoop);
}

// ==========================================
// 暫停遊戲
// ==========================================

function pauseGame() {
    if (!gameRunning || gamePaused) return;

    gamePaused = true;
    pauseTime = performance.now();

    if (isDemo) {
        demoPauseStart = pauseTime;
    }

    if (audio && !isDemo) {
        audio.pause();
    }

    showOnly("pause");
}

function resumeGame() {
    if (!gameRunning || !gamePaused) return;

    const now = performance.now();

    if (isDemo) {
        demoPausedDuration += now - demoPauseStart;
    } else {
        pausedDuration += now - pauseTime;
    }

    gamePaused = false;

    showOnly("game");

    if (audio && !isDemo) {
        audio.play().catch(error => {
            console.warn("音樂繼續播放失敗：", error);
        });
    }

    lastFrameTime = now;
    animationId = requestAnimationFrame(gameLoop);
}

// ==========================================
// 結束遊戲
// ==========================================

function finishGame() {
    if (!gameRunning) return;

    gameRunning = false;
    gamePaused = false;

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    if (audio) {
        audio.pause();
    }

    saveBestScore(score);

    const accuracy = (
        perfectNotes * 100 + goodNotes * 70
    ) / Math.max(
        1,
        perfectNotes + goodNotes + missNotes
    );

    const accuracyText = accuracy.toFixed(1);

    updateText("finalScore", score);
    updateText("resultBestScore", bestScore);

    updateText(
        "recordMessage",
        score >= bestScore
            ? "恭喜！創下最高分！"
            : "再接再厲！"
    );

    updateText(
        "resultSummary",
        "最高連擊：" + maxCombo +
        "　PERFECT：" + perfectNotes +
        "　GOOD：" + goodNotes +
        "　MISS：" + missNotes +
        "　準確率：" + accuracyText + "%"
    );

    saveRecord({
        date: new Date().toLocaleString(),
        score,
        maxCombo,
        accuracy: accuracyText
    });

    showOnly("result");

    saveCloudScore();
}

// ==========================================
// 成績紀錄
// ==========================================

function getRecords() {
    try {
        return JSON.parse(
            localStorage.getItem("records") || "[]"
        );
    } catch {
        return [];
    }
}

function saveRecord(record) {
    const records = getRecords();

    records.unshift(record);

    localStorage.setItem(
        "records",
        JSON.stringify(records.slice(0, 50))
    );
}

function showRecords() {
    const list = $("recordList");
    if (!list) return;

    list.innerHTML = "";

    const records = getRecords();

    if (records.length === 0) {
        list.textContent = "目前沒有遊戲紀錄";
    } else {
        records.forEach((record, index) => {
            const item = document.createElement("div");

            item.className = "record-item";

            const title = document.createElement("strong");
            title.textContent =
                (index + 1) + ". " + record.score + " 分";

            const detail = document.createElement("p");
            detail.textContent =
                record.date +
                "｜最高連擊：" + record.maxCombo +
                "｜準確率：" + record.accuracy + "%";

            item.appendChild(title);
            item.appendChild(detail);

            list.appendChild(item);
        });
    }

    showOnly("records");
}

// ==========================================
// 手動譜面編輯器
// ==========================================

function openEditor() {
    isEditor = true;
    editorRecording = false;

    showOnly("editor");

    renderEditorChart();
}

function renderEditorChart() {
    const list = $("editorChartList");
    if (!list) return;

    list.innerHTML = "";

    if (editorChart.length === 0) {
        list.textContent = "目前沒有譜面";
        return;
    }

    editorChart.forEach((note, index) => {
        const item = document.createElement("div");

        item.className = "record-item";
        item.textContent =
            (index + 1) +
            ". 時間：" + note.time.toFixed(2) +
            " 秒，軌道：" + (note.lane + 1);

        list.appendChild(item);
    });
}

function startEditorRecording() {
    editorChart = [];
    editorRecording = true;
    editorStartTime = performance.now();

    updateText("editorStatus", "錄製中，按 D F J K L ; 加入音符");
}

function stopEditorRecording() {
    editorRecording = false;

    editorChart.sort((a, b) => a.time - b.time);

    updateText(
        "editorStatus",
        "錄製完成，共 " + editorChart.length + " 個音符"
    );

    renderEditorChart();
}

function recordNote(lane) {
    if (!editorRecording) return;

    const time =
        (performance.now() - editorStartTime) / 1000;

    editorChart.push({
        time,
        lane
    });

    updateText(
        "editorStatus",
        "已加入 " + editorChart.length + " 個音符"
    );
}

// ==========================================
// 鍵盤控制
// ==========================================

document.addEventListener("keydown", event => {
    const target = event.target;

    if (
        target &&
        (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT"
        )
    ) {
        return;
    }

    const key = event.key.toLowerCase();

    // 編輯器錄製
    if (isEditor && editorRecording) {
        const lane = KEYS.indexOf(key);

        if (lane !== -1) {
            recordNote(lane);
        }

        return;
    }

    // 遊戲按鍵
    const lane = KEYS.indexOf(key);

    if (lane !== -1) {
        hitLane(lane);
    }

    if (key === "escape" && gameRunning) {
        if (gamePaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }
});

// ==========================================
// 手機觸控按鍵
// ==========================================

const touchKeys = $("touchKeys");

if (touchKeys) {
    touchKeys.querySelectorAll("[data-lane]").forEach(button => {
        const lane = Number(button.dataset.lane);

        button.addEventListener("pointerdown", event => {
            event.preventDefault();

            if (isEditor && editorRecording) {
                recordNote(lane);
            } else {
                hitLane(lane);
            }
        });
    });
}

// ==========================================
// 按鈕事件
// ==========================================

// 開始遊戲
if ($("startBtn")) {
    $("startBtn").addEventListener("click", () => {
        startGame(false);
    });
}

// 示範遊戲
if ($("demoBtn")) {
    $("demoBtn").addEventListener("click", () => {
        startGame(true);
    });
}

// 暫停
if ($("pauseBtn")) {
    $("pauseBtn").addEventListener("click", pauseGame);
}

// 繼續
if ($("resumeBtn")) {
    $("resumeBtn").addEventListener("click", resumeGame);
}

// 結束遊戲
if ($("quitBtn")) {
    $("quitBtn").addEventListener("click", finishGame);
}

// 再玩一次
if ($("againBtn")) {
    $("againBtn").addEventListener("click", () => {
        startGame(isDemo);
    });
}

// 返回大廳
if ($("homeBtn")) {
    $("homeBtn").addEventListener("click", () => {
        gameRunning = false;
        gamePaused = false;

        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        showOnly("lobby");
    });
}

// 開啟編輯器
if ($("editorBtn")) {
    $("editorBtn").addEventListener("click", openEditor);
}

// 返回編輯器
if ($("editorBackBtn")) {
    $("editorBackBtn").addEventListener("click", () => {
        editorRecording = false;
        isEditor = false;
        showOnly("lobby");
    });
}

// 開始錄製譜面
if ($("recordChartBtn")) {
    $("recordChartBtn").addEventListener(
        "click",
        startEditorRecording
    );
}

// 停止錄製譜面
if ($("stopChartBtn")) {
    $("stopChartBtn").addEventListener(
        "click",
        stopEditorRecording
    );
}

// 清除譜面
if ($("clearChartBtn")) {
    $("clearChartBtn").addEventListener("click", () => {
        editorChart = [];
        editorRecording = false;

        updateText("editorStatus", "譜面已清除");
        renderEditorChart();
    });
}

// 儲存譜面
if ($("saveChartBtn")) {
    $("saveChartBtn").addEventListener("click", () => {
        localStorage.setItem(
            "manualChart",
            JSON.stringify(editorChart)
        );

        alert("譜面已儲存！");
    });
}

// 載入譜面
if ($("loadChartBtn")) {
    $("loadChartBtn").addEventListener("click", () => {
        try {
            editorChart = JSON.parse(
                localStorage.getItem("manualChart") || "[]"
            );

            renderEditorChart();
            updateText("editorStatus", "譜面載入完成");
        } catch (error) {
            alert("譜面載入失敗");
        }
    });
}

// 成績紀錄
if ($("recordsBtn")) {
    $("recordsBtn").addEventListener("click", showRecords);
}

// 返回大廳（成績）
if ($("recordsBackBtn")) {
    $("recordsBackBtn").addEventListener("click", () => {
        showOnly("lobby");
    });
}

// ==========================================
// Supabase 帳號功能（選用）
// ==========================================

async function updateAccountStatus() {
    const status = $("accountStatus");

    if (!status) return;

    if (!supabaseClient) {
        status.textContent = "目前使用本機模式，尚未設定雲端資料庫";
        return;
    }

    try {
        const { data } = await supabaseClient.auth.getSession();

        status.textContent = data.session
            ? "已登入：" + data.session.user.email
            : "尚未登入";
    } catch (error) {
        status.textContent = "帳號狀態讀取失敗";
    }
}

async function registerAccount() {
    if (!supabaseClient) {
        alert("請先設定 Supabase URL 和 Key");
        return;
    }

    const email = $("email")?.value.trim();
    const password = $("password")?.value;

    if (!email || !password) {
        alert("請輸入 Email 和密碼");
        return;
    }

    const { error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
    } else {
        alert("註冊成功，請依照設定完成 Email 驗證");
    }

    updateAccountStatus();
}

async function loginAccount() {
    if (!supabaseClient) {
        alert("請先設定 Supabase URL 和 Key");
        return;
    }

    const email = $("email")?.value.trim();
    const password = $("password")?.value;

    if (!email || !password) {
        alert("請輸入 Email 和密碼");
        return;
    }

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert(error.message);
    } else {
        alert("登入成功！");
    }

    updateAccountStatus();
}

async function logoutAccount() {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
    } else {
        alert("已登出");
    }

    updateAccountStatus();
}

async function saveCloudScore() {
    if (!supabaseClient) return;

    try {
        const { data } = await supabaseClient.auth.getUser();

        if (!data.user) return;

        const { error } = await supabaseClient
            .from("scores")
            .insert({
                user_id: data.user.id,
                score: score,
                max_combo: maxCombo,
                accuracy: Number(
                    (
                        perfectNotes * 100 + goodNotes * 70
                    ) / Math.max(
                        1,
                        perfectNotes + goodNotes + missNotes
                    )
                )
            });

        if (error) {
            console.error("雲端成績儲存失敗：", error);
        }
    } catch (error) {
        console.error("雲端儲存錯誤：", error);
    }
}

// 帳號按鈕
if ($("accountBtn")) {
    $("accountBtn").addEventListener("click", () => {
        showOnly("account");
        updateAccountStatus();
    });
}

if ($("registerBtn")) {
    $("registerBtn").addEventListener("click", registerAccount);
}

if ($("loginBtn")) {
    $("loginBtn").addEventListener("click", loginAccount);
}

if ($("logoutBtn")) {
    $("logoutBtn").addEventListener("click", logoutAccount);
}

if ($("accountBackBtn")) {
    $("accountBackBtn").addEventListener("click", () => {
        showOnly("lobby");
    });
}

// ==========================================
// 初始化
// ==========================================

function initializeGame() {
    loadBestScore();

    const savedChart = localStorage.getItem("manualChart");

    if (savedChart) {
        try {
            editorChart = JSON.parse(savedChart);
        } catch {
            editorChart = [];
        }
    }

    showOnly("lobby");
    updateAccountStatus();

    if (canvas) {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        drawBackground();
    }

    console.log("六軌音樂節奏遊戲已載入！");
}

initializeGame();
