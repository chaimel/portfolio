// Canonical link and og:url for an indexable page. Both need the real
// production origin, so they are only emitted once NUXT_PUBLIC_SITE_URL
// is set — the site never ships a guessed domain.
export function useCanonical(path: string) {
	const site_url = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
	if (!site_url) return undefined

	const href = `${site_url}${path}`

	useHead({
		link: [{ rel: 'canonical', href }],
		meta: [{ property: 'og:url', content: href }],
	})

	return href
}
