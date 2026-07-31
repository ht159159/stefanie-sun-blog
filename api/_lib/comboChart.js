// KKBOX 排行榜 + YouTube 播放 結合版：用 KKBOX 官方榜單當排名來源，逐首用歌手+歌名去 YouTube 搜尋對應 MV
// 供 api/comboChart.js（Vercel Function）與 vite.config.js（本機 dev）共用

import { fetchChartData } from './kkbox.js'
import { searchVideoId } from './youtube.js'

const CHART_TITLES = {
  single: {
    mandarin: '華語單曲日榜',
    western: '西洋單曲日榜'
  },
  new: {
    mandarin: '華語新歌日榜',
    western: '西洋新歌日榜'
  }
}

export async function fetchComboChartData(chartType = 'single', category = 'mandarin', territory = 'TW') {
  const chartTitle = CHART_TITLES[chartType]?.[category]
  if (!chartTitle) throw new Error(`不支援的分類：${chartType}/${category}`)

  const kkboxData = await fetchChartData(territory, chartTitle)

  const tracks = await Promise.all(
    kkboxData.tracks.map(async (track) => {
      let videoId = null
      try {
        videoId = await searchVideoId(`${track.artist} ${track.name}`)
      } catch {
        videoId = null
      }
      return { ...track, videoId }
    })
  )

  return {
    chartTitle: kkboxData.chartTitle,
    updatedAt: new Date().toISOString(),
    tracks
  }
}
