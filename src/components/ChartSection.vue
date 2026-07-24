<template>
  <section class="chart-section">
    <div class="chart-section__inner">
      <p v-if="loading" class="chart-section__status">載入排行榜中…</p>
      <p v-else-if="error" class="chart-section__status">排行榜載入失敗：{{ error }}</p>
      <template v-else-if="chartData">
        <h2 class="chart-section__title">{{ chartData.chartTitle }}</h2>
        <ol class="chart-list">
          <li v-for="track in chartData.tracks" :key="track.rank" class="chart-item">
            <span class="chart-item__rank">{{ track.rank }}</span>
            <img class="chart-item__cover" :src="track.cover" :alt="track.name" />
            <div class="chart-item__info">
              <a class="chart-item__name" :href="track.url" target="_blank" rel="noopener">{{ track.name }}</a>
              <p class="chart-item__artist">{{ track.artist }}</p>
            </div>
          </li>
        </ol>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartData = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/charts')
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

.chart-section {
  padding: 80px 0;
  background: $gray-light;

  &__inner {
    @include container;
  }

  &__title {
    font-family: $font-serif;
    font-size: 1.75rem;
    color: $text-dark;
    margin-bottom: 32px;
  }

  &__status {
    font-size: 0.9rem;
    color: $text-body;
  }
}

.chart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

  &__cover {
    width: 56px;
    height: 56px;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__info {
    min-width: 0;
  }

  &__name {
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

  &__artist {
    font-size: 0.85rem;
    color: $text-body;
  }
}
</style>
