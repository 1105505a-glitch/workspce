程式學院｜完整網站專案

檔案內容
- index.html：網站頁面結構
- style.css：網站樣式
- app.js：課程、程式編輯器、測驗、Supabase 會員與 APCS 作答紀錄
- apcs_quiz_attempts.sql：建立 APCS 每次作答紀錄資料表的 SQL

開始使用
1. 解壓縮 ZIP。
2. 使用 VS Code 或其他編輯器開啟 app.js。
3. 在 app.js 最上方找到 SUPABASE_URL 與 SUPABASE_ANON_KEY。
4. 填入自己的 Supabase Project URL 與 anon / publishable key。
   請勿使用 service_role key，也不要將資料庫密碼放在前端。
5. 登入 Supabase 專案，開啟 SQL Editor。
6. 將 apcs_quiz_attempts.sql 的內容貼入 SQL Editor 並執行。
7. 使用瀏覽器開啟 index.html，或使用 VS Code Live Server 啟動。

注意
- index.html 已載入 Supabase JavaScript v2 CDN。
- 會員註冊/登入與 APCS 作答紀錄需要先完成 Supabase 設定及 SQL 建表。
- Python 執行器需要網路下載 Pyodide。
- C++ 線上執行功能依 app.js 中設定的外部編譯服務運作，需有網路連線。
- 網站的課程完成進度仍依目前 app.js 的本機儲存設計保存。


【Python APCS 雙語更新】
APCS 專區可切換 Python / C++。以下 8 個進階單元都有 Python 說明與可執行範例：陣列與二維陣列、字串與字元處理、函式與遞迴、排序與搜尋、Stack/Queue/Set/Dict、時間複雜度、DFS/BFS、動態規劃。選擇 Python 後按「載入範例」會切換至 Python 編輯器。Python 使用 Pyodide，首次執行需要網路。
