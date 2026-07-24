// Vercel Serverless Function：即時代打 KKBOX Charts API，避免 Client Secret 曝露在前端
// 部署後路徑為 /api/charts

import { fetchChartData } from './_lib/kkbox.js'

export default async function handler(req, res) {
  try {
    const territory = req.query.territory || 'TW'
    const data = await fetchChartData(territory)
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(data)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
