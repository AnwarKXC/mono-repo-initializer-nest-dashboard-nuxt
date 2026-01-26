// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', 'nuxt-og-image', 'motion-v/nuxt'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 3001
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  }
})
