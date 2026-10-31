"use strict";

/* =====================================
   1. 全域設定
===================================== */

const $ = selector => document.querySelector(selector);

let currentLanguage = "python";
let currentFilter = "all";
let currentCourse = null;
let currentLessonIndex = 0;

let pyodideInstance = null;
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let authMode = "login";

const STORAGE_KEYS = {
    progress: "programming_school_progress_v1",
    user: "programming_school_demo_user"
};

const languageNames = {
    python: "Python",
    cpp: "C++",
    html: "HTML",
    css: "CSS",
    js: "JavaScript"
};

const languageIcons = {
    python: "Py",
    cpp: "C++",
    html: "HTML",
    css: "CSS",
    js: "JS"
};

/* =====================================
   2. 課程資料
===================================== */

const courses = [
    {
        id: "python",
        name: "Python 程式設計",
        description: "從變數、條件判斷到迴圈與函式。",
        level: "初級",
        lessons: [
            {
                title: "認識 Python",
                description: "學習第一個 Python 程式。",
                content: `
                    <h4>什麼是 Python？</h4>
                    <p>Python 是一種容易閱讀、用途廣泛的程式語言，可以用來製作網站、遊戲、資料分析及人工智慧。</p>
                    <h4>第一個程式</h4>
                    <pre>print("Hello, World!")</pre>
                    <p><code>print()</code> 是輸出指令，可以把文字或數字顯示在畫面上。</p>
                    <h4>練習</h4>
                    <p>試著把編輯器中的文字改成自己的名字，再執行程式。</p>
                `,
                code: `print("Hello, World!")\nprint("歡迎來到程式學院")`
            },
            {
                title: "變數與資料型態",
                description: "學習如何儲存資料。",
                content: `
                    <h4>什麼是變數？</h4>
                    <p>變數可以想像成一個用來存放資料的盒子。</p>
                    <pre>name = "小明"\nage = 18\nscore = 95.5\nprint(name)\nprint(age)\nprint(score)</pre>
                    <p>字串使用引號，整數不需要引號，小數可以使用浮點數。</p>
                `,
                code: `name = "小明"\nage = 18\nscore = 95.5\n\nprint(name)\nprint(age)\nprint(score)`
            },
            {
                title: "條件判斷",
                description: "使用 if、else 做出判斷。",
                content: `
                    <h4>if 與 else</h4>
                    <p>程式可以根據條件，決定要執行哪一段程式碼。</p>
                    <pre>score = 80\n\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")</pre>
                    <p>注意：Python 使用縮排表示程式區塊。</p>
                `,
                code: `score = 80\n\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")`
            }
        ]
    },
    {
        id: "cpp",
        name: "C++ 程式設計",
        description: "學習輸入輸出、變數、判斷和迴圈。",
        level: "初級",
        lessons: [
            {
                title: "認識 C++",
                description: "建立第一個 C++ 程式。",
                content: `
                    <h4>第一個 C++ 程式</h4>
                    <pre>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    cout &lt;&lt; "Hello World";\n    return 0;\n}</pre>
                    <p><code>cout</code> 可以輸出資料，<code>main()</code> 是程式的主要入口。</p>
                `,
                code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}`
            },
            {
                title: "變數與輸入輸出",
                description: "使用 cin 和 cout。",
                content: `
                    <h4>變數</h4>
                    <p>C++ 使用 int 儲存整數，double 儲存小數，string 儲存文字。</p>
                    <pre>int age;\ncin >> age;\ncout << age;</pre>
                    <p><code>cin</code> 可以讀取使用者輸入。</p>
                `,
                code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << "請輸入年齡：";\n    cin >> age;\n    cout << "你的年齡是 " << age << endl;\n    return 0;\n}`
            },
            {
                title: "if 條件判斷",
                description: "根據條件執行不同程式。",
                content: `
                    <h4>if 與 else</h4>
                    <pre>int score = 80;\n\nif (score >= 60) {\n    cout << "及格";\n} else {\n    cout << "不及格";\n}</pre>
                    <p>大括號代表程式區塊。</p>
                `,
                code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 80;\n\n    if (score >= 60) {\n        cout << "及格" << endl;\n    } else {\n        cout << "不及格" << endl;\n    }\n    return 0;\n}`
            }
        ]
    },
    {
        id: "html",
        name: "HTML 網頁結構",
        description: "學習標題、段落、圖片和連結。",
        level: "初級",
        lessons: [
            {
                title: "認識 HTML",
                description: "建立第一個網頁。",
                content: `
                    <h4>HTML 是什麼？</h4>
                    <p>HTML 負責定義網頁的結構，例如標題、文字、圖片和按鈕。</p>
                    <pre>&lt;h1&gt;我的網頁&lt;/h1&gt;\n&lt;p&gt;你好！&lt;/p&gt;</pre>
                    <p>在編輯器按下執行，就能看到網頁預覽。</p>
                `,
                code: `<h1>我的第一個網頁</h1>\n<p>歡迎來到程式學院！</p>\n<button onclick="alert('你好！')">點擊我</button>`
            },
            {
                title: "標題與段落",
                description: "使用 h1、h2、p。",
                content: `
                    <h4>標題</h4>
                    <p>HTML 提供 h1 到 h6 六種標題層級。</p>
                    <pre>&lt;h1&gt;大標題&lt;/h1&gt;\n&lt;h2&gt;小標題&lt;/h2&gt;\n&lt;p&gt;這是一段文字。&lt;/p&gt;</pre>
                `,
                code: `<h1>我的學習筆記</h1>\n<h2>今天的課程</h2>\n<p>今天我學會了 HTML。</p>`
            },
            {
                title: "連結與圖片",
                description: "加入超連結和圖片。",
                content: `
                    <h4>超連結</h4>
                    <pre>&lt;a href="https://example.com"&gt;開啟網站&lt;/a&gt;</pre>
                    <h4>圖片</h4>
                    <pre>&lt;img src="圖片網址" alt="圖片說明"&gt;</pre>
                `,
                code: `<h1>我的網站</h1>\n<a href="https://example.com">前往網站</a>\n<p>這是一個範例頁面。</p>`
            }
        ]
    },
    {
        id: "css",
        name: "CSS 網頁設計",
        description: "學習顏色、字體、排版和動畫。",
        level: "初級",
        lessons: [
            {
                title: "認識 CSS",
                description: "讓網頁變得更漂亮。",
                content: `
                    <h4>CSS 是什麼？</h4>
                    <p>CSS 用來設定網頁的顏色、字體、大小和版面配置。</p>
                    <pre>h1 {\n    color: blue;\n    font-size: 30px;\n}</pre>
                    <p>HTML 負責結構，CSS 負責外觀。</p>
                `,
                code: `h1 {\n    color: purple;\n    text-align: center;\n}\n\np {\n    color: #555;\n    font-size: 18px;\n}`
            },
            {
                title: "顏色與字體",
                description: "設定文字顏色和字體。",
                content: `
                    <h4>設定顏色</h4>
                    <pre>p {\n    color: red;\n    background-color: yellow;\n}</pre>
                    <p>可以使用顏色名稱，也可以使用十六進位色碼。</p>
                `,
                code: `body {\n    font-family: Arial;\n}\n\nh1 {\n    color: #6558e8;\n}\n\np {\n    color: #555;\n}`
            },
            {
                title: "盒模型",
                description: "認識 margin、padding 和 border。",
                content: `
                    <h4>CSS 盒模型</h4>
                    <p>每個 HTML 元素都可以看成一個盒子。</p>
                    <ul>
                        <li>margin：外距</li>
                        <li>padding：內距</li>
                        <li>border：邊框</li>
                    </ul>
                `,
                code: `.card {\n    width: 200px;\n    padding: 20px;\n    margin: 20px;\n    border: 2px solid purple;\n    border-radius: 12px;\n}`
            }
        ]
    },
    {
        id: "js",
        name: "JavaScript 程式設計",
        description: "學習變數、函式、事件與互動。",
        level: "初級",
        lessons: [
            {
                title: "認識 JavaScript",
                description: "讓網頁具有互動功能。",
                content: `
                    <h4>JavaScript 是什麼？</h4>
                    <p>JavaScript 可以讓網頁回應使用者操作，例如點擊按鈕、計算數字和更新內容。</p>
                    <pre>console.log("Hello JavaScript");</pre>
                `,
                code: `console.log("Hello JavaScript!");\nconsole.log(10 + 20);`
            },
            {
                title: "變數",
                description: "使用 let、const 儲存資料。",
                content: `
                    <h4>變數</h4>
                    <pre>let name = "小明";\nconst age = 18;\nconsole.log(name, age);</pre>
                    <p>let 可以重新指定值，const 宣告後不能重新指定。</p>
                `,
                code: `let name = "小明";\nconst age = 18;\n\nconsole.log(name);\nconsole.log(age);`
            },
            {
                title: "函式與事件",
                description: "製作可以重複使用的功能。",
                content: `
                    <h4>函式</h4>
                    <pre>function sayHello() {\n    console.log("你好！");\n}\nsayHello();</pre>
                    <p>函式可以把一段程式包裝起來，需要時再呼叫。</p>
                `,
                code: `function sayHello() {\n    console.log("你好！");\n}\n\nsayHello();`
            }
        ]
    }
];

