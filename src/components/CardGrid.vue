<template>
  <section class="card-grid">
    <div class="card-grid__inner">
      <div class="card-grid__cards">
        <article v-for="card in cards" :key="card.id" class="post-card">
          <div class="post-card__image">
            <img :src="card.image" :alt="card.title" />
          </div>
          <div class="post-card__body">
            <h3 class="post-card__title">{{ card.title }}</h3>
            <p class="post-card__excerpt">{{ card.excerpt }}</p>
          </div>
        </article>
      </div>
      <div class="card-grid__quote">
        <blockquote class="quote">
          <p>理智與瘋狂一直是一種在我內心的掙扎。</p>
          <p>我常常想說，我不可能是單獨的，</p>
          <p>世界上一定有很多跟我一樣的人，</p>
          <p>一樣被賦予一些些瘋狂的人。</p>
          <footer class="quote__author">—孫燕姿</footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMusicStore } from '@/stores/musicStore'

const store = useMusicStore()
const cards = computed(() => store.cards)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.card-grid {
  padding: 80px 0;
  background: $white;

  &__inner {
    @include container;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }
}

.post-card {
  &__image {
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__title {
    font-family: $font-sans;
    font-size: 1rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 10px;
  }

  &__excerpt {
    font-size: 0.85rem;
    color: $text-body;
    line-height: 1.7;
    font-style: italic;
  }
}

.quote {
  padding: 16px 0;

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 700;
    color: $text-dark;
    line-height: 1.9;
    letter-spacing: 0.03em;
  }

  &__author {
    margin-top: 24px;
    font-size: 1.1rem;
    font-weight: 700;
    color: $text-dark;
    text-align: right;
    font-style: normal;

    @include respond-to(mobile) {
      text-align: left;
    }
  }
}
</style>
