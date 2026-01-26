import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  devServer: {
    port: 3002
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        port: 24680
      }
    }
  },

  components: [
    {
      path: '~/components',
      extensions: ['.vue']
    }
  ],

  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "~/components/ui"
     */
    componentDir: '~/components/ui'
  },

  colorMode: {
    classSuffix: ''
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800]
    }
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' }
  },

  imports: {
    dirs: ['./lib']
  },

  compatibilityDate: '2024-12-14'
})