/* =====================================
   3. 程式碼範例
===================================== */

const starterCode = {
    python: `print("Hello Python!")\nprint(10 + 20)`,

    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++!" << endl;
    cout << 10 + 20 << endl;
    return 0;
}`,

    html: `<h1>我的網頁</h1>
<p>歡迎來到程式學院！</p>
<button onclick="alert('你好！')">點擊我</button>`,

    css: `body {
    font-family: Arial;
    text-align: center;
}

h1 {
    color: purple;
}`,

    js: `console.log("Hello JavaScript!");
console.log(10 + 20);`
};

// 各語言分別保存程式碼，切換分頁時不會遺失
const codeValues = { ...starterCode };

/* =====================================
   4. 測驗題目
===================================== */

const quizQuestions = [
    {
        question: "Python 使用哪一個指令輸出文字？",
        options: ["echo()", "print()", "cout", "write()"],
        answer: 1,
        explanation: "Python 使用 print() 輸出文字。"
    },
    {
        question: "C++ 的主要程式進入點是哪一個？",
        options: ["start()", "run()", "main()", "begin()"],
        answer: 2,
        explanation: "C++ 程式從 main() 函式開始執行。"
    },
    {
        question: "HTML 主要負責什麼？",
        options: ["網頁結構", "資料庫", "作業系統", "網路連線"],
        answer: 0,
        explanation: "HTML 用來建立網頁結構。"
    },
    {
        question: "CSS 的主要用途是什麼？",
        options: ["執行 Python", "設計網頁外觀", "儲存資料", "編譯 C++"],
        answer: 1,
        explanation: "CSS 負責網頁的顏色、字體和排版。"
    },
    {
        question: "JavaScript 可以讓網頁具有什麼功能？",
        options: ["互動功能", "只顯示圖片", "只能播放音樂", "只能儲存檔案"],
        answer: 0,
        explanation: "JavaScript 能讓網頁回應使用者操作。"
    }
];

/* =====================================
   5. 工具函式與本機資料
===================================== */

function getProgress() {
    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEYS.progress)
        ) || {};
    } catch {
        return {};
    }
}

function saveProgress(progress) {
    localStorage.setItem(
        STORAGE_KEYS.progress,
        JSON.stringify(progress)
    );
}

function getCompletedCount() {
    return Object.values(getProgress()).filter(Boolean).length;
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* =====================================
   6. 課程卡片
===================================== */

function renderCourses() {
    const grid = $("#course-grid");
    const keyword = $("#course-search").value
        .trim()
        .toLowerCase();

    const progress = getProgress();

    const filtered = courses.filter(course => {
        const matchesLanguage =
            currentFilter === "all" ||
            course.id === currentFilter;

        const matchesKeyword =
            course.name.toLowerCase().includes(keyword) ||
            course.description.toLowerCase().includes(keyword);

        return matchesLanguage && matchesKeyword;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.textContent = "找不到符合條件的課程。";
        return;
    }

    filtered.forEach(course => {
        const completed = course.lessons.filter(
            (lesson, index) =>
                Boolean(progress[`${course.id}-${index}`])
        ).length;

        const card = document.createElement("article");
        card.className = "course-card";

        const icon = document.createElement("div");
        icon.className = "course-icon";
        icon.textContent = languageIcons[course.id];

        const title = document.createElement("h3");
        title.textContent = course.name;

        const description = document.createElement("p");
        description.textContent = course.description;

        const info = document.createElement("div");
        info.className = "course-info";
        info.textContent =
            `${course.level} · ${course.lessons.length} 堂課 · 已完成 ${completed} 堂`;

        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.textContent = "開始學習";

        button.addEventListener("click", () => {
            openCourse(course.id);
        });

        card.append(icon, title, description, info, button);
        grid.appendChild(card);
    });
}

function openCourse(courseId, shouldScroll = true) {
    currentCourse = courses.find(
        course => course.id === courseId
    );

    if (!currentCourse) return;

    currentLessonIndex = 0;
    renderLesson();

    // 只有使用者點擊課程時才移動到學習教室
    if (shouldScroll) {
        $("#lesson").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* =====================================
   7. 課堂內容
===================================== */

function renderLesson() {
    if (!currentCourse) return;

    const lesson = currentCourse.lessons[currentLessonIndex];
    const lessonId =
        `${currentCourse.id}-${currentLessonIndex}`;

    $("#lesson-language").textContent =
        currentCourse.id.toUpperCase();

    $("#lesson-number").textContent =
        `第 ${currentLessonIndex + 1} / ${currentCourse.lessons.length} 堂`;

    $("#lesson-title").textContent = lesson.title;
    $("#lesson-description").textContent = lesson.description;
    $("#lesson-content").innerHTML = lesson.content;

    const completed = Boolean(getProgress()[lessonId]);

    $("#lesson-complete").textContent =
        completed ? "已完成 ✓" : "完成本堂課";

    $("#lesson-progress-note").textContent =
        completed
            ? "這堂課已記錄完成。"
            : "完成後可以記錄學習進度。";

    $("#lesson-prev").disabled = currentLessonIndex === 0;

    $("#lesson-next").disabled =
        currentLessonIndex === currentCourse.lessons.length - 1;

    selectLanguage(
        currentCourse.id,
        false,
        lesson.code
    );

    updateProgress();
}

function completeLesson() {
    if (!currentCourse) {
        showToast("請先選擇一堂課！");
        return;
    }

    const progress = getProgress();

    const lessonId =
        `${currentCourse.id}-${currentLessonIndex}`;

    progress[lessonId] = true;

    saveProgress(progress);

    renderLesson();
    renderCourses();

    showToast("已完成本堂課！");
}

function updateProgress() {
    const total = courses.reduce(
        (sum, course) => sum + course.lessons.length,
        0
    );

    const completed = getCompletedCount();
    const percent = Math.round(completed / total * 100);

    $("#completed-count").textContent = completed;
    $("#progress-bar").style.width = `${percent}%`;
    $("#progress-percent").textContent = `${percent}%`;

    $("#progress-caption").textContent =
        completed === 0 ? "尚未開始" : "持續進步中！";
}

/* =====================================
   8. 編輯器切換
===================================== */

function selectLanguage(language, updateButton = true, code = null) {
    if (!starterCode[language]) return;

    // 先保存目前編輯器內容
    if ($("#code-editor").value !== undefined) {
        codeValues[currentLanguage] = $("#code-editor").value;
    }

    currentLanguage = language;

    if (code !== null) {
        codeValues[language] = code;
    }

    document.querySelectorAll(".language-tab").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.language === language
        );
    });

    $("#editor-language").textContent = languageNames[language];
    $("#code-editor").value = codeValues[language];

    $("#run-message").textContent = "準備就緒";
    $("#code-output").textContent = "執行結果會顯示在這裡。";

    const isWeb = ["html", "css", "js"].includes(language);

    $("#web-preview-wrap").classList.toggle("hidden", !isWeb);

    if (updateButton) {
        showToast(`已切換到 ${languageNames[language]}`);
    }
}

/* =====================================
   9. Python 執行環境
===================================== */

async function initPython() {
    if (pyodideInstance) {
        return pyodideInstance;
    }

    if (typeof loadPyodide !== "function") {
        throw new Error(
            "Python 執行環境載入失敗，請檢查網路連線。"
        );
    }

    $("#run-message").textContent =
        "正在載入 Python 執行環境...";

    pyodideInstance = await loadPyodide();

    return pyodideInstance;
}

async function runPythonCode(code) {
    const output = $("#code-output");

    try {
        $("#run-message").textContent =
            "正在執行 Python...";

        output.textContent = "";

        const pyodide = await initPython();

        pyodide.setStdout({
            batched: text => {
                output.textContent += text + "\n";
            }
        });

        pyodide.setStderr({
            batched: text => {
                output.textContent += text + "\n";
            }
        });

        await pyodide.runPythonAsync(code);

        if (!output.textContent.trim()) {
            output.textContent =
                "程式執行完成，沒有輸出。";
        }

        $("#run-message").textContent =
            "Python 執行完成";

    } catch (error) {
        output.textContent = String(error);

        $("#run-message").textContent =
            "Python 執行失敗";
    }
}

/* =====================================
   10. C++ 執行環境
===================================== */

async function runCppCode(code) {
    const output = $("#code-output");

    try {
        $("#run-message").textContent =
            "正在取得 C++ 編譯器...";

        output.textContent = "";

        const listResponse = await fetch(
            "https://wandbox.org/api/list.json"
        );

        if (!listResponse.ok) {
            throw new Error(
                "無法連線至 C++ 編譯服務。"
            );
        }

        const compilers = await listResponse.json();

        const compiler = compilers.find(item =>
            item.language === "C++" &&
            /^gcc/.test(item.name)
        );

        if (!compiler) {
            throw new Error(
                "找不到可用的 C++ 編譯器。"
            );
        }

        $("#run-message").textContent =
            "正在編譯 C++...";

        const response = await fetch(
            "https://wandbox.org/api/compile.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    compiler: compiler.name,
                    code: code,
                    stdin: ""
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                "C++ 編譯服務回應失敗。"
            );
        }

        const result = await response.json();

        const text =
            result.program_output ||
            result.program_error ||
            result.compiler_error ||
            result.status ||
            "程式執行完成，沒有輸出。";

        output.textContent = text;

        $("#run-message").textContent =
            result.status === "0" || result.program_output
                ? "C++ 執行完成"
                : "C++ 編譯或執行有錯誤";

    } catch (error) {
        output.textContent =
            "C++ 執行服務錯誤：\n" + String(error);

        $("#run-message").textContent =
            "C++ 執行失敗";
    }
}

/* =====================================
   11. HTML / CSS / JavaScript 預覽
===================================== */

function escapeScriptEnd(code) {
    return code.replace(/<\/script/gi, "<\\/script");
}

function buildPreviewDocument() {
    const html = codeValues.html;
    const css = codeValues.css;
    const js = codeValues.js;

    return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
    font-family: Arial, sans-serif;
    padding: 15px;
}
${css}
</style>
</head>
<body>
${html}
<script>
const originalLog = console.log;

console.log = (...args) => {
    parent.postMessage({
        type: "preview-log",
        value: args.map(x => String(x)).join(" ")
    }, "*");
};

window.onerror = function(message) {
    parent.postMessage({
        type: "preview-error",
        value: String(message)
    }, "*");
};

${escapeScriptEnd(js)}
<\/script>
</body>
</html>`;
}

