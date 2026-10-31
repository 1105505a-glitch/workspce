# 程式學院｜繁體中文互動式程式教學網站

這是一個以 HTML、CSS、JavaScript 製作的響應式前端專案，並可選擇整合 Supabase 會員驗證與雲端學習紀錄。

## 目前包含

- Python、C++、HTML、CSS、JavaScript 課程卡片與搜尋／分類
- 課程閱讀區與已完成課程進度
- HTML、CSS、JavaScript 練習編輯器與 iframe 即時預覽
- 互動式單選測驗與即時解說
- 登入／註冊介面（設定 Supabase 後啟用）
- 訪客進度使用 localStorage 儲存
- 手機與桌面版響應式版面

## 1. 在電腦上執行

### 最簡單方式
1. 解壓縮 `programming-learning-school.zip`。
2. 進入 `programming-learning-school` 資料夾。
3. 以 Chrome 或 Edge 開啟 `index.html`。

部分瀏覽器功能可能受 `file://` 限制，建議用本機伺服器測試。

### 使用 VS Code Live Server
1. 安裝 Visual Studio Code。
2. 開啟 `programming-learning-school` 資料夾。
3. 安裝擴充套件 **Live Server**。
4. 在 `index.html` 按右鍵，選擇 **Open with Live Server**。

也可以安裝 Node.js 後，在資料夾終端機執行：
```bash
npx serve .
```
接著依終端機顯示的網址開啟網站。

## 2. 設定 Supabase 會員與雲端進度

1. 前往 https://supabase.com/ 建立專案。
2. 在專案設定中取得 **Project URL** 與 **anon / publishable key**。
3. 開啟 `app.js`，在最上方填入：
```js
const SUPABASE_URL = "https://你的專案.supabase.co";
const SUPABASE_ANON_KEY = "你的 anon 或 publishable key";
```
4. 在 Supabase Dashboard 的 **SQL Editor**，執行 `supabase-schema.sql` 全部內容。
5. 在 Supabase Authentication 設定 Email 登入方式。正式部署前，設定正確的 Site URL 與 Redirect URLs。
6. 重新載入網站，測試註冊、信箱驗證、登入、登出與課程進度。

**重要安全事項**
- 前端只能使用 anon / publishable key，絕不可放 `service_role` 或其他秘密金鑰。
- 本專案 SQL 啟用 Row Level Security (RLS)，並限制使用者只能操作自己的 `lesson_progress` 資料。
- 上線前仍應檢查 Auth 的郵件驗證、密碼政策、Redirect URLs、濫用防護與資料庫權限。
- 沒有設定 Supabase 時，會員功能不會真的登入；課程進度只存在目前瀏覽器的 localStorage。
- localStorage 的訪客紀錄不會自動轉移至雲端帳號。

## 3. 發布到網路

### Netlify（適合靜態網站）
1. 到 https://www.netlify.com/ 建立帳號。
2. 將解壓縮後的專案資料夾拖放到 Netlify 的手動部署介面，或依 Netlify 最新介面建立網站。
3. 網站發布後，將正式網址加入 Supabase Authentication 的 Site URL 和 Redirect URLs。
4. 用無痕視窗測試註冊與登入。

### GitHub Pages
1. 將檔案提交至 GitHub repository。
2. 在 repository 的 Settings > Pages 啟用部署。
3. 將網站網址加入 Supabase Auth 的允許網址設定。

GitHub Pages 只託管靜態前端；會員驗證與雲端資料仍由 Supabase 提供。

## 4. 關於程式碼執行器

目前練習區只即時預覽 HTML、CSS、JavaScript，且使用 sandbox iframe。它不是完整的安全程式執行平台。Python 與 C++ 課程目前提供教學範例，尚未直接在網頁執行。

若要加入 Python / C++ 執行，應整合具沙箱隔離、執行時間限制、記憶體限制與濫用防護的執行服務，不能在一般前端直接執行任意伺服器程式。

## 5. 常見問題

- **登入按鈕顯示尚未連接 Supabase：** 檢查 `app.js` 內 URL 與 key 是否已填入，並確認網路可載入 Supabase JS CDN。
- **登入後資料庫報錯：** 確認已執行 `supabase-schema.sql`，RLS policies 存在，且使用的是 anon / publishable key。
- **註冊後沒有自動登入：** 若開啟電子郵件驗證，請先點擊驗證信中的連結，再登入。
- **程式編輯器預覽空白：** 按「執行程式」，並檢查 HTML、CSS、JavaScript 是否有語法錯誤。

## 專案檔案

- `index.html`：頁面結構
- `style.css`：視覺樣式與響應式設計
- `app.js`：課程資料、互動、測驗、編輯器、Supabase 整合
- `supabase-schema.sql`：資料表與安全政策
