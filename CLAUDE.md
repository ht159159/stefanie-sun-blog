# stefanie-sun-blog

Vue 3 + Vite 專案。

## 部署 / CI-CD

- GitHub repo: https://github.com/ht159159/stefanie-sun-blog
- 部署平台: Vercel（Team: sheepblog）
- 線上網址: https://stefanie-sun-blog-5groviyg6-sheepblog.vercel.app
- 流程: push 到 `main` 分支 → Vercel 自動 build（`npm run build`）+ 部署，開 PR 會自動產生 Preview 網址
- 不需要額外的 GitHub Actions workflow，CI/CD 由 Vercel 串接 GitHub 處理