function runWebCode() {
    // 保存當前程式碼
    codeValues[currentLanguage] = $("#code-editor").value;

    const frame = $("#preview-frame");
    const output = $("#code-output");

    $("#web-preview-wrap").classList.remove("hidden");

    output.textContent =
        currentLanguage === "js"
            ? "JavaScript 的 console.log 結果會顯示在這裡。"
            : "網頁預覽已更新。";

    frame.srcdoc = buildPreviewDocument();

    $("#run-message").textContent = "網頁預覽已更新";
}

window.addEventListener("message", event => {
    const frame = $("#preview-frame");

    if (!frame || event.source !== frame.contentWindow) {
        return;
    }

    if (!event.data ||
        !String(event.data.type).startsWith("preview-")) {
        return;
    }

    if (event.data.type === "preview-log") {
        $("#code-output").textContent +=
            "\n" + String(event.data.value);
    }

    if (event.data.type === "preview-error") {
        $("#code-output").textContent +=
            "\n錯誤：" + String(event.data.value);
    }
});

/* =====================================
   12. 執行程式
===================================== */

async function runCode() {
    const code = $("#code-editor").value;

    codeValues[currentLanguage] = code;

    if (!code.trim()) {
        showToast("請先輸入程式碼！");
        return;
    }

    $("#run-code").disabled = true;

    try {
        if (currentLanguage === "python") {
            await runPythonCode(code);

        } else if (currentLanguage === "cpp") {
            await runCppCode(code);

        } else {
            runWebCode();
        }

    } finally {
        $("#run-code").disabled = false;
    }
}

