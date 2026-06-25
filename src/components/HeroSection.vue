<template>
  <section class="hero">
    <div class="hero__bg">
      <img src="https://picsum.photos/seed/stefanie/1200/700" alt="Stefanie Sun" class="hero__img" />
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      <h1 class="hero__title">
        <em>{{ album.title }},</em>
        <span class="hero__year">{{ album.year }}</span>
      </h1>
      <p class="hero__number">{{ album.number }}</p>
      <div class="hero__subscribe">
        <form @submit.prevent="handleSubscribe" class="hero__form">
          <input
            v-model="email"
            type="email"
            placeholder="Get new music info"
            class="hero__input"
          />
        </form>
        <p v-if="subscribed" class="hero__thanks">感謝訂閱！</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMusicStore } from '@/stores/musicStore'

const store = useMusicStore()
const album = computed(() => store.featuredAlbum)
const email = ref('')
const subscribed = ref(false)

function handleSubscribe() {
  if (!email.value) return
  store.subscribe(email.value)
  subscribed.value = true
  email.value = ''
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.hero {
  position: relative;
  height: 100vh;
  min-height: 560px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 100px;

  &__bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  // 上方漸層讓 header 文字可讀，左側漸層讓內文可讀
  &__overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to bottom, rgba($black, 0.35) 0%, transparent 30%),
      linear-gradient(to right, rgba($black, 0.6) 0%, rgba($black, 0.25) 55%, transparent 100%);
  }

  &__content {
    @include container;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  &__title {
    font-family: $font-serif;
    line-height: 1.05;
    margin-bottom: 10px;

    em {
      display: block;
      font-size: clamp(2.6rem, 6.5vw, 5rem);
      font-style: italic;
      font-weight: 400;
      color: $primary;
    }
  }

  &__year {
    display: inline-block;
    font-size: clamp(1.4rem, 3.5vw, 2.6rem);
    font-style: italic;
    font-weight: 400;
    color: $primary;
    margin-left: 0.2em;
  }

  &__number {
    font-size: 0.95rem;
    font-weight: 700;
    color: $primary;
    letter-spacing: 0.08em;
    margin-bottom: 28px;
  }

  &__form {
    display: flex;
    max-width: 300px;
    border: 2px solid $white;
  }

  &__input {
    width: 100%;
    padding: 11px 18px;
    background: transparent;
    border: none;
    outline: none;
    color: $white;
    font-family: $font-sans;
    font-size: 0.9rem;

    &::placeholder {
      color: rgba($white, 0.85);
    }
  }

  &__thanks {
    margin-top: 10px;
    color: $primary;
    font-weight: 500;
    font-size: 0.9rem;
  }
}
</style>
