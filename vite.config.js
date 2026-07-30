import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { fetchChartData } from './api/_lib/kkbox.js'
import { fetchYtChartData } from './api/_lib/youtube.js'
import { fetchComboChartData } from './api/_lib/comboChart.js'

// 本機 `npm run dev` / `npm run preview` 用的 /api/charts 端點，
// 邏輯跟正式部署在 Vercel 上的 api/charts.js 共用同一份 api/_lib/kkbox.js
function kkboxChartsApi() {
  const handler = async (req, res) => {
    try {
      const territory = new URL(req.url, 'http://localhost').searchParams.get('territory') || 'TW'
      const data = await fetchChartData(territory)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(data))
    } catch (err) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: err.message }))
    }
  }

  return {
    name: 'kkbox-charts-api',
    configureServer(server) {
      server.middlewares.use('/api/charts', handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/charts', handler)
    }
  }
}

// 本機 `npm run dev` / `npm run preview` 用的 /api/yt-chart 端點，
// 邏輯跟正式部署在 Vercel 上的 api/yt-chart.js 共用同一份 api/_lib/youtube.js
function ytChartApi() {
  const handler = async (req, res) => {
    try {
      const regionCode = new URL(req.url, 'http://localhost').searchParams.get('regionCode') || 'TW'
      const data = await fetchYtChartData(regionCode)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(data))
    } catch (err) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: err.message }))
    }
  }

  return {
    name: 'yt-chart-api',
    configureServer(server) {
      server.middlewares.use('/api/yt-chart', handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/yt-chart', handler)
    }
  }
}

// 本機 `npm run dev` / `npm run preview` 用的 /api/combo-chart 端點，
// 邏輯跟正式部署在 Vercel 上的 api/combo-chart.js 共用同一份 api/_lib/comboChart.js
function comboChartApi() {
  const handler = async (req, res) => {
    try {
      const params = new URL(req.url, 'http://localhost').searchParams
      const category = params.get('category') || 'mandarin'
      const territory = params.get('territory') || 'TW'
      const data = await fetchComboChartData(category, territory)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(data))
    } catch (err) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: err.message }))
    }
  }

  return {
    name: 'combo-chart-api',
    configureServer(server) {
      server.middlewares.use('/api/combo-chart', handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/combo-chart', handler)
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.KKBOX_CLIENT_ID = env.KKBOX_CLIENT_ID
  process.env.KKBOX_CLIENT_SECRET = env.KKBOX_CLIENT_SECRET
  process.env.YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

  return {
    plugins: [vue(), kkboxChartsApi(), ytChartApi(), comboChartApi()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/_variables.scss" as *;`
        }
      }
    }
  }
})
