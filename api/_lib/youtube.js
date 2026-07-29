// YouTube 音樂排行榜抓取邏輯，供 api/ytChart.js（Vercel Function）與 vite.config.js（本機 dev）共用
// 用官方 YouTube Data API v3 的 videos.list + chart=mostPopular 取得「音樂類別」熱門影片
// 註：這不是 YouTube Music 官方演算法排行榜（無串流播放量加權），YouTube 沒有公開該榜單的 API

const VIDEO_CATEGORY_MUSIC = '10'
const RESULT_LIMIT = 10

// search.list 每次要花 100 units（videos.list 只要 1 unit），用記憶體快取避免同一首歌短時間內重複搜尋
// 注意：Vercel Serverless Function 每次冷啟動這份快取會重置，只在同一個執行個體存活期間有效
const SEARCH_CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 小時
const searchCache = new Map()

// 用「歌手 歌名」關鍵字搜尋，找出最相關的一支音樂類影片，供 KKBOX 榜單比對播放用
export async function searchVideoId(query) {
  const cached = searchCache.get(query)
  if (cached && Date.now() - cached.time < SEARCH_CACHE_TTL_MS) return cached.videoId

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) throw new Error('未設定 YOUTUBE_API_KEY')

  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('q', query)
  url.searchParams.set('type', 'video')
  url.searchParams.set('videoCategoryId', VIDEO_CATEGORY_MUSIC)
  url.searchParams.set('maxResults', '1')
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`搜尋 YouTube 影片失敗: ${res.status} ${await res.text()}`)
  const data = await res.json()
  const videoId = data.items[0]?.id?.videoId ?? null

  searchCache.set(query, { videoId, time: Date.now() })
  return videoId
}

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
      videoId: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url,
      viewCount: Number(item.statistics.viewCount),
      url: `https://www.youtube.com/watch?v=${item.id}`
    }))
  }
}
