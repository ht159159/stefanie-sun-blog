import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { fetchChartData } from './api/_lib/kkbox.js'

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.KKBOX_CLIENT_ID = env.KKBOX_CLIENT_ID
  process.env.KKBOX_CLIENT_SECRET = env.KKBOX_CLIENT_SECRET

  return {
    plugins: [vue(), kkboxChartsApi()],
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
