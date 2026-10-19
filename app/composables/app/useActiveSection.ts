import { onBeforeUnmount, onMounted, ref } from 'vue'

// Which of the home page's sections is under the reading line (a band
// just above the middle of the viewport), for the header's nav state.
// Re-observes after every page change; off the home page it stays null.
export function useActiveSection(ids: string[]) {
	const active = ref<string | null>(null)
	const nuxt_app = useNuxtApp()
	const route = useRoute()

	let observer: IntersectionObserver | null = null
	let stop_hook: (() => void) | null = null

	function observe() {
		observer?.disconnect()
		active.value = null
		if (route.path !== '/') return

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active.value = entry.target.id || null
				}
			},
			{ rootMargin: '-42% 0px -57% 0px' },
		)

		// the banner clears the state when the visitor scrolls back up
		for (const id of ['top', ...ids]) {
			const element = document.getElementById(id)
			if (element) observer.observe(element)
		}
	}

	onMounted(() => {
		observe()
		stop_hook = nuxt_app.hook('page:finish', observe)
	})

	onBeforeUnmount(() => {
		observer?.disconnect()
		stop_hook?.()
	})

	return active
}
