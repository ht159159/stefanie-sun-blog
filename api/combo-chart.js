// Vercel Serverless Function：KKBOX 排行榜 + YouTube 搜尋比對，避免 Client Secret / API Key 曝露在前端
// 部署後路徑為 /api/combo-chart?category=mandarin|western

import { fetchComboChartData } from './_lib/comboChart.js'

export default async function handler(req, res) {
  try {
    const category = req.query.category || 'mandarin'
    const territory = req.query.territory || 'TW'
    const data = await fetchComboChartData(category, territory)
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(data)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
