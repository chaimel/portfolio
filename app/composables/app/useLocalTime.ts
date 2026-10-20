import { onBeforeUnmount, onMounted, ref } from 'vue'

// The time where I am ("9:41 PM"), ticking while the page is open. It stays
// empty through server render and hydration so the HTML matches, and fills
// in once mounted.
export function useLocalTime(timezone: string) {
	const time = ref('')
	const format = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: timezone })
	let timer: ReturnType<typeof setInterval> | null = null

	function tick() {
		time.value = format.format(new Date())
	}

	onMounted(() => {
		tick()
		timer = setInterval(tick, 15000)
	})

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer)
	})

	return time
}
