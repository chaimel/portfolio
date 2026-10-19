<template>
	<span class="rotator">
		<!-- every word sits in one grid cell, so the chip is as wide as the
			 longest word and the headline never reflows as they change -->
		<span class="rotator__words" aria-hidden="true">
			<span
				v-for="(word, index) in props.words"
				:key="word"
				:class="['rotator__word', {
					'rotator__word--current': index === current,
					'rotator__word--previous': index === previous,
				}]"
			>{{ word }}</span>
		</span>
		<span class="sr-only">{{ props.words.join(', ') }}</span>
	</span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
	words: string[]
	// ms each word stays
	interval?: number
}

const props = withDefaults(defineProps<Props>(), {
	interval: 2600,
})

const current = ref(0)
const previous = computed(() => (current.value - 1 + props.words.length) % props.words.length)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
	if (props.words.length < 2) return
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	timer = setInterval(() => {
		current.value = (current.value + 1) % props.words.length
	}, props.interval)
})

onBeforeUnmount(() => {
	if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.rotator {
	display: inline-block;

	&__words {
		display: inline-grid;
		overflow: hidden;
		padding: 0 0.16em;
		border-radius: 0.16em;
		background: var(--brand-soft);
		color: var(--brand-strong);
		vertical-align: bottom;
	}

	// a reel: the old word rolls up and out as the next rolls in
	// from below, so the two never overlap
	&__word {
		grid-area: 1 / 1;
		justify-self: center;
		opacity: 0;
		transform: translateY(100%);
		transition:
			opacity 0.5s var(--ease),
			transform 0.5s var(--ease);

		&--previous {
			transform: translateY(-100%);
		}

		&--current {
			opacity: 1;
			transform: none;
		}
	}
}
</style>