function resetCode() {
    codeValues[currentLanguage] =
        starterCode[currentLanguage];

    $("#code-editor").value =
        starterCode[currentLanguage];

    $("#code-output").textContent =
        "程式碼已重設。";

    $("#run-message").textContent =
        "準備就緒";
}

/* =====================================
   13. 測驗功能
===================================== */

function renderQuiz() {
    const question = quizQuestions[quizIndex];

    quizAnswered = false;

    $("#quiz-category").textContent = "程式基礎";

    $("#quiz-counter").textContent =
        `第 ${quizIndex + 1} / ${quizQuestions.length} 題`;

    $("#quiz-question").textContent =
        question.question;

    $("#quiz-feedback").textContent = "";

    $("#quiz-score").textContent =
        `目前答對：${quizScore} 題`;

    $("#quiz-next").disabled = true;
    $("#quiz-next").textContent = "下一題";

    const options = $("#quiz-options");
    options.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "quiz-option";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => {
            answerQuiz(index);
        });

        options.appendChild(button);
    });
}

function answerQuiz(selectedIndex) {
    if (quizAnswered) return;

    quizAnswered = true;

    const question = quizQuestions[quizIndex];

    const buttons =
        document.querySelectorAll(".quiz-option");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

        if (index === selectedIndex &&
            index !== question.answer) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === question.answer) {
        quizScore++;

        $("#quiz-feedback").textContent =
            "答對了！" + question.explanation;

    } else {
        $("#quiz-feedback").textContent =
            "再接再厲！" + question.explanation;
    }

    $("#quiz-score").textContent =
        `目前答對：${quizScore} 題`;

    $("#quiz-next").disabled = false;

    if (quizIndex === quizQuestions.length - 1) {
        $("#quiz-next").textContent = "查看成績";
    }
}

