<template>
  <section class="featured">
    <div class="featured__inner">
      <div class="featured__image">
        <img src="https://picsum.photos/seed/dance/600/500" alt="跳舞的梵谷" />
      </div>
      <div class="featured__content">
        <h2 class="featured__title">{{ $t('featured.title') }}</h2>
        <p class="featured__text">{{ $t('featured.text') }}</p>
        <RouterLink to="/music" class="featured__btn">{{ $t('featured.btn') }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.featured {
  background: $gray-light;
  padding: 80px 0;

  &__inner {
    @include container;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  &__image {
    overflow: hidden;

    img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  &__content {
    padding: 16px 0;
  }

  &__title {
    font-family: $font-serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 24px;
  }

  &__text {
    font-size: 0.95rem;
    color: $text-body;
    line-height: 1.85;
    font-style: italic;
    margin-bottom: 32px;
  }

  &__btn {
    display: inline-block;
    padding: 12px 32px;
    border: 2px solid $text-dark;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: $text-dark;
    transition: background 0.25s, color 0.25s, border-color 0.25s;

    &:hover {
      background: $primary;
      color: $white;
      border-color: $primary;
    }
  }
}
</style>
