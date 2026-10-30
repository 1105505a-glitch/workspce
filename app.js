
/* =========================================
   程式學院 Programming Learning School
   ========================================= */


/* =========================================
   1. Supabase 設定
   ========================================= */

const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

let supabaseClient = null;

if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    window.supabase
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}


/* =========================================
   2. Python / C++ 執行服務
   ========================================= */

// 需要自行部署或取得授權的 Piston API。
// 不要把私人 API Token 放在前端。

const PISTON_API_URL = "";


/* =========================================
   3. 課程資料
   ========================================= */

const courses = [
    {
        id: "python",
        name: "Python",
        icon: "🐍",
        category: "入門",
        description: "從變數、條件判斷到迴圈，學習 Python 程式設計。",
        lessons: [
            {
                title: "認識 Python",
                description: "認識 Python 與第一個程式。",
                content: `
                    <h3>什麼是 Python？</h3>
                    <p>Python 是一種容易閱讀的程式語言。</p>
                    <p>常用於人工智慧、資料分析及自動化。</p>
                    <h3>第一個程式</h3>
                    <p>使用 print() 輸出文字。</p>
                `,
                code: `print("Hello World!")`
            },
            {
                title: "變數",
                description: "學習如何建立變數。",
                content: `
                    <h3>什麼是變數？</h3>
                    <p>變數可以儲存資料，例如姓名、年齡和分數。</p>
                `,
                code: `name = "Tom"
age = 18

print(name)
print(age)`
            },
            {
                title: "條件判斷",
                description: "學習 if、elif、else。",
                content: `
                    <h3>if 條件判斷</h3>
                    <p>if 可以判斷條件是否成立。</p>
                    <p>else 則處理其他情況。</p>
                `,
                code: `score = 85

if score >= 60:
    print("及格")
else:
    print("不及格")`
            },
            {
                title: "For 迴圈",
                description: "學習重複執行程式。",
                content: `
                    <h3>for 迴圈</h3>
                    <p>for 可以重複執行程式。</p>
                    <p>range(1, 6) 會產生 1 到 5。</p>
                `,
                code: `for i in range(1, 6):
    print(i)`
            }
        ]
    },

    {
        id: "cpp",
        name: "C++",
        icon: "⚙️",
        category: "進階基礎",
        description: "學習 C++ 基礎語法、變數、迴圈與陣列。",
        lessons: [
            {
                title: "認識 C++",
                description: "了解 C++ 程式的基本結構。",
                content: `
                    <h3>什麼是 C++？</h3>
                    <p>C++ 常用於程式競賽、遊戲與系統開發。</p>
                    <p>cout 可以輸出文字。</p>
                `,
                code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`
            },
            {
                title: "變數",
                description: "認識 int、double 和 string。",
                content: `
                    <h3>變數</h3>
                    <p>int 儲存整數。</p>
                    <p>double 儲存小數。</p>
                    <p>string 儲存文字。</p>
                `,
                code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 18;
    double height = 170.5;
    string name = "Tom";

    cout << age << endl;
    cout << height << endl;
    cout << name << endl;

    return 0;
}`
            },
            {
                title: "If 條件判斷",
                description: "使用 if 和 else。",
                content: `
                    <h3>條件判斷</h3>
                    <p>if 用來判斷條件是否成立。</p>
                    <p>else 用來處理條件不成立的情況。</p>
                `,
                code: `#include <iostream>
using namespace std;

int main() {
    int score = 85;

    if (score >= 60) {
        cout << "及格";
    } else {
        cout << "不及格";
    }

    return 0;
}`
            },
            {
                title: "For 迴圈",
                description: "使用 for 重複執行程式。",
                content: `
                    <h3>for 迴圈</h3>
                    <p>for 包含初始值、條件及更新方式。</p>
                `,
                code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << endl;
    }

    return 0;
}`
            }
        ]
    },

    {
        id: "html",
        name: "HTML",
        icon: "🌐",
        category: "網頁",
        description: "學習網頁結構、標題、段落與表單。",
        lessons: [
            {
                title: "HTML 基本結構",
                description: "認識 HTML 網頁架構。",
                content: `
                    <h3>什麼是 HTML？</h3>
                    <p>HTML 用來建立網頁的結構。</p>
                    <p>常見標籤有 html、head、body、h1 和 p。</p>
                `,
                code: `<!DOCTYPE html>
<html>
<head>
    <title>我的網頁</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>歡迎來到程式學院。</p>
</body>
</html>`
            },
            {
                title: "標題與段落",
                description: "使用 h1 和 p 建立內容。",
                content: `
                    <h3>標題與段落</h3>
                    <p>HTML 使用 h1 到 h6 建立標題。</p>
                    <p>使用 p 建立文字段落。</p>
                `,
                code: `<h1>我的標題</h1>
<h2>第二個標題</h2>
<p>這是一段文字。</p>`
            },
            {
                title: "連結與圖片",
                description: "建立超連結與顯示圖片。",
                content: `
                    <h3>超連結</h3>
                    <p>使用 a 標籤建立連結。</p>
                    <h3>圖片</h3>
                    <p>使用 img 標籤顯示圖片。</p>
                `,
                code: `<a href="https://www.google.com">
    前往 Google
</a>

<br>

<img src="https://placehold.co/200x100"
     alt="示範圖片">`
            }
        ]
    },

    {
        id: "css",
        name: "CSS",
        icon: "🎨",
        category: "網頁",
        description: "學習網頁顏色、字體、排版與動畫。",
        lessons: [
            {
                title: "認識 CSS",
                description: "使用 CSS 設計網頁。",
                content: `
                    <h3>什麼是 CSS？</h3>
                    <p>CSS 負責網頁外觀與排版。</p>
                `,
                code: `body {
    background-color: lightblue;
    font-family: Arial;
}

h1 {
    color: blue;
}`
            },
            {
                title: "文字樣式",
                description: "調整文字顏色和大小。",
                content: `
                    <h3>文字樣式</h3>
                    <p>color 設定文字顏色。</p>
                    <p>font-size 設定文字大小。</p>
                `,
                code: `h1 {
    color: purple;
    font-size: 36px;
    font-weight: bold;
}

p {
    color: #555;
    font-size: 18px;
}`
            },
            {
                title: "背景與邊框",
                description: "學習背景顏色與邊框。",
                content: `
                    <h3>背景與邊框</h3>
                    <p>background-color 設定背景顏色。</p>
                    <p>border-radius 設定圓角。</p>
                `,
                code: `.card {
    background-color: lightblue;
    border: 2px solid blue;
    border-radius: 12px;
    padding: 20px;
}`
            }
        ]
    },

    {
        id: "javascript",
        name: "JavaScript",
        icon: "✨",
        category: "網頁",
        description: "學習 JavaScript，讓網頁具有互動功能。",
        lessons: [
            {
                title: "認識 JavaScript",
                description: "讓網頁可以執行程式。",
                content: `
                    <h3>什麼是 JavaScript？</h3>
                    <p>JavaScript 可以讓網頁產生互動效果。</p>
                    <p>console.log() 可以輸出訊息。</p>
                `,
                code: `console.log("Hello World!");`
            },
            {
                title: "變數",
                description: "使用 let 和 const 儲存資料。",
                content: `
                    <h3>變數</h3>
                    <p>let 可以重新賦值。</p>
                    <p>const 不能重新賦值。</p>
                `,
                code: `let name = "Tom";
const age = 18;

console.log(name);
console.log(age);`
            },
            {
                title: "函式",
                description: "建立可重複使用的程式區塊。",
                content: `
                    <h3>函式</h3>
                    <p>function 可以建立函式。</p>
                    <p>呼叫函式就能執行裡面的程式。</p>
                `,
                code: `function hello() {
    console.log("Hello!");
}

hello();`
            }
        ]
    }
];


/* =========================================
   4. 五題測驗
   ========================================= */

const quizQuestions = [
    {
        category: "Python 基礎",
        question: "Python 使用哪個指令輸出文字？",
        options: ["cout", "print()", "echo", "printf"],
        answer: 1,
        explanation: "Python 使用 print() 輸出文字。"
    },
    {
        category: "C++ 基礎",
        question: "C++ 程式通常從哪個函式開始執行？",
        options: ["start()", "main()", "run()", "begin()"],
        answer: 1,
        explanation: "C++ 程式通常從 main() 函式開始執行。"
    },
    {
        category: "HTML 基礎",
        question: "HTML 使用哪個標籤建立最大層級的標題？",
        options: ["<p>", "<h1>", "<title>", "<div>"],
        answer: 1,
        explanation: "h1 是 HTML 中層級最大的標題標籤。"
    },
    {
        category: "CSS 基礎",
        question: "CSS 使用哪個屬性設定文字顏色？",
        options: ["background", "font", "color", "text"],
        answer: 2,
        explanation: "color 可以設定文字顏色。"
    },
    {
        category: "JavaScript 基礎",
        question: "JavaScript 使用哪個關鍵字宣告常數？",
        options: ["var", "let", "const", "int"],
        answer: 2,
        explanation: "const 用來宣告不能重新賦值的變數。"
    }
];


/* =========================================
   5. 編輯器預設程式碼
   ========================================= */

const starterCode = {
    html: `<!DOCTYPE html>
<html>
<head>
    <title>我的網頁</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>歡迎來到程式學院。</p>
    <button onclick="alert('你好！')">點我</button>
</body>
</html>`,

    css: `body {
    background-color: #eef4ff;
    font-family: Arial;
    text-align: center;
    padding: 30px;
}

h1 {
    color: #2563eb;
}

button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
}`,

    js: `console.log("Hello World!");

let name = "Tom";

console.log("你好，" + name);

function sayHello() {
    alert("歡迎來到程式學院！");
}

sayHello();`,

    python: `print("Hello World!")

name = "Tom"
print("你好，" + name)

for i in range(1, 6):
    print(i)`,

    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;

    for (int i = 1; i <= 5; i++) {
        cout << i << endl;
    }

    return 0;
}`
};