function nextQuiz() {
    if (!quizAnswered) return;

    if (quizIndex < quizQuestions.length - 1) {
        quizIndex++;
        renderQuiz();
        return;
    }

    showQuizResult();
}

function showQuizResult() {
    $("#quiz-counter").textContent = "測驗完成";

    $("#quiz-question").textContent =
        `你的成績是 ${quizScore} / ${quizQuestions.length} 題！`;

    $("#quiz-options").innerHTML = "";

    $("#quiz-feedback").textContent =
        quizScore === quizQuestions.length
            ? "太棒了！全部答對！"
            : "繼續練習，你會越來越熟練！";

    $("#quiz-score").textContent = "測驗完成";

    $("#quiz-next").disabled = false;
    $("#quiz-next").textContent = "重新測驗";

    quizAnswered = true;
    quizIndex = quizQuestions.length;
}

function restartQuiz() {
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    renderQuiz();
}

/* =====================================
   14. 示範會員功能
===================================== */

function openAuthModal() {
    $("#auth-modal").classList.remove("hidden");
    $("#auth-modal").setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
    $("#auth-modal").classList.add("hidden");
    $("#auth-modal").setAttribute("aria-hidden", "true");
}

function setAuthMode(mode) {
    authMode = mode;

    document.querySelectorAll(".auth-mode").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );
    });

    $("#auth-title").textContent =
        mode === "login"
            ? "歡迎回到程式學院"
            : "建立你的學習帳號";

    $("#auth-submit").textContent =
        mode === "login" ? "登入" : "註冊";

    $("#auth-message").textContent =
        "示範模式：不會建立真正的雲端會員帳號。";
}

