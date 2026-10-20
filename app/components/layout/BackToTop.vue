<template>
	<Transition name="back-to-top">
		<button
			v-show="is_shown"
			type="button"
			class="back-to-top"
			aria-label="Back to top"
			@click="toTop"
		>
			<MIcon name="light-arrow-up" size="md" />
		</button>
	</Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// A round button in the corner once the visitor is a screen or more
// down a long page.
const is_shown = ref(false)
let frame = 0

function read() {
	frame = 0
	is_shown.value = window.scrollY > window.innerHeight
}

function onScroll() {
	if (!frame) frame = requestAnimationFrame(read)
}

function toTop() {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
	read()
	window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll)
	if (frame) cancelAnimationFrame(frame)
})
</script>

<style lang="scss" scoped>
.back-to-top {
	position: fixed;
	right: 24px;
	bottom: 24px;
	z-index: 40;
	display: grid;
	place-items: center;
	width: 52px;
	height: 52px;
	border-radius: 50%;
	background: var(--brand-strong);
	box-shadow: var(--shadow-pop);
	color: var(--white);
	transition:
		background-color 0.2s var(--ease),
		transform 0.25s var(--ease);

	.m-icon {
		transition: transform 0.25s var(--ease);
	}

	&:hover {
		background: var(--brand-deep);

		.m-icon {
			transform: translateY(-3px);
		}
	}
}

.back-to-top-enter-active,
.back-to-top-leave-active {
	transition:
		opacity 0.25s var(--ease),
		transform 0.25s var(--ease);
}

.back-to-top-enter-from,
.back-to-top-leave-to {
	opacity: 0;
	transform: translateY(12px);
}

@media only screen and (max-width: 600px) {
	.back-to-top {
		right: 16px;
		bottom: 16px;
		width: 46px;
		height: 46px;
	}
}
</style>
