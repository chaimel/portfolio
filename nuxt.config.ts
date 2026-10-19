// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	imports: {
		dirs: ['composables/**'],
	},
	css: ['~/assets/scss/main.scss'],
	components: [
		{ path: '~/components/base', pathPrefix: false },
		{ path: '~/components', pathPrefix: true, ignore: ['base/**'] },
	],
	runtimeConfig: {
		public: {
			// Production origin, e.g. https://chaimel.dev. Nuxt fills it from the
			// NUXT_PUBLIC_SITE_URL env var at build time. Absolute-URL SEO tags
			// (canonical, og:url, og:image) are only emitted when it's set, so the
			// site never ships a guessed domain.
			siteUrl: '',
		},
	},
	app: {
		head: {
			htmlAttrs: { lang: 'en' },
			meta: [
				// brand-strong teal, the browser chrome on mobile
				{ name: 'theme-color', content: '#0d5959' },
				{ name: 'robots', content: 'index, follow, max-image-preview:large' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'Chaimel Enjambre' },
				{ property: 'og:locale', content: 'en_US' },
				{ name: 'twitter:card', content: 'summary_large_image' },
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
			],
		},
	},
})
