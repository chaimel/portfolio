// Links to a home-page section ("/#work"). On the home page the section
// is already here, so scroll to it directly: a repeat click still moves,
// where the router would ignore a second visit to the same location.
// From any other page the link's own `to` goes home first.
export function useSectionScroll() {
	const route = useRoute()

	function scrollToSection(event: MouseEvent, section: string | undefined) {
		if (route.path !== '/' || !section) return

		const target = document.getElementById(section)
		if (!target) return

		event.preventDefault()
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
	}

	return { scrollToSection }
}
