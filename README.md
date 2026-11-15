
# 程式學院｜繁體中文互動式程式教學網站

「程式學院」是一個使用 HTML、CSS、JavaScript 開發的繁體中文互動式程式教學網站，提供不同程式語言的課程、程式練習、互動測驗與學習進度紀錄。

網站採用響應式設計，支援電腦與手機瀏覽，也可以選擇整合 Supabase，提供會員註冊、登入及雲端學習紀錄功能。

---

## 一、網站目前包含的功能

### 1. 多種程式語言課程
提供以下五種程式語言的學習內容：

- Python
- C++
- HTML
- CSS
- JavaScript

使用者可以透過課程卡片、搜尋及分類功能，尋找想學習的內容。

### 2. 課程學習與進度紀錄

- 課程閱讀區。
- 標記已完成的課程。
- 顯示課程學習進度。
- 訪客進度使用瀏覽器 localStorage 儲存。
- 設定 Supabase 後，可將會員課程進度儲存至雲端資料庫。

### 3. 程式練習編輯器

目前提供 HTML、CSS、JavaScript 練習編輯器：

- 編輯程式碼。
- 按下執行程式。
- 使用 iframe 即時預覽結果。

Python 與 C++ 目前提供教學範例，尚未直接整合線上執行環境。

### 4. 互動式測驗

- 單選題測驗。
- 作答後即時顯示解說。
- APCS 程式能力相關練習。
- 可依照題庫設計進行答題與練習。

APCS 測驗的題目輪替、答對五題後換題等行為，需依照 `app.js` 實際程式碼設定。

### 5. 會員系統

整合 Supabase Authentication 後，可以提供：

- 會員註冊。
- 會員登入。
- 會員登出。
- 電子郵件驗證。
- 會員個人學習紀錄。

尚未設定 Supabase 時，網站仍可使用部分前端功能，但不會有真正的雲端會員驗證。

### 6. 響應式網頁設計

網站支援：

- 電腦瀏覽。
- 平板瀏覽。
- 手機瀏覽。

---

## 二、專案檔案架構

專案主要包含以下檔案：

| 檔案名稱 | 功能 |
|---|---|
| `index.html` | 網頁主要結構與內容 |
| `style.css` | 網站外觀、排版及響應式設計 |
| `app.js` | 課程資料、互動功能、測驗及 Supabase 整合 |
| `supabase-schema.sql` | Supabase 資料表及 RLS 安全政策 |
| `README.md` | 專案使用及設定說明 |

---

## 三、如何在電腦上執行

### 方法一：直接開啟網頁

1. 解壓縮 `programming-learning-school.zip`。
2. 找到 `programming-learning-school` 資料夾。
3. 使用 Chrome 或 Edge 開啟 `index.html`。

部分瀏覽器功能可能受到 `file://` 本機檔案限制，因此建議使用本機伺服器測試。

### 方法二：使用 VS Code Live Server

1. 安裝 Visual Studio Code。
2. 使用 VS Code 開啟 `programming-learning-school` 資料夾。
3. 安裝擴充套件 **Live Server**。
4. 在 `index.html` 上按滑鼠右鍵。
5. 選擇 **Open with Live Server**。
6. 瀏覽器會自動開啟網站。

### 方法三：使用 Node.js

安裝 Node.js 後，在專案資料夾的終端機執行：

```bash
npx serve .
```

接著依照終端機顯示的網址開啟網站。

---

## 四、設定 Supabase 會員與雲端資料庫

Supabase 負責會員驗證及雲端資料儲存。

### 1. 建立 Supabase 專案

1. 前往 https://supabase.com/。
2. 註冊或登入帳號。
3. 建立新的 Supabase Project。
4. 等待資料庫建立完成。

### 2. 取得專案金鑰

進入 Supabase 專案設定，取得：

- Project URL
- anon / publishable key

### 3. 設定 app.js

開啟 `app.js`，找到 Supabase 設定區域，填入自己的專案資訊：

```javascript
const SUPABASE_URL = "https://你的專案.supabase.co";
const SUPABASE_ANON_KEY = "你的 anon 或 publishable key";
```

請確認不要重複宣告 `supabase` 變數，也不要在前端放入 `service_role` 金鑰。

### 4. 設定資料庫

進入 Supabase Dashboard：

1. 開啟左側 **SQL Editor**。
2. 建立新的 SQL Query。
3. 開啟專案中的 `supabase-schema.sql`。
4. 複製完整 SQL 程式碼。
5. 貼到 SQL Editor。
6. 按下 **Run** 執行。

### 5. 目前資料庫包含的資料表

#### lesson_progress

用來儲存會員的課程學習進度。

| 欄位 | 用途 |
|---|---|
| `user_id` | 使用者 ID |
| `course_id` | 課程 ID |
| `completed` | 是否完成課程 |
| `updated_at` | 最後更新時間 |

#### apcs_quiz_progress

用來儲存會員的 APCS 測驗作答紀錄。

| 欄位 | 用途 |
|---|---|
| `user_id` | 使用者 ID |
| `question_id` | 題目 ID |
| `is_correct` | 是否答對 |
| `answered_at` | 作答時間 |

目前這張表使用 `user_id` 與 `question_id` 作為複合主鍵，因此同一會員的同一道題目只能保存一筆紀錄。

如果未來希望保存每次重複作答的完整歷史，就需要調整資料表設計。

### 6. Row Level Security（RLS）安全保護

兩張資料表都啟用了 Row Level Security（RLS）。

目前設定的原則：

