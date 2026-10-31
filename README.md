# 六軌節奏遊戲（瀏覽器版）

## 開始遊玩
1. 解壓縮 `six_lane_rhythm_browser.zip`。
2. 打開資料夾，雙擊 `index.html`。
3. 選擇電腦裡的音樂，選擇難度，按「開始遊戲」。
4. 按鍵是 `D F J K L ;`。也可以按「試玩示範」先體驗。

若瀏覽器因本機檔案安全限制而無法正常載入，請在資料夾空白處開啟終端機並執行：
```bash
python -m http.server 8000
```
再用瀏覽器開啟 http://localhost:8000

## 手動譜面
1. 回大廳選擇音樂。
2. 按「譜面編輯器」→「開始編輯／錄製」。
3. 音樂播放時按 D/F/J/K/L/;，會記錄音符時間。
4. 按「停止」→「儲存譜面」。
5. 回大廳將譜面模式改成「使用手動譜面」再開始遊戲。

## 雲端成績（選用）
1. 在 Supabase 建立專案。
2. 到 SQL Editor 執行 `supabase.sql`。
3. 到 Project Settings / API 複製 Project URL 和 Publishable key（或 anon key）。
4. 將兩個值填入 `game.js` 最上方的 `SUPABASE_URL`、`SUPABASE_KEY`。
5. 重新整理網頁後可註冊、登入，成績會寫入雲端資料表。

不要把 `service_role` 或 secret key 放進前端程式。未設定 Supabase 時，遊戲仍可遊玩，成績保存在本機瀏覽器。

## 檔案
- `index.html`：網頁結構
- `style.css`：畫面樣式
- `game.js`：遊戲邏輯
- `supabase.sql`：雲端成績資料表與權限設定
