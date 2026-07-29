# stefanie-sun-blog

Vue 3 + Vite 專案。

## 部署 / CI-CD

- GitHub repo: https://github.com/ht159159/stefanie-sun-blog
- 部署平台: Vercel（Team: sheepblog）
- 線上網址: https://stefanie-sun-blog.vercel.app
- 流程: push 到 `main` 分支 → Vercel 自動 build（`npm run build`）+ 部署，開 PR 會自動產生 Preview 網址
- 不需要額外的 GitHub Actions workflow，CI/CD 由 Vercel 串接 GitHub 處理

## KKBOX 排行榜（首頁 ChartSection）

- 首頁的排行榜區塊即時打 KKBOX Open API 取得資料，不是靜態資料
- 架構:
  - `api/_lib/kkbox.js` — 抓資料的核心邏輯（token + charts + tracks）
  - `api/charts.js` — Vercel Serverless Function，正式站的 `/api/charts` 路由
  - `vite.config.js` 的 `kkboxChartsApi` plugin — 本機 `npm run dev` / `npm run preview` 用的對應路由，跟 `api/charts.js` 共用同一份 `_lib/kkbox.js`
  - `src/components/ChartSection.vue` — 進頁面時 `fetch('/api/charts')`
- 需要的環境變數: `KKBOX_CLIENT_ID`、`KKBOX_CLIENT_SECRET`（KKBOX Open API 的 App 憑證，Client Credentials Flow）
  - 本機開發: 寫在專案根目錄 `.env`（已加入 `.gitignore`，不會進 git）
  - Vercel 正式站: Vercel 專案 → Settings → Environment Variables 新增這兩組 key，Production / Preview / Development 都勾選
  - **改動環境變數後要手動觸發一次重新 deploy 才會生效**
- 若這兩個環境變數在 Vercel 上沒設定，`/api/charts` 會回傳 502

### 取得 KKBOX App 憑證

1. 到 [developer.kkbox.com](https://developer.kkbox.com/) 註冊開發者帳號
2. 建立一個 App，取得 App ID（= `KKBOX_CLIENT_ID`）與 App Secret（= `KKBOX_CLIENT_SECRET`）
3. 因為只是抓公開排行榜資料（不需要使用者登入），走 **Client Credentials Flow** 就夠了，App 的 Redirect Uri 欄位不用填
4. Charts API 端點: `GET https://api.kkbox.com/v1.1/charts?territory=TW`（territory 只支援 HK / JP / MY / SG / TW），單一榜單歌曲清單: `GET https://api.kkbox.com/v1.1/charts/{playlist_id}/tracks?territory=TW`
5. 目前程式寫死抓「華語單曲日榜」前 10 首，要改榜單或地區的話改 `api/_lib/kkbox.js` 裡的 `CHART_TITLE` / `TRACK_LIMIT`

## YouTube 音樂排行榜（獨立頁面 `/yt-chart`）

- 獨立頁面，走 `/yt-chart` route，跟首頁的 KKBOX 排行榜是各自獨立的兩個功能
- 用官方 **YouTube Data API v3** 的 `videos.list?chart=mostPopular&videoCategoryId=10`，抓「音樂類別」熱門影片
  - 注意：這不是 YouTube Music 官方排行榜（無串流播放量加權等演算法），YouTube 沒有公開該榜單的 API；`videos.list` 的 mostPopular chart 是唯一有官方文件支援、穩定可用的替代方案
- 架構跟 KKBOX 排行榜一致:
  - `api/_lib/youtube.js` — 抓資料的核心邏輯
  - `api/ytChart.js` — Vercel Serverless Function，正式站的 `/api/yt-chart` 路由
  - `vite.config.js` 的 `ytChartApi` plugin — 本機 `npm run dev` / `npm run preview` 用的對應路由，跟 `api/ytChart.js` 共用同一份 `_lib/youtube.js`
  - `src/views/YtChartView.vue` — 進頁面時 `fetch('/api/yt-chart')`
- 需要的環境變數: `YOUTUBE_API_KEY`
  - 本機開發: 寫在專案根目錄 `.env`（已加入 `.gitignore`，不會進 git）
  - Vercel 正式站: Vercel 專案 → Settings → Environment Variables 新增這組 key，Production / Preview / Development 都勾選
  - **改動環境變數後要手動觸發一次重新 deploy 才會生效**
- 若這個環境變數在 Vercel 上沒設定，`/api/yt-chart` 會回傳 502
- 目前寫死抓台灣（`regionCode=TW`）前 10 名，要改地區或筆數的話改 `api/_lib/youtube.js` 裡呼叫 `fetchYtChartData` 的 `regionCode` 參數 / `RESULT_LIMIT`

### 取得 YouTube Data API Key

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)，建立一個新專案（或用現有的）
2. 左側選單「APIs & Services」→「Library」，搜尋 **YouTube Data API v3**，點進去按「Enable」啟用
3. 左側選單「APIs & Services」→「Credentials」→「Create Credentials」→「API key」，會直接產生一組 key
4. 建議點「Edit API key」加上限制，避免 key 被盜用：
   - **Application restrictions**：本機開發階段可先選 None，正式上線後可改成 HTTP referrers 限制只給自己的網域用
   - **API restrictions**：選「Restrict key」，只勾選 YouTube Data API v3
5. 複製 key 貼到專案根目錄 `.env` 的 `YOUTUBE_API_KEY=` 後面即可
6. 免費額度預設每天 10,000 units，這個查詢每次只花 1 unit，練習用完全夠
