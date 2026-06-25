<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/join/1200/400" alt="Join" />
      <div class="page__hero-overlay">
        <h1>Join</h1>
      </div>
    </div>
    <div class="page__content">
      <div class="join-form-wrap">
        <h2 class="join-form-wrap__title">加入孫燕姿官方粉絲團</h2>
        <p class="join-form-wrap__desc">
          訂閱最新音樂資訊、演唱會消息與獨家內容，第一時間掌握所有動態。
        </p>
        <form class="join-form" @submit.prevent="handleSubmit">
          <div class="join-form__row">
            <div class="join-form__field">
              <label>姓名</label>
              <input v-model="form.name" type="text" placeholder="您的姓名" required />
            </div>
            <div class="join-form__field">
              <label>電子郵件</label>
              <input v-model="form.email" type="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div class="join-form__field">
            <label>所在地區</label>
            <select v-model="form.region">
              <option value="">請選擇</option>
              <option value="tw">台灣</option>
              <option value="hk">香港</option>
              <option value="sg">新加坡</option>
              <option value="cn">中國大陸</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div class="join-form__checkboxes">
            <label class="checkbox">
              <input v-model="form.subscribeNews" type="checkbox" />
              <span>訂閱最新音樂消息</span>
            </label>
            <label class="checkbox">
              <input v-model="form.subscribeConcert" type="checkbox" />
              <span>訂閱演唱會資訊</span>
            </label>
          </div>
          <button type="submit" class="join-form__submit" :disabled="submitted">
            {{ submitted ? '已成功訂閱！' : '立即加入' }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMusicStore } from '@/stores/musicStore'

const store = useMusicStore()
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  region: '',
  subscribeNews: true,
  subscribeConcert: false
})

function handleSubmit() {
  store.subscribe(form.email)
  submitted.value = true
}
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
    padding-top: 80px;
    padding-bottom: 80px;
  }
}

.join-form-wrap {
  max-width: 640px;
  margin: 0 auto;

  &__title {
    font-family: $font-serif;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }

  &__desc {
    font-size: 0.95rem;
    color: $text-body;
    line-height: 1.7;
    margin-bottom: 40px;
  }
}

.join-form {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: $text-dark;
    }

    input, select {
      padding: 12px 14px;
      border: 1px solid #ddd;
      outline: none;
      font-family: $font-sans;
      font-size: 0.95rem;
      color: $text-dark;
      background: $white;
      transition: border-color 0.2s;

      &:focus {
        border-color: $primary;
      }
    }
  }

  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__submit {
    padding: 14px 40px;
    background: $primary;
    color: $white;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    align-self: flex-start;
    transition: background 0.25s;

    &:hover:not(:disabled) {
      background: $primary-dark;
    }

    &:disabled {
      background: #aaa;
      cursor: not-allowed;
    }
  }
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: $text-body;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: $primary;
    cursor: pointer;
  }
}
</style>