/* =========================================
   6. 全域變數
   ========================================= */

let activeCourse = null;
let activeLessonIndex = 0;

let activeFilter = "全部";
let searchKeyword = "";

let activeLanguage = "html";

let codeValues = { ...starterCode };

let completedIds = [];

let currentUser = null;

let authMode = "login";

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

let toastTimer = null;


/* =========================================
   7. 常用函式
   ========================================= */

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => {
        const map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return map[char];
    });
}


function getCourse(courseId) {
    return courses.find(course => course.id === courseId);
}


function getLessonId(courseId, index) {
    return `${courseId}-${index}`;
}


/* =========================================
   8. 課程搜尋與篩選
   ========================================= */

function renderCourses() {
    const container = document.getElementById("course-grid");

    if (!container) return;

    const filteredCourses = courses.filter(course => {
        const matchesFilter =
            activeFilter === "全部" ||
            course.category === activeFilter;

        const keyword = searchKeyword.toLowerCase();

        const matchesSearch =
            course.name.toLowerCase().includes(keyword) ||
            course.description.toLowerCase().includes(keyword);

        return matchesFilter && matchesSearch;
    });

    if (filteredCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-courses">
                找不到符合條件的課程。
            </div>
        `;
        return;
    }

    container.innerHTML = filteredCourses.map(course => {
        const completed = course.lessons.filter((lesson, index) => {
            return completedIds.includes(
                getLessonId(course.id, index)
            );
        }).length;

        const percent = Math.round(
            completed / course.lessons.length * 100
        );

        return `
            <article class="course-card">

                <div class="course-card-top">
                    <span class="course-icon">${course.icon}</span>
                    <span class="course-level">${escapeHtml(course.category)}</span>
                </div>

                <h3>${escapeHtml(course.name)}</h3>

                <p>${escapeHtml(course.description)}</p>

                <div class="course-progress">
                    <span>學習進度</span>
                    <span>${completed}/${course.lessons.length}</span>
                </div>

                <div class="course-progress-track">
                    <span style="width:${percent}%"></span>
                </div>

                <button
                    class="button button-primary course-start"
                    data-course="${course.id}"
                >
                    開始學習 →
                </button>

            </article>
        `;
    }).join("");
}


function setCourseFilter(filter) {
    activeFilter = filter;

    document.querySelectorAll(".filter-chip").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderCourses();
}


/* =========================================
   9. 課程內容
   ========================================= */

function selectCourse(courseId) {
    const course = getCourse(courseId);

    if (!course) return;

    activeCourse = courseId;
    activeLessonIndex = 0;

    renderLesson();
}


function renderLesson() {
    if (!activeCourse) return;

    const course = getCourse(activeCourse);
    const lesson = course?.lessons[activeLessonIndex];

    if (!lesson) return;

    const title = document.getElementById("lesson-title");
    const description = document.getElementById("lesson-description");
    const content = document.getElementById("lesson-content");
    const note = document.getElementById("lesson-progress-note");
    const completeButton = document.getElementById("lesson-complete");

    const lessonId = getLessonId(
        activeCourse,
        activeLessonIndex
    );

    const isCompleted = completedIds.includes(lessonId);

    if (title) {
        title.textContent =
            `${course.icon} ${course.name}｜${lesson.title}`;
    }

    if (description) {
        description.textContent = lesson.description;
    }

    if (content) {
        content.innerHTML = `
            ${lesson.content}

            <div class="lesson-example">
                <h4>程式範例</h4>
                <pre><code>${escapeHtml(lesson.code)}</code></pre>
            </div>

            <div class="lesson-navigation">
                <span>第 ${activeLessonIndex + 1} 堂 / ${course.lessons.length} 堂</span>

                <button
                    class="small-button"
                    id="previous-lesson"
                    ${activeLessonIndex === 0 ? "disabled" : ""}
                >
                    上一堂
                </button>

                <button
                    class="small-button"
                    id="next-lesson"
                    ${activeLessonIndex === course.lessons.length - 1 ? "disabled" : ""}
                >
                    下一堂
                </button>
            </div>
        `;
    }

    if (note) {
        note.textContent = isCompleted
            ? "這堂課已完成"
            : `目前學習：${course.name}`;
    }

    if (completeButton) {
        completeButton.textContent = isCompleted
            ? "取消完成 ↺"
            : "標記為已完成 ✓";
    }

    // 將課程範例載入編輯器
    const language =
        course.id === "javascript" ? "js" : course.id;

    if (starterCode[language] !== undefined) {
        activeLanguage = language;
        codeValues[language] = lesson.code;
        renderEditor();
    }

    updateProgress();
}


function toggleLessonComplete() {
    if (!activeCourse) {
        showToast("請先選擇一堂課程");
        return;
    }

    const id = getLessonId(
        activeCourse,
        activeLessonIndex
    );

    if (completedIds.includes(id)) {
        completedIds = completedIds.filter(item => item !== id);
        showToast("已取消完成紀錄");
    } else {
        completedIds.push(id);
        showToast("恭喜完成這堂課！");
    }

    saveProgress();

    renderLesson();
    renderCourses();
    updateProgress();
}


/* =========================================
   10. 本機與雲端進度
   ========================================= */

function getProgressStorageKey() {
    return currentUser
        ? `programming-school-${currentUser.id}`
        : "programming-school-guest";
}


function loadLocalProgress() {
    try {
        const saved = localStorage.getItem(
            getProgressStorageKey()
        );

        const parsed = saved ? JSON.parse(saved) : [];

        completedIds = Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {
        console.error("讀取本機進度失敗：", error);
        completedIds = [];
    }
}


async function loadProgress() {
    if (!currentUser || !supabaseClient) {
        loadLocalProgress();
        updateProgress();
        renderCourses();
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("lesson_progress")
            .select("course_id, completed")
            .eq("user_id", currentUser.id);

        if (error) throw error;

        completedIds = (data || [])
            .filter(item => item.completed)
            .map(item => item.course_id);

        localStorage.setItem(
            getProgressStorageKey(),
            JSON.stringify(completedIds)
        );

    } catch (error) {
        console.error("雲端進度讀取失敗：", error);
        loadLocalProgress();
    }

    updateProgress();
    renderCourses();

    if (activeCourse) {
        renderLesson();
    }
}


async function saveProgress() {
    localStorage.setItem(
        getProgressStorageKey(),
        JSON.stringify(completedIds)
    );

    if (!currentUser || !supabaseClient) {
        return;
    }

    const records = [];

    courses.forEach(course => {
        course.lessons.forEach((lesson, index) => {
            const id = getLessonId(course.id, index);

            records.push({
                user_id: currentUser.id,
                course_id: id,
                completed: completedIds.includes(id),
                updated_at: new Date().toISOString()
            });
        });
    });

    try {
        const { error } = await supabaseClient
            .from("lesson_progress")
            .upsert(records, {
                onConflict: "user_id,course_id"
            });

        if (error) throw error;

    } catch (error) {
        console.error(error);
        showToast("雲端進度儲存失敗");
    }
}


function updateProgress() {
    const total = courses.reduce(
        (sum, course) => sum + course.lessons.length,
        0
    );

    const completed = completedIds.length;

    const percent = total
        ? Math.round(completed / total * 100)
        : 0;

    const count = document.getElementById("completed-count");
    const bar = document.getElementById("progress-bar");
    const caption = document.getElementById("progress-caption");
    const percentElement = document.getElementById("progress-percent");

    if (count) count.textContent = completed;

    if (bar) bar.style.width = percent + "%";

    if (caption) {
        caption.textContent =
            percent === 100
                ? "太棒了！你已完成所有課程！"
                : completed === 0
                    ? "開始第一堂課吧！"
                    : "繼續努力，保持學習！";
    }

    if (percentElement) {
        percentElement.textContent = percent + "%";
    }
}


/* =========================================
   11. 語言切換
   ========================================= */

function selectLanguage(language, button) {
    if (language === "javascript") {
        language = "js";
    }

    if (!Object.prototype.hasOwnProperty.call(starterCode, language)) {
        showToast("不支援的程式語言");
        return;
    }

    // 儲存目前正在編輯的內容
    const editor = document.getElementById("code-editor");

    if (editor) {
        codeValues[activeLanguage] = editor.value;
    }

    activeLanguage = language;

    renderEditor();

    const message = document.getElementById("run-message");

    if (message) {
        if (language === "python" || language === "cpp") {
            message.textContent =
                `${language.toUpperCase()} 需要設定外部程式執行服務。`;
        } else {
            message.textContent =
                "編輯程式碼後，按「執行程式」查看結果。";
        }
    }
}


function renderEditor() {
    const editor = document.getElementById("code-editor");

    if (!editor) return;

    editor.value = codeValues[activeLanguage] || "";

    document.querySelectorAll(".language-tab").forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.language === activeLanguage
        );
    });
}


/* =========================================
   12. HTML / CSS / JavaScript 預覽
   ========================================= */

function buildPreviewDocument() {
    const html = codeValues.html || "";
    const css = codeValues.css || "";
    const js = codeValues.js || "";

    const parser = new DOMParser();

    const doc = parser.parseFromString(
        html,
        "text/html"
    );

    const style = doc.createElement("style");
    style.textContent = css;

    doc.head.appendChild(style);

    // 把 console.log 輸出傳回主頁
    const outputScript = doc.createElement("script");

    outputScript.textContent = `
        (function() {
            function send(type, args) {
                try {
                    parent.postMessage({
                        type: "playground-output",
                        outputType: type,
                        message: Array.from(args).map(function(item) {
                            if (typeof item === "object" && item !== null) {
                                try {
                                    return JSON.stringify(item);
                                } catch (error) {
                                    return String(item);
                                }
                            }

                            return String(item);
                        }).join(" ")
                    }, "*");
                } catch (error) {}
            }

            const oldLog = console.log;
            const oldError = console.error;

            console.log = function() {
                send("log", arguments);
                oldLog.apply(console, arguments);
            };

            console.error = function() {
                send("error", arguments);
                oldError.apply(console, arguments);
            };

            window.onerror = function(message, source, line) {
                send("error", [
                    message + "（第 " + line + " 行）"
                ]);
            };
        })();
    `;

    doc.head.appendChild(outputScript);

    const script = doc.createElement("script");
    script.textContent = js;

    doc.body.appendChild(script);

    return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
}


function runWebCode() {
    const frame = document.getElementById("preview-frame");
    const message = document.getElementById("run-message");

    if (!frame) return;

    if (message) {
        message.textContent = "程式執行中...";
    }

    frame.srcdoc = buildPreviewDocument();

    if (message) {
        message.textContent = "網頁預覽已更新。";
    }
}


/* =========================================
   13. Python / C++ 執行
   ========================================= */

const languageRuntime = {
    python: {
        language: "python",
        version: "3.10.0",
        filename: "main.py"
    },

    cpp: {
        language: "cpp",
        version: "10.2.0",
        filename: "main.cpp"
    }
};


async function runServerCode(language) {
    const message = document.getElementById("run-message");

    if (!message) return;

    if (!PISTON_API_URL) {
        message.textContent =
            "尚未設定 Python / C++ 執行服務。\n\n" +
            "請部署或取得授權的 Piston API，" +
            "再設定 PISTON_API_URL。\n\n" +
            "目前無法直接在瀏覽器執行這兩種語言。";

        return;
    }

    const runtime = languageRuntime[language];

    if (!runtime) {
        message.textContent = "不支援的程式語言。";
        return;
    }

    message.textContent = "程式執行中，請稍候...";

    try {
        const response = await fetch(PISTON_API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                language: runtime.language,
                version: runtime.version,

                files: [
                    {
                        name: runtime.filename,
                        content: codeValues[language]
                    }
                ],

                stdin: "",
                args: [],

                compile_timeout: 10000,
                run_timeout: 3000,

                compile_memory_limit: -1,
                run_memory_limit: -1
            })
        });

        if (!response.ok) {
            throw new Error("伺服器錯誤：" + response.status);
        }

        const result = await response.json();

        let output = "";

        if (result.compile) {
            if (result.compile.output) {
                output +=
                    "編譯輸出：\n" +
                    result.compile.output +
                    "\n";
            }

            if (result.compile.stderr) {
                output +=
                    "編譯錯誤：\n" +
                    result.compile.stderr +
                    "\n";
            }
        }

        if (result.run) {
            output += "\n執行結果：\n";
            output += result.run.stdout || "";

            if (result.run.stderr) {
                output +=
                    "\n錯誤訊息：\n" +
                    result.run.stderr;
            }

            if (result.run.code !== undefined) {
                output +=
                    "\n\n結束代碼：" +
                    result.run.code;
            }
        }

        message.textContent =
            output || "程式已執行，但沒有輸出內容。";

    } catch (error) {
        console.error(error);

        message.textContent =
            "程式執行失敗：" + error.message;
    }
}


/* =========================================
   14. 執行程式
   ========================================= */

async function runCode() {
    const editor = document.getElementById("code-editor");

    if (editor) {
        codeValues[activeLanguage] = editor.value;
    }

    if (
        activeLanguage === "html" ||
        activeLanguage === "css" ||
        activeLanguage === "js"
    ) {
        runWebCode();
        return;
    }

    if (
        activeLanguage === "python" ||
        activeLanguage === "cpp"
    ) {
        await runServerCode(activeLanguage);
    }
}


/* =========================================
   15. 重設程式碼
   ========================================= */

function resetCode() {
    codeValues[activeLanguage] = starterCode[activeLanguage];

    renderEditor();

    const frame = document.getElementById("preview-frame");
    const message = document.getElementById("run-message");

    if (frame) {
        frame.srcdoc = "";
    }

    if (message) {
        message.textContent = "程式碼已重設。";
    }

    showToast("已恢復預設程式碼");
}


/* =========================================
   16. 接收程式輸出
   ========================================= */

window.addEventListener("message", event => {
    const frame = document.getElementById("preview-frame");

    if (!frame || event.source !== frame.contentWindow) {
        return;
    }

    const data = event.data;

    if (!data || data.type !== "playground-output") {
        return;
    }

    const message = document.getElementById("run-message");

    if (!message) return;

    const prefix =
        data.outputType === "error"
            ? "錯誤："
            : "輸出：";

    message.textContent +=
        "\n" + prefix + data.message;
});


/* =========================================
   17. 登入視窗
   ========================================= */

function openAuth() {
    const modal = document.getElementById("auth-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    renderAuthMode();
}


function closeAuth() {
    const modal = document.getElementById("auth-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function setAuthMode(mode) {
    authMode = mode;
    renderAuthMode();
}


function renderAuthMode() {
    const title = document.getElementById("auth-title");
    const submit = document.getElementById("auth-submit");
    const description = document.querySelector(".modal-description");
    const password = document.getElementById("auth-password");
    const message = document.getElementById("auth-message");

    if (authMode === "login") {
        if (title) {
            title.textContent = "歡迎回到程式學院";
        }

        if (submit) {
            submit.textContent = "登入";
        }

        if (description) {
            description.textContent = "登入後同步你的課程進度。";
        }

        if (password) {
            password.autocomplete = "current-password";
        }

    } else {
        if (title) {
            title.textContent = "建立你的帳號";
        }

        if (submit) {
            submit.textContent = "建立帳號";
        }

        if (description) {
            description.textContent = "建立帳號，保存你的學習成果。";
        }

        if (password) {
            password.autocomplete = "new-password";
        }
    }

    document.querySelectorAll(".auth-mode").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.mode === authMode
        );
    });

    if (message) {
        message.textContent = "";
    }
}


/* =========================================
   18. 登入與註冊
   ========================================= */

async function handleAuthSubmit(event) {
    event.preventDefault();

    const message = document.getElementById("auth-message");

    const email = document.getElementById("auth-email").value.trim();

    const password = document.getElementById("auth-password").value;

    if (!supabaseClient) {
        if (message) {
            message.textContent =
                "請先設定 Supabase URL 和 Anon Key，才能使用會員功能。";
        }

        return;
    }

    if (!email || !password) {
        if (message) {
            message.textContent = "請輸入電子郵件和密碼。";
        }

        return;
    }

    const submit = document.getElementById("auth-submit");

    if (submit) {
        submit.disabled = true;
        submit.textContent = "處理中...";
    }

    try {
        let result;

        if (authMode === "login") {
            result = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        } else {
            result = await supabaseClient.auth.signUp({
                email,
                password
            });
        }

        if (result.error) {
            throw result.error;
        }

        if (
            authMode === "signup" &&
            !result.data.session
        ) {
            if (message) {
                message.textContent =
                    "註冊成功！請先到電子郵件確認帳號。";
            }

            return;
        }

        currentUser = result.data.user;

        await loadProgress();

        updateUserStatus();

        closeAuth();

        showToast(
            authMode === "login"
                ? "登入成功！"
                : "註冊成功！"
        );

    } catch (error) {
        console.error(error);

        if (message) {
            message.textContent =
                error.message || "登入或註冊失敗。";
        }

    } finally {
        if (submit) {
            submit.disabled = false;
            submit.textContent =
                authMode === "login" ? "登入" : "建立帳號";
        }
    }
}


/* =========================================
   19. 登出
   ========================================= */

async function signOut() {
    if (supabaseClient) {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            showToast("登出失敗");
            return;
        }
    }

    currentUser = null;

    loadLocalProgress();

    updateProgress();
    renderCourses();
    updateUserStatus();

    showToast("已登出");
}


/* =========================================
   20. 顯示會員狀態
   ========================================= */

function updateUserStatus() {
    const status = document.getElementById("user-status");
    const openButton = document.getElementById("auth-open");
    const signoutButton = document.getElementById("signout");

    if (currentUser) {
        if (status) {
            status.textContent =
                currentUser.email || "會員模式";
        }

        if (openButton) {
            openButton.classList.add("hidden");
        }

        if (signoutButton) {
            signoutButton.classList.remove("hidden");
        }

    } else {
        if (status) {
            status.textContent = "訪客模式";
        }

        if (openButton) {
            openButton.classList.remove("hidden");
        }

        if (signoutButton) {
            signoutButton.classList.add("hidden");
        }
    }
}


/* =========================================
   21. 測驗
   ========================================= */

function renderQuiz() {
    const category = document.getElementById("quiz-category");
    const counter = document.getElementById("quiz-counter");
    const questionElement = document.getElementById("quiz-question");
    const optionsElement = document.getElementById("quiz-options");
    const feedback = document.getElementById("quiz-feedback");
    const scoreElement = document.getElementById("quiz-score");
    const nextButton = document.getElementById("quiz-next");

    if (
        !category ||
        !counter ||
        !questionElement ||
        !optionsElement
    ) {
        return;
    }

    if (quizIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[quizIndex];

    quizAnswered = false;

    category.textContent = question.category;

    counter.textContent =
        `QUESTION ${String(quizIndex + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;

    questionElement.textContent = question.question;

    optionsElement.innerHTML = question.options.map(
        (option, index) => `
            <button
                class="quiz-option"
                data-answer="${index}"
            >
                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>${escapeHtml(option)}</span>
            </button>
        `
    ).join("");

    if (feedback) {
        feedback.classList.add("hidden");
        feedback.textContent = "";
    }

    if (scoreElement) {
        scoreElement.textContent = `答對 ${quizScore} 題`;
    }

    if (nextButton) {
        nextButton.disabled = true;

        nextButton.textContent =
            quizIndex === quizQuestions.length - 1
                ? "查看成績 →"
                : "下一題 →";
    }
}


function answerQuiz(index) {
    if (quizAnswered) return;

    const question = quizQuestions[quizIndex];

    if (!question) return;

    quizAnswered = true;

    const isCorrect = index === question.answer;

    if (isCorrect) {
        quizScore++;
    }

    document.querySelectorAll(".quiz-option").forEach(
        (button, buttonIndex) => {
            button.disabled = true;

            if (buttonIndex === question.answer) {
                button.classList.add("correct");
            }

            if (
                buttonIndex === index &&
                !isCorrect
            ) {
                button.classList.add("wrong");
            }
        }
    );

    const feedback = document.getElementById("quiz-feedback");

    if (feedback) {
        feedback.textContent =
            (isCorrect ? "答對了！ " : "答錯了！ ") +
            question.explanation;

        feedback.classList.remove("hidden");
    }

    const scoreElement = document.getElementById("quiz-score");

    if (scoreElement) {
        scoreElement.textContent = `答對 ${quizScore} 題`;
    }

    const nextButton = document.getElementById("quiz-next");

    if (nextButton) {
        nextButton.disabled = false;
    }
}


function nextQuiz() {
    if (!quizAnswered) return;

    quizIndex++;

    renderQuiz();
}


function showQuizResult() {
    const category = document.getElementById("quiz-category");
    const counter = document.getElementById("quiz-counter");
    const question = document.getElementById("quiz-question");
    const options = document.getElementById("quiz-options");
    const feedback = document.getElementById("quiz-feedback");
    const score = document.getElementById("quiz-score");
    const next = document.getElementById("quiz-next");

    if (category) category.textContent = "測驗完成";
    if (counter) counter.textContent = "RESULT";
    if (question) {
        question.textContent =
            `你的成績是 ${quizScore} / ${quizQuestions.length} 題`;
    }

    if (options) {
        options.innerHTML = "";
    }

    if (feedback) {
        feedback.textContent =
            quizScore === quizQuestions.length
                ? "太厲害了！全部答對！"
                : "繼續練習，你會越來越進步！";

        feedback.classList.remove("hidden");
    }

    if (score) {
        score.textContent = `最終分數：${quizScore} 分`;
    }

    if (next) {
        next.disabled = false;
        next.textContent = "重新測驗 ↻";
        next.onclick = restartQuiz;
    }
}


function restartQuiz() {
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    const next = document.getElementById("quiz-next");

    if (next) {
        next.onclick = null;
    }

    renderQuiz();
}


/* =========================================
   22. 事件綁定
   ========================================= */

function attachEvents() {

    // 課程卡片
    document.getElementById("course-grid")
        ?.addEventListener("click", event => {
            const button = event.target.closest("[data-course]");

            if (!button) return;

            selectCourse(button.dataset.course);

            document.getElementById("lesson")
                ?.scrollIntoView({ behavior: "smooth" });
        });


    // 課程分類
    document.getElementById("course-filters")
        ?.addEventListener("click", event => {
            const button = event.target.closest("[data-filter]");

            if (!button) return;

            setCourseFilter(button.dataset.filter);
        });


    // 課程搜尋
    document.getElementById("course-search")
        ?.addEventListener("input", event => {
            searchKeyword = event.target.value.trim();

            renderCourses();
        });


    // 標記課程完成
    document.getElementById("lesson-complete")
        ?.addEventListener("click", toggleLessonComplete);


    // 課程上一堂、下一堂
    document.getElementById("lesson-content")
        ?.addEventListener("click", event => {
            if (event.target.id === "previous-lesson") {
                if (activeLessonIndex > 0) {
                    activeLessonIndex--;
                    renderLesson();
                }
            }

            if (event.target.id === "next-lesson") {
                const course = getCourse(activeCourse);

                if (
                    course &&
                    activeLessonIndex < course.lessons.length - 1
                ) {
                    activeLessonIndex++;
                    renderLesson();
                }
            }
        });


    // 語言分頁
    document.querySelectorAll(".language-tab")
        .forEach(button => {
            button.addEventListener("click", () => {
                selectLanguage(
                    button.dataset.language,
                    button
                );
            });
        });


    // 編輯器內容
    document.getElementById("code-editor")
        ?.addEventListener("input", event => {
            codeValues[activeLanguage] = event.target.value;
        });


    // 執行程式
    document.getElementById("run-code")
        ?.addEventListener("click", runCode);


    // 重設程式碼
    document.getElementById("reset-code")
        ?.addEventListener("click", resetCode);


    // 登入視窗
    document.getElementById("auth-open")
        ?.addEventListener("click", openAuth);


    // 登出
    document.getElementById("signout")
        ?.addEventListener("click", signOut);


    // 關閉登入視窗
    document.getElementById("auth-close")
        ?.addEventListener("click", closeAuth);


    // 點擊背景關閉登入視窗
    document.querySelector(".modal-backdrop")
        ?.addEventListener("click", closeAuth);


    // 登入 / 註冊切換
    document.querySelectorAll(".auth-mode")
        .forEach(button => {
            button.addEventListener("click", () => {
                setAuthMode(button.dataset.mode);
            });
        });


    // 登入表單
    document.getElementById("auth-form")
        ?.addEventListener("submit", handleAuthSubmit);


    // 測驗選項
    document.getElementById("quiz-options")
        ?.addEventListener("click", event => {
            const button = event.target.closest("[data-answer]");

            if (!button) return;

            answerQuiz(Number(button.dataset.answer));
        });


    // 下一題
    document.getElementById("quiz-next")
        ?.addEventListener("click", nextQuiz);
}


/* =========================================
   23. Supabase 登入狀態
   ========================================= */

async function initAuth() {
    if (!supabaseClient) {
        currentUser = null;
        return;
    }

    try {
        const { data, error } =
            await supabaseClient.auth.getUser();

        if (error) throw error;

        currentUser = data.user || null;

        supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                currentUser = session?.user || null;

                // 避免在 Auth 狀態變更回呼內直接等待
                // 其他 Supabase Auth 操作。
                setTimeout(async () => {
                    await loadProgress();
                    updateUserStatus();
                }, 0);
            }
        );

    } catch (error) {
        console.error("會員狀態讀取失敗：", error);
        currentUser = null;
    }

    updateUserStatus();
}


/* =========================================
   24. 初始化網站
   ========================================= */

async function init() {
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    attachEvents();

    await initAuth();

    await loadProgress();

    renderCourses();

    updateProgress();

    selectCourse("python");

    renderEditor();

    renderQuiz();

    updateUserStatus();

    console.log("程式學院已成功啟動！");
}


/* =========================================
   25. 啟動網站
   ========================================= */

document.addEventListener("DOMContentLoaded", init);

