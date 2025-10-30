// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 禁用 SSR
  ssr: false,
  app :{
    head: {
      title: '舊式風格聊天室'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NODE_ENV === 'production'
      ? 'http://chatsimulation2025.atwebpages.com'
      : 'http://localhost/chatroom'
    }
  }
})