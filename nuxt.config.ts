export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      // Production origin, e.g. https://chaimel.dev — set via the NUXT_PUBLIC_SITE_URL env var.
      // Leave empty in dev. Absolute-URL SEO tags (canonical, og:url, og:image, twitter:image)
      // are only emitted when this is set — so we never ship a guessed/wrong domain.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Chaimel Enjambre | Front-End Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0d5959' },
        {
          name: 'description',
          content:
            'Portfolio of Chaimel Enjambre, a front-end developer specializing in WordPress, Nuxt.js, HTML, CSS, and JavaScript.',
        },
        { property: 'og:title', content: 'Chaimel Enjambre | Front-End Developer' },
        {
          property: 'og:description',
          content: 'Clean, responsive websites built with WordPress, Nuxt.js, and modern front-end tooling.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Chaimel Enjambre' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Chaimel Enjambre | Front-End Developer' },
        {
          name: 'twitter:description',
          content: 'Clean, responsive websites built with WordPress, Nuxt.js, and modern front-end tooling.',
        },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
      ],
      link: [
        {
          rel: 'icon',
          href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23137c7b'/%3E%3Ctext x='50%25' y='54%25' font-family='Arial,sans-serif' font-size='30' font-weight='800' fill='white' text-anchor='middle' dominant-baseline='middle'%3ECE%3C/text%3E%3C/svg%3E",
        },
        { rel: 'preload', href: '/hero-developer.png', as: 'image' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
    },
  },
})
