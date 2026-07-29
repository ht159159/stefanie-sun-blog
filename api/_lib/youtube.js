// YouTube 音樂排行榜抓取邏輯，供 api/ytChart.js（Vercel Function）與 vite.config.js（本機 dev）共用
// 用官方 YouTube Data API v3 的 videos.list + chart=mostPopular 取得「音樂類別」熱門影片
// 註：這不是 YouTube Music 官方演算法排行榜（無串流播放量加權），YouTube 沒有公開該榜單的 API

const VIDEO_CATEGORY_MUSIC = '10'
const RESULT_LIMIT = 10

export async function fetchYtChartData(regionCode = 'TW') {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) throw new Error('未設定 YOUTUBE_API_KEY')

  const url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.set('part', 'snippet,statistics')
  url.searchParams.set('chart', 'mostPopular')
  url.searchParams.set('videoCategoryId', VIDEO_CATEGORY_MUSIC)
  url.searchParams.set('regionCode', regionCode)
  url.searchParams.set('maxResults', String(RESULT_LIMIT))
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`取得 YouTube 排行榜失敗: ${res.status} ${await res.text()}`)
  const data = await res.json()

  return {
    chartTitle: `YouTube 熱門音樂影片（${regionCode}）`,
    updatedAt: new Date().toISOString(),
    videos: data.items.map((item, i) => ({
      rank: i + 1,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url,
      viewCount: Number(item.statistics.viewCount),
      url: `https://www.youtube.com/watch?v=${item.id}`
    }))
  }
}