function updateAuthDisplay() {
    const email =
        localStorage.getItem(STORAGE_KEYS.user);

    if (email) {
        $("#user-status").textContent = email;
        $("#auth-open").classList.add("hidden");
        $("#signout").classList.remove("hidden");

    } else {
        $("#user-status").textContent = "尚未登入";
        $("#auth-open").classList.remove("hidden");
        $("#signout").classList.add("hidden");
    }
}

function handleAuth(event) {
    event.preventDefault();

    const email = $("#auth-email").value.trim();
    const password = $("#auth-password").value;

    if (!email || password.length < 6) {
        $("#auth-message").textContent =
            "請輸入有效電子郵件及至少 6 個字元的密碼。";
        return;
    }

    /*
      示範模式：
      只記錄登入顯示用的電子郵件，
      不儲存密碼，也不會驗證真正的會員帳號。

      正式會員系統請使用 Supabase Auth。
    */

    localStorage.setItem(STORAGE_KEYS.user, email);

    $("#auth-message").textContent =
        authMode === "register"
            ? "示範註冊完成！目前尚未建立雲端帳號。"
            : "示範登入完成！";

    updateAuthDisplay();

    setTimeout(closeAuthModal, 900);

    showToast("歡迎來到程式學院！");

    $("#auth-form").reset();
}

