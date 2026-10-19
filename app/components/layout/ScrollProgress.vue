<template>
	<div class="scroll-progress" aria-hidden="true">
		<span ref="bar" class="scroll-progress__bar" />
	</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// The brand stripe across the top of the window, filled as the page
// scrolls. Reads the scroll position at most once per frame.
const bar = ref<HTMLElement | null>(null)
const nuxt_app = useNuxtApp()

let frame = 0
let stop_hook: (() => void) | null = null

function update() {
	frame = 0
	const root = document.documentElement
	const max = root.scrollHeight - root.clientHeight
	const progress = max > 0 ? Math.min(Math.max(root.scrollTop / max, 0), 1) : 0
	if (bar.value) bar.value.style.transform = `scaleX(${progress})`
}

function schedule() {
	if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
	update()
	window.addEventListener('scroll', schedule, { passive: true })
	window.addEventListener('resize', schedule, { passive: true })
	// a new page has a new height
	stop_hook = nuxt_app.hook('page:finish', schedule)
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', schedule)
	window.removeEventListener('resize', schedule)
	stop_hook?.()
	if (frame) cancelAnimationFrame(frame)
})
</script>

<style lang="scss" scoped>
.scroll-progress {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 60;
	height: 3px;
	pointer-events: none;

	&__bar {
		display: block;
		height: 100%;
		background: var(--gradient-brand);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.12s linear;
		will-change: transform;
	}
}
</style>
