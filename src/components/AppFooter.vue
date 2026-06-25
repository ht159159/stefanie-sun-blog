<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__copy">Universal Music Taiwan Ltd.</p>
      <nav class="footer__nav">
        <RouterLink v-for="item in navItems" :key="item.name" :to="item.path" class="footer__link">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'about', label: 'About', path: '/about' },
  { name: 'music', label: 'Music', path: '/music' },
  { name: 'picture', label: 'Picture', path: '/picture' },
  { name: 'join', label: 'Join', path: '/join' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.footer {
  background: $black;
  padding: 28px 0;

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include respond-to(mobile) {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }

  &__copy {
    font-size: 0.85rem;
    color: rgba($white, 0.6);
    letter-spacing: 0.05em;
  }

  &__nav {
    display: flex;
    gap: 28px;
  }

  &__link {
    font-size: 0.82rem;
    color: rgba($white, 0.5);
    letter-spacing: 0.04em;
    transition: color 0.2s;

    &:hover {
      color: $white;
    }
  }
}
</style>
