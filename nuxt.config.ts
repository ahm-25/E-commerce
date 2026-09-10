// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/theme.css',
    '~/assets/css/global.css'
  ],
  i18n: {
    // Absolute URLs are required for the hreflang/canonical tags; override per
    // environment with NUXT_PUBLIC_I18N_BASE_URL.
    baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL || 'http://localhost:3000',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: '../i18n/locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar-EG', name: 'العربية', dir: 'rtl', file: 'ar.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      redirectOn: 'root'
    },
    experimental: {
      // Lets the module own <html lang/dir>, canonical and hreflang tags itself,
      // so no page has to wire them up by hand.
      strictSeo: true
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
