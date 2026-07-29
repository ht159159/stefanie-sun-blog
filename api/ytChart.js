// Vercel Serverless Function：即時代打 YouTube Data API v3，避免 API Key 曝露在前端
// 部署後路徑為 /api/yt-chart

import { fetchYtChartData } from './_lib/youtube.js'

export default async function handler(req, res) {
  try {
    const regionCode = req.query.regionCode || 'TW'
    const data = await fetchYtChartData(regionCode)
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(data)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
