<template>
	<span :class="['m-badge', `m-badge--${props.tone}`, `m-badge--${props.size}`]">
		<span v-if="props.dot" class="m-badge__dot" aria-hidden="true" />
		<MIcon v-else-if="props.icon" :name="props.icon" size="xs" />
		<slot />
	</span>
</template>

<script setup lang="ts">
import type { MIconName, Tone } from '~/types/base/ui'
import MIcon from './MIcon.vue'

interface Props {
	tone?: Tone
	// pair the tone with an icon or a dot so status never rests on color alone
	icon?: MIconName
	// a live-status dot in place of the icon
	dot?: boolean
	size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
	tone: 'neutral',
	icon: undefined,
	dot: false,
	size: 'md',
})
</script>