- 使用者只能讀取自己的學習紀錄。
- 使用者只能新增自己的紀錄。
- `lesson_progress` 允許使用者更新自己的課程紀錄。
- 未登入的訪客無法讀寫這兩張雲端資料表。

**注意：** `apcs_quiz_progress` 目前設定了讀取與新增政策。若要修改或刪除既有作答紀錄，還需要另外設計對應的資料庫政策。

### 7. 設定會員驗證

在 Supabase Authentication 中：

1. 設定 Email 登入方式。
2. 確認電子郵件驗證設定。
3. 設定正確的 Site URL。
4. 設定允許的 Redirect URLs。
5. 測試註冊、登入及登出。

---

## 五、APCS 測驗紀錄功能

網站規劃使用 Supabase 儲存會員的 APCS 測驗資料。

預計可以進一步實作：

- 記錄每一道題目的作答結果。
- 統計答對與答錯題數。
- 記錄測驗日期。
- 顯示會員歷史測驗紀錄。
- 比較不同測驗的答題表現。
- 登入後繼續查看自己的學習紀錄。

**目前進度說明：**

`apcs_quiz_progress` 資料表及 RLS 政策可以透過 SQL 建立，但仍須修改 `app.js`，加入 Supabase 查詢與寫入程式，才能真正完成網站端的 APCS 雲端紀錄功能。

---

## 六、發布到網路

網站使用 HTML、CSS、JavaScript 開發，因此可以使用免費的靜態網站託管服務。

### 方法一：Netlify

1. 前往 https://www.netlify.com/。
2. 建立帳號。
3. 將專案資料夾拖放到 Netlify 的手動部署介面，或依照網站指示建立部署。
4. 等待網站發布。
5. 取得網站網址。
6. 將正式網址加入 Supabase Authentication 的 Site URL 與 Redirect URLs。
7. 使用無痕視窗測試網站。

### 方法二：GitHub Pages

1. 前往 https://github.com/。
2. 建立新的 Repository。
3. 上傳專案檔案。
4. 進入 Repository 的 Settings。
5. 找到 Pages。
6. 啟用 GitHub Pages 部署。
7. 等待網站發布。
8. 將網站網址加入 Supabase Auth 的允許網址設定。

GitHub Pages 只負責託管前端網站，會員驗證與雲端資料仍由 Supabase 提供。

---

## 七、關於 Python 與 C++ 線上執行環境

目前程式練習區主要支援 HTML、CSS、JavaScript 的 iframe 即時預覽。

Python 與 C++ 目前提供課程與程式範例，尚未直接整合線上執行功能。

若未來要讓學生直接在網頁執行 Python 或 C++，需要整合安全的程式執行服務，並具備：

- 沙箱隔離。
- 執行時間限制。
- 記憶體使用限制。
- 程式碼輸入與輸出。
- 錯誤訊息回傳。
- 濫用防護。

不能直接在一般前端網頁中執行任意伺服器程式。

---

## 八、常見問題

### Q1：登入按鈕顯示尚未連接 Supabase？

請檢查：

- `SUPABASE_URL` 是否正確。
- `SUPABASE_ANON_KEY` 是否正確。
- Supabase JS CDN 是否正常載入。
- 網路連線是否正常。

### Q2：登入後資料庫出現錯誤？

請確認：

- 已執行 `supabase-schema.sql`。
- 資料表是否成功建立。
- RLS 是否已啟用。
- RLS Policies 是否設定正確。
- 使用者是否已完成登入。

### Q3：註冊後沒有自動登入？

如果 Supabase 開啟電子郵件驗證，請先到信箱點擊驗證連結，再回到網站登入。

### Q4：課程進度會自動同步嗎？

訪客使用 localStorage 儲存進度；會員雲端同步則需要 Supabase 設定及網站端程式整合。

訪客紀錄不會自動轉移至會員帳號。

### Q5：APCS 測驗紀錄為什麼沒有出現在資料庫？

建立資料表並不代表網站已經開始寫入資料。

還需要在 `app.js` 加入作答紀錄的儲存與讀取功能，才能將測驗結果同步至 Supabase。

### Q6：程式編輯器預覽空白？

請確認：

- 已按下「執行程式」。
- HTML、CSS、JavaScript 沒有語法錯誤。
- 瀏覽器沒有阻擋 iframe 相關功能。

---

## 九、重要安全事項

1. 前端只能使用 anon / publishable key。
2. 絕對不要將 `service_role` 金鑰放進 HTML、CSS 或 JavaScript。
3. 不要自行建立或儲存會員明文密碼，會員驗證交由 Supabase Auth 管理。
4. 資料表應啟用 RLS，並設定適當的存取政策。
5. 正式上線前，應檢查電子郵件驗證、密碼政策、Redirect URLs、濫用防護及資料庫權限。
6. 不要將任何秘密金鑰上傳至公開 GitHub Repository。

---

## 十、專案未來發展方向

未來希望持續擴充「程式學院」，讓它成為更完整的程式學習平台。

預計發展項目：

- 增加 Python、C++ 進階課程。
- 加入 APCS 程式能力檢測與進階題庫。
- 建立會員個人學習儀表板。
- 加入歷史測驗成績與答題分析。
- 整合 Python、C++ 線上程式執行環境。
- 增加更多互動式程式練習。
- 優化手機版使用體驗。
- 持續改善網站介面與操作流程。

---

**專案名稱：** 程式學院

**開發技術：** HTML、CSS、JavaScript、Supabase

**專案目標：** 建立一個支援多種程式語言、互動式教學、程式練習及個人學習紀錄的繁體中文程式教育平台。
