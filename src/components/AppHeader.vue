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

      <!-- 桌機語言下拉選單 -->
      <div class="header__lang-select" :class="{ open: langOpen }">
        <button class="header__lang-trigger" @click.stop="langOpen = !langOpen">
          {{ currentLocale === 'zh-TW' ? '繁中' : 'EN' }}
          <svg class="chevron" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="header__lang-dropdown">
          <button
            :class="{ active: currentLocale === 'zh-TW' }"
            @click="setLang('zh-TW')"
          >繁體中文</button>
          <button
            :class="{ active: currentLocale === 'en' }"
            @click="setLang('en')"
          >English</button>
        </div>
      </div>

      <button class="header__menu" @click="menuOpen = !menuOpen" aria-label="menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 手機選單 -->
    <div class="header__mobile-nav" :class="{ 'header__mobile-nav--open': menuOpen }">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-link"
        @click="menuOpen = false"
      >{{ item.label }}</RouterLink>
      <div class="mobile-lang-divider"></div>
      <button
        class="nav-link mobile-lang-btn"
        :class="{ active: currentLocale === 'zh-TW' }"
        @click="setLang('zh-TW'); menuOpen = false"
      >繁體中文</button>
      <button
        class="nav-link mobile-lang-btn"
        :class="{ active: currentLocale === 'en' }"
        @click="setLang('en'); menuOpen = false"
      >English</button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { i18n } from '@/i18n'

const navItems = [
  { name: 'about', label: 'About', path: '/about' },
  { name: 'music', label: 'Music', path: '/music' },
  { name: 'picture', label: 'Picture', path: '/picture' },
  { name: 'ytChart', label: 'YT Chart', path: '/yt-chart' },
  { name: 'join', label: 'JoinSheep', path: '/join' }
]

const route = useRoute()
const isHome = computed(() => route.path === '/')
const scrolled = ref(false)
const menuOpen = ref(false)
const langOpen = ref(false)

const currentLocale = i18n.global.locale

function setLang(lang) {
  currentLocale.value = lang
  localStorage.setItem('locale', lang)
  langOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function onClickOutside(e) {
  if (!e.target.closest('.header__lang-select')) {
    langOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
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
    .header__lang-trigger {
      color: rgba($white, 0.85);
      border-color: rgba($white, 0.5);
    }
  }

  &--opaque {
    background: rgba($black, 0.88);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  }

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
    .header__lang-trigger {
      color: $text-dark;
      border-color: rgba($text-dark, 0.35);
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

  // 下拉選單容器
  &__lang-select {
    position: relative;

    @include respond-to(mobile) {
      display: none;
    }

    &.open {
      .header__lang-dropdown {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }
      .chevron {
        transform: rotate(180deg);
      }
    }
  }

  &__lang-trigger {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 5px 10px;
    border: 1.5px solid currentColor;
    transition: color 0.3s, border-color 0.25s;

    .chevron {
      width: 10px;
      height: 6px;
      transition: transform 0.2s;
    }

    &:hover {
      color: $primary !important;
      border-color: $primary !important;
    }
  }

  &__lang-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: $white;
    border: 1px solid rgba($black, 0.1);
    box-shadow: 0 6px 20px rgba($black, 0.12);
    min-width: 120px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-6px);
    transition: opacity 0.2s ease, transform 0.2s ease;

    button {
      display: block;
      width: 100%;
      padding: 10px 16px;
      text-align: left;
      font-size: 0.85rem;
      font-family: $font-sans;
      color: $text-body;
      transition: background 0.15s, color 0.15s;

      &:hover {
        background: $gray-light;
        color: $primary;
      }

      &.active {
        color: $primary;
        font-weight: 700;
      }
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

.mobile-lang-divider {
  height: 1px;
  background: rgba($black, 0.08);
  margin: 0 -4px;
}

.mobile-lang-btn {
  color: $text-body !important;
  font-size: 0.9rem;

  &.active {
    color: $primary !important;
    font-weight: 700;
  }

  &::after {
    display: none;
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
