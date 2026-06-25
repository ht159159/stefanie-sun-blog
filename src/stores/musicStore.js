import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMusicStore = defineStore('music', () => {
  const albums = ref([
    {
      id: 1,
      title: 'A Dancing Van Gogh',
      year: 2017,
      number: 'NO.13',
      description: '跳舞的梵谷',
      cover: 'https://picsum.photos/seed/album1/800/500',
      featured: true
    },
    {
      id: 2,
      title: 'Stefanie',
      year: 2000,
      number: 'NO.1',
      description: '第一張同名專輯',
      cover: 'https://picsum.photos/seed/album2/400/300',
      featured: false
    },
    {
      id: 3,
      title: 'My Secret',
      year: 2001,
      number: 'NO.2',
      description: '我的秘密',
      cover: 'https://picsum.photos/seed/album3/400/300',
      featured: false
    }
  ])

  const news = ref([
    {
      id: 1,
      icon: 'star',
      title: "What's New?",
      body: 'In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et elit eget elit facilisis tristique.'
    },
    {
      id: 2,
      icon: 'location',
      title: "What's New?",
      body: 'Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer, food truck Banksy'
    },
    {
      id: 3,
      icon: 'gear',
      title: "What's New?",
      body: 'In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et elit eget elit facilisis tristique.'
    }
  ])

  const cards = ref([
    {
      id: 1,
      image: 'https://picsum.photos/seed/card1/300/200',
      title: 'Know how much?',
      excerpt: 'I have hinted that I would often jerk poor Queequeg from between the whale'
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/card2/300/200',
      title: 'Van Goho',
      excerpt: 'I have hinted that I would often jerk poor Queequeg from between the whale'
    }
  ])

  const emailSubscribed = ref(false)

  const featuredAlbum = computed(() => albums.value.find(a => a.featured))

  function subscribe(email) {
    emailSubscribed.value = true
  }

  return { albums, news, cards, emailSubscribed, featuredAlbum, subscribe }
})
