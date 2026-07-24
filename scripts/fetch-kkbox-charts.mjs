// 抓取 KKBOX 排行榜資料，寫入 src/data/kkboxCharts.json 供前端直接讀取
// 用法：node --env-file=.env scripts/fetch-kkbox-charts.mjs

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const CLIENT_ID = process.env.KKBOX_CLIENT_ID
const CLIENT_SECRET = process.env.KKBOX_CLIENT_SECRET
const CHART_TITLE = '華語單曲日榜'
const TRACK_LIMIT = 10

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(__dirname, '../src/data/kkboxCharts.json')

async function getAccessToken() {
  const res = await fetch('https://account.kkbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  })
  if (!res.ok) throw new Error(`取得 token 失敗: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.access_token
}

async function getCharts(accessToken, territory = 'TW') {
  const res = await fetch(`https://api.kkbox.com/v1.1/charts?territory=${territory}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  if (!res.ok) throw new Error(`取得排行榜清單失敗: ${res.status} ${await res.text()}`)
  return res.json()
}

async function getChartTracks(accessToken, playlistId, territory = 'TW') {
  const res = await fetch(
    `https://api.kkbox.com/v1.1/charts/${playlistId}/tracks?territory=${territory}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error(`取得排行榜歌曲失敗: ${res.status} ${await res.text()}`)
  return res.json()
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('請先設定 .env 內的 KKBOX_CLIENT_ID / KKBOX_CLIENT_SECRET')
    process.exit(1)
  }

  const accessToken = await getAccessToken()
  const charts = await getCharts(accessToken, 'TW')
  const target = charts.data.find((c) => c.title === CHART_TITLE)
  if (!target) throw new Error(`找不到榜單：${CHART_TITLE}`)

  const tracks = await getChartTracks(accessToken, target.id, 'TW')

  const output = {
    chartTitle: target.title,
    updatedAt: new Date().toISOString(),
    tracks: tracks.data.slice(0, TRACK_LIMIT).map((track, i) => ({
      rank: i + 1,
      name: track.name,
      artist: track.album.artist.name,
      cover: track.album.images.find((img) => img.width === 300)?.url ?? track.album.images[0]?.url,
      url: track.url
    }))
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`已寫入 ${output.tracks.length} 首歌曲到 ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
