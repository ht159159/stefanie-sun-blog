<template>
  <section class="whats-new">
    <div class="whats-new__inner">
      <div v-for="item in news" :key="item.id" class="card">
        <div class="card__icon">
          <component :is="iconComponent(item.icon)" />
        </div>
        <h3 class="card__title">{{ $t('news.title') }}</h3>
        <p class="card__body">{{ item.body }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMusicStore } from '@/stores/musicStore'

const store = useMusicStore()
const news = computed(() => store.news)

function iconComponent(type) {
  return {
    star: StarIcon,
    location: LocationIcon,
    gear: GearIcon
  }[type] || StarIcon
}

// Inline SVG icon components
const StarIcon = {
  template: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4l4.5 9.1 10 1.5-7.25 7.06 1.7 9.94L20 26.9l-8.95 4.7 1.7-9.94L5.5 14.6l10-1.5z"
      stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  </svg>`
}

const LocationIcon = {
  template: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="17" r="5" stroke="currentColor" stroke-width="2"/>
    <path d="M20 5C13.37 5 8 10.37 8 17c0 9.5 12 20 12 20s12-10.5 12-20c0-6.63-5.37-12-12-12z"
      stroke="currentColor" stroke-width="2"/>
  </svg>`
}

const GearIcon = {
  template: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="5" stroke="currentColor" stroke-width="2"/>
    <path d="M20 5v4M20 31v4M5 20h4M31 20h4M8.79 8.79l2.83 2.83M28.38 28.38l2.83 2.83M8.79 31.21l2.83-2.83M28.38 11.62l2.83-2.83"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.whats-new {
  padding: 80px 0;
  background: $white;

  &__inner {
    @include container;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
}

.card {
  text-align: center;

  &__icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 20px;
    color: $primary;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-family: $font-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: $primary;
    margin-bottom: 16px;
  }

  &__body {
    font-size: 0.9rem;
    color: $text-body;
    line-height: 1.75;
    font-style: italic;
  }
}
</style>
