<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/ytchart/1200/400" alt="YT Chart" />
      <div class="page__hero-overlay">
        <h1>YT Chart</h1>
      </div>
    </div>
    <div class="page__content">
      <h2 class="section-title">{{ chartData?.chartTitle ?? 'YouTube 熱門音樂影片' }}</h2>

      <p v-if="loading" class="status">載入排行榜中…</p>
      <p v-else-if="error" class="status">排行榜載入失敗：{{ error }}</p>
      <ol v-else-if="chartData" class="chart-list">
        <li v-for="video in chartData.videos" :key="video.rank" class="chart-item">
          <span class="chart-item__rank">{{ video.rank }}</span>
          <a :href="video.url" target="_blank" rel="noopener" class="chart-item__thumb">
            <img :src="video.thumbnail" :alt="video.title" />
          </a>
          <div class="chart-item__info">
            <a :href="video.url" target="_blank" rel="noopener" class="chart-item__title">{{ video.title }}</a>
            <p class="chart-item__channel">{{ video.channel }}</p>
            <p class="chart-item__views">{{ video.viewCount.toLocaleString() }} 次觀看</p>
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartData = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/yt-chart')
    if (!res.ok) throw new Error((await res.json()).error ?? res.statusText)
    chartData.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.page {
  padding-top: $header-height;

  &__hero {
    position: relative;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      background: rgba($black, 0.5);
      @include flex-center;

      h1 {
        font-family: $font-serif;
        font-size: clamp(2rem, 5vw, 4rem);
        color: $white;
        letter-spacing: 0.1em;
      }
    }
  }

  &__content {
    @include container;
    padding-top: 64px;
    padding-bottom: 80px;
  }
}

.section-title {
  font-family: $font-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 2px solid $primary;
  display: inline-block;
}

.status {
  font-size: 0.9rem;
  color: $text-body;
}

.chart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 16px;

  &__rank {
    width: 32px;
    flex-shrink: 0;
    font-family: $font-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: $primary;
    text-align: center;
  }

  &__thumb {
    flex-shrink: 0;
    display: block;

    img {
      width: 120px;
      height: 68px;
      object-fit: cover;
    }
  }

  &__info {
    min-width: 0;
  }

  &__title {
    display: block;
    font-family: $font-sans;
    font-size: 0.95rem;
    font-weight: 700;
    color: $text-dark;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      color: $primary;
    }
  }

  &__channel {
    font-size: 0.85rem;
    color: $text-body;
  }

  &__views {
    font-size: 0.8rem;
    color: $gray-mid;
  }
}
</style>
