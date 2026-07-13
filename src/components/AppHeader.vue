<template>
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--opaque': !isHome && !scrolled }">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo">
        <span class="logo-first">Stefanie</span>
        <span class="logo-second">Sun</span>
      </RouterLink>
      <nav class="header__nav">
        <RouterLink v-for="item in navItems" :key="item.name" :to="item.path" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
      <button class="header__menu" @click="menuOpen = !menuOpen" aria-label="menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="header__mobile-nav" :class="{ 'header__mobile-nav--open': menuOpen }">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-link"
        @click="menuOpen = false"
      >{{ item.label }}</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const navItems = [
  { name: 'about', label: 'About', path: '/about' },
  { name: 'music', label: 'Music', path: '/music' },
  { name: 'picture', label: 'Picture', path: '/picture' },
  { name: 'join', label: 'JoinSheep', path: '/join' }
]

const route = useRoute()
const isHome = computed(() => route.path === '/')
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s, box-shadow 0.3s;

  // 未滾動時：透明疊在 hero 上，logo/nav 用白色以對抗深色 overlay
  &:not(&--scrolled) {
    .logo-first,
    .logo-second {
      color: $white;
    }
    .nav-link {
      color: rgba($white, 0.9);
    }
    .header__menu span {
      background: $white;
    }
  }

  // 非首頁且未滾動：深色背景，文字保持白色
  &--opaque {
    background: rgba($black, 0.88);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  }

  // 滾動後：白色背景，深色文字
  &--scrolled {
    background: rgba($white, 0.97);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .logo-first,
    .logo-second {
      color: $black;
    }
    .nav-link {
      color: $text-dark;
    }
    .header__menu span {
      background: $black;
    }
  }

  &__inner {
    @include container;
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: $font-serif;
    font-weight: 700;

    .logo-first {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
      transition: color 0.3s;
    }

    .logo-second {
      font-size: 1.8rem;
      letter-spacing: -0.03em;
      margin-top: -4px;
      transition: color 0.3s;
    }
  }

  &__nav {
    display: flex;
    gap: 40px;

    @include respond-to(mobile) {
      display: none;
    }
  }

  &__menu {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 4px;

    span {
      display: block;
      width: 24px;
      height: 2px;
      transition: all 0.2s;
    }

    @include respond-to(mobile) {
      display: flex;
    }
  }

  &__mobile-nav {
    display: none;
    flex-direction: column;
    background: $white;
    padding: 16px 24px;
    border-top: 1px solid rgba($black, 0.08);
    gap: 16px;

    @include respond-to(mobile) {
      &--open {
        display: flex;
      }
    }
  }
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: $primary;
    transition: width 0.25s;
  }

  &:hover::after,
  &.router-link-active::after {
    width: 100%;
  }
}
</style>
