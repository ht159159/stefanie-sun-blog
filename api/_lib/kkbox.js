// KKBOX Charts 抓取邏輯，供 api/charts.js（Vercel Function）與 vite.config.js（本機 dev）共用

const CHART_TITLE = '華語單曲日榜'
const TRACK_LIMIT = 10

async function getAccessToken() {
  const res = await fetch('https://account.kkbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.KKBOX_CLIENT_ID,
      client_secret: process.env.KKBOX_CLIENT_SECRET
    })
  })
  if (!res.ok) throw new Error(`取得 token 失敗: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.access_token
}

async function getCharts(accessToken, territory) {
  const res = await fetch(`https://api.kkbox.com/v1.1/charts?territory=${territory}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  if (!res.ok) throw new Error(`取得排行榜清單失敗: ${res.status} ${await res.text()}`)
  return res.json()
}

async function getChartTracks(accessToken, playlistId, territory) {
  const res = await fetch(
    `https://api.kkbox.com/v1.1/charts/${playlistId}/tracks?territory=${territory}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error(`取得排行榜歌曲失敗: ${res.status} ${await res.text()}`)
  return res.json()
}

export async function fetchChartData(territory = 'TW', chartTitle = CHART_TITLE) {
  const accessToken = await getAccessToken()
  const charts = await getCharts(accessToken, territory)
  const target = charts.data.find((c) => c.title === chartTitle)
  if (!target) throw new Error(`找不到榜單：${chartTitle}`)

  const tracks = await getChartTracks(accessToken, target.id, territory)

  return {
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
}
