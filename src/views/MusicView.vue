<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/music/1200/400" alt="Music" />
      <div class="page__hero-overlay">
        <h1>Music</h1>
      </div>
    </div>
    <div class="page__content">
      <h2 class="section-title">Discography</h2>
      <div class="album-grid">
        <article v-for="album in albums" :key="album.id" class="album-card">
          <div class="album-card__cover">
            <img :src="album.cover" :alt="album.title" />
            <div class="album-card__overlay">
              <span>{{ album.number }}</span>
            </div>
          </div>
          <div class="album-card__info">
            <h3>{{ album.title }}</h3>
            <p>{{ album.year }} · {{ album.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useMusicStore } from '@/stores/musicStore'

const store = useMusicStore()
const albums = computed(() => store.albums)
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

.album-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @include respond-to(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.album-card {
  &__cover {
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    &-overlay {
      position: absolute;
      top: 12px;
      left: 12px;
      background: $primary;
      color: $white;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
  }

  &__info {
    padding: 16px 0;

    h3 {
      font-family: $font-serif;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 6px;
    }

    p {
      font-size: 0.85rem;
      color: $gray-mid;
    }
  }
}
</style>