function signOut() {
    localStorage.removeItem(STORAGE_KEYS.user);

    updateAuthDisplay();

    showToast("已登出");
}

/* =====================================
   15. 事件綁定
===================================== */

function attachEvents() {

    // 課程搜尋
    $("#course-search").addEventListener(
        "input",
        renderCourses
    );

    // 課程篩選
    document.querySelectorAll(".filter-chip").forEach(button => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;

            document.querySelectorAll(".filter-chip").forEach(item => {
                item.classList.toggle(
                    "active",
                    item === button
                );
            });

            renderCourses();
        });
    });

    // 程式語言切換
    document.querySelectorAll(".language-tab").forEach(button => {
        button.addEventListener("click", () => {
            selectLanguage(button.dataset.language);
        });
    });

    // 程式執行
    $("#run-code").addEventListener("click", runCode);

    // 重設程式碼
    $("#reset-code").addEventListener("click", resetCode);

    // 完成課程
    $("#lesson-complete").addEventListener(
        "click",
        completeLesson
    );

    // 上一堂
    $("#lesson-prev").addEventListener("click", () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            renderLesson();
        }
    });

    // 下一堂
    $("#lesson-next").addEventListener("click", () => {
        if (currentCourse &&
            currentLessonIndex < currentCourse.lessons.length - 1) {
            currentLessonIndex++;
            renderLesson();
        }
    });

    // 測驗下一題或重新測驗
    $("#quiz-next").addEventListener("click", () => {
        if (quizIndex >= quizQuestions.length) {
            restartQuiz();
        } else {
            nextQuiz();
        }
    });

    // 登入視窗
    $("#auth-open").addEventListener(
        "click",
        openAuthModal
    );

    $("#auth-close").addEventListener(
        "click",
        closeAuthModal
    );

    $(".modal-backdrop").addEventListener(
        "click",
        closeAuthModal
    );

    // 登入與註冊切換
    document.querySelectorAll(".auth-mode").forEach(button => {
        button.addEventListener("click", () => {
            setAuthMode(button.dataset.mode);
        });
    });

    // 表單送出
    $("#auth-form").addEventListener(
        "submit",
        handleAuth
    );

    // 登出
    $("#signout").addEventListener(
        "click",
        signOut
    );

    // 編輯器 Tab 鍵輸入四個空格
    $("#code-editor").addEventListener("keydown", event => {
        if (event.key === "Tab") {
            event.preventDefault();

            const textarea = event.target;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value =
                textarea.value.substring(0, start) +
                "    " +
                textarea.value.substring(end);

            textarea.selectionStart =
                textarea.selectionEnd = start + 4;

            codeValues[currentLanguage] = textarea.value;
        }
    });

    // 使用者輸入時同步保存程式碼
    $("#code-editor").addEventListener("input", event => {
        codeValues[currentLanguage] = event.target.value;
    });
}

/* =====================================
   16. 啟動網站
===================================== */

function init() {
    $("#year").textContent =
        new Date().getFullYear();

    renderCourses();
    updateProgress();
    renderQuiz();
    updateAuthDisplay();

    attachEvents();

    // 預先載入第一堂 Python 課程，但不移動畫面
    openCourse("python", false);
}

/* =====================================
   17. 網頁載入位置修正
===================================== */

// 不讓瀏覽器自動還原上次的捲動位置
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// 等待 DOM 載入後啟動
document.addEventListener("DOMContentLoaded", () => {
    init();

    // 初始化完成後回到最上方
    window.scrollTo(0, 0);
});

// 網頁完全載入後再確認一次
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// 從瀏覽器上一頁或下一頁返回時也回到頂端
window.addEventListener("pageshow", () => {
    window.scrollTo(0, 0);
});

