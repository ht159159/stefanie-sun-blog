<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/combochart/1200/400" alt="Combo Chart" />
      <div class="page__hero-overlay">
        <h1>Chart Play</h1>
      </div>
    </div>
    <div class="page__content">
      <div class="tabs">
        <button
          v-for="tab in chartTypeTabs"
          :key="tab.value"
          class="tabs__btn"
          :class="{ 'tabs__btn--active': chartType === tab.value }"
          @click="switchChartType(tab.value)"
        >{{ tab.label }}</button>
      </div>

      <div class="tabs tabs--sub">
        <button
          v-for="tab in categoryTabs"
          :key="tab.value"
          class="tabs__btn tabs__btn--sub"
          :class="{ 'tabs__btn--active': category === tab.value }"
          @click="switchCategory(tab.value)"
        >{{ tab.label }}</button>
      </div>

      <h2 class="section-title">{{ chartData?.chartTitle ?? '排行榜' }}</h2>

      <p v-if="loading" class="status">載入排行榜中…</p>
      <p v-else-if="error" class="status">排行榜載入失敗：{{ error }}</p>
      <div v-else-if="chartData" class="chart-layout">
        <ol class="chart-list">
          <li
            v-for="track in chartData.tracks"
            :key="track.rank"
            class="chart-item"
            :class="{ 'chart-item--active': selectedTrack?.rank === track.rank, 'chart-item--disabled': !track.videoId }"
            @click="track.videoId && (selectedTrack = track)"
          >
            <span class="chart-item__rank">{{ track.rank }}</span>
            <span class="chart-item__thumb">
              <img :src="track.cover" :alt="track.name" />
            </span>
            <div class="chart-item__info">
              <span class="chart-item__title">{{ track.name }}</span>
              <p class="chart-item__artist">{{ track.artist }}</p>
              <p v-if="!track.videoId" class="chart-item__no-video">找不到對應 MV</p>
            </div>
          </li>
        </ol>

        <div class="chart-player">
          <div class="chart-player__frame">
            <iframe
              v-if="selectedTrack?.videoId"
              :key="selectedTrack.videoId"
              :src="`https://www.youtube.com/embed/${selectedTrack.videoId}?autoplay=1`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div v-else class="chart-player__empty">選一首左邊有 MV 的歌來播放</div>
          </div>
          <p v-if="selectedTrack" class="chart-player__title">{{ selectedTrack.name }} — {{ selectedTrack.artist }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartTypeTabs = [
  { value: 'single', label: '單曲' },
  { value: 'new', label: '新歌' }
]
const categoryTabs = [
  { value: 'mandarin', label: '華語' },
  { value: 'western', label: '西洋' }
]

const chartType = ref('single')
const category = ref('mandarin')
const chartData = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedTrack = ref(null)

async function loadChart() {
  loading.value = true
  error.value = null
  selectedTrack.value = null
  try {
    const res = await fetch(`/api/combo-chart?chartType=${chartType.value}&category=${category.value}`)
    if (!res.ok) throw new Error((await res.json()).error ?? res.statusText)
    chartData.value = await res.json()
    selectedTrack.value = chartData.value.tracks.find((t) => t.videoId) ?? null
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function switchChartType(value) {
  if (chartType.value === value) return
  chartType.value = value
  loadChart()
}

function switchCategory(value) {
  if (category.value === value) return
  category.value = value
  loadChart()
}

onMounted(loadChart)
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

.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  &--sub {
    margin-bottom: 32px;
  }

  &__btn {
    padding: 8px 20px;
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 700;
    color: $text-body;
    border: 2px solid rgba($black, 0.15);
    background: $white;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background 0.2s;

    &:hover {
      border-color: $primary;
      color: $primary;
    }

    &--active {
      background: $primary;
      border-color: $primary;
      color: $white;
    }

    &--sub {
      padding: 6px 16px;
      font-size: 0.8rem;
      border-width: 1px;
    }
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

.chart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
  }
}

.chart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @include respond-to(tablet) {
    order: 2;
  }
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: $gray-light;
  }

  &--active {
    border-color: $primary;
    background: $gray-light;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background: none;
    }
  }

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
      width: 56px;
      height: 56px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--active &__title {
    color: $primary;
  }

  &__artist {
    font-size: 0.85rem;
    color: $text-body;
  }

  &__no-video {
    font-size: 0.75rem;
    color: $gray-mid;
  }
}

.chart-player {
  position: sticky;
  top: calc($header-height + 24px);

  @include respond-to(tablet) {
    position: static;
    order: 1;
    margin-bottom: 24px;
  }

  &__frame {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    background: $black;
    overflow: hidden;

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  &__empty {
    position: absolute;
    inset: 0;
    @include flex-center;
    color: rgba($white, 0.6);
    font-size: 0.85rem;
    text-align: center;
    padding: 0 24px;
  }

  &__title {
    margin-top: 12px;
    font-family: $font-sans;
    font-size: 0.95rem;
    font-weight: 700;
    color: $text-dark;
  }
}
</style>
