// v-reveal: content below the fold fades up as it scrolls into view.
// It is a progressive enhancement — the server renders everything
// visible, and only elements that start off-screen are hidden on mount,
// so nothing flashes and nothing stays hidden without JavaScript.
// An optional value staggers the element: v-reveal="120" waits 120ms.
// Once shown, the helper classes come off again so they never fight
// the element's own hover transitions.
const DURATION = 700

export default defineNuxtPlugin((nuxt_app) => {
	let observer: IntersectionObserver | null = null

	function show(element: HTMLElement) {
		element.classList.add('is-revealed')

		const delay = Number.parseFloat(element.style.transitionDelay) || 0
		window.setTimeout(() => {
			element.classList.remove('reveal', 'is-revealed')
			element.style.transitionDelay = ''
		}, DURATION + delay + 100)
	}

	function getObserver() {
		observer ??= new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					observer?.unobserve(entry.target)
					show(entry.target as HTMLElement)
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
		)

		return observer
	}

	nuxt_app.vueApp.directive<HTMLElement, number | undefined>('reveal', {
		mounted(element, binding) {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
			if (element.getBoundingClientRect().top < window.innerHeight) return

			element.classList.add('reveal')
			if (binding.value) element.style.transitionDelay = `${binding.value}ms`
			getObserver().observe(element)
		},
		unmounted(element) {
			observer?.unobserve(element)
		},
	})
})
