import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW'
import en from './locales/en'

const savedLocale = localStorage.getItem('locale') || 'zh-TW'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTW,
    en
  }
})
