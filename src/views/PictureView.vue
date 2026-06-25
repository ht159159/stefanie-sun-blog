<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/picture/1200/400" alt="Picture" />
      <div class="page__hero-overlay">
        <h1>Picture</h1>
      </div>
    </div>
    <div class="page__content">
      <h2 class="section-title">Gallery</h2>
      <div class="gallery">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="gallery__item"
          :class="{ 'gallery__item--wide': i % 5 === 0 }"
          @click="lightbox = item"
        >
          <img :src="item" :alt="`Photo ${i + 1}`" />
        </div>
      </div>
      <Transition name="fade">
        <div v-if="lightbox" class="lightbox" @click="lightbox = null">
          <button class="lightbox__close" @click="lightbox = null">✕</button>
          <img :src="lightbox" alt="Full size" @click.stop />
        </div>
      </Transition>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const gallery = Array.from({ length: 9 }, (_, i) =>
  `https://picsum.photos/seed/gallery${i}/600/400`
)

const lightbox = ref(null)
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

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @include respond-to(mobile) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__item {
    overflow: hidden;
    cursor: pointer;

    &--wide {
      grid-column: span 2;

      @include respond-to(mobile) {
        grid-column: span 1;
      }
    }

    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      transition: transform 0.4s ease, filter 0.3s ease;
    }

    &:hover img {
      transform: scale(1.06);
      filter: brightness(0.85);
    }
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba($black, 0.92);
  z-index: 200;
  @include flex-center;

  img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 24px;
    color: $white;
    font-size: 1.5rem;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
