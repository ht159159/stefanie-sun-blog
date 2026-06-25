import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/music', name: 'music', component: () => import('@/views/MusicView.vue') },
  { path: '/picture', name: 'picture', component: () => import('@/views/PictureView.vue') },
  { path: '/join', name: 'join', component: () => import('@/views/JoinView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
