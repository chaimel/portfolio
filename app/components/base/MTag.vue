<template>
	<span :class="['m-tag', `m-tag--${props.variant}`, `m-tag--${props.size}`]">
		<MIcon v-if="props.icon" :name="props.icon" size="xs" />
		<slot />
	</span>
</template>

<script setup lang="ts">
import type { MIconName } from '~/types/base/ui'
import MIcon from './MIcon.vue'

interface Props {
	icon?: MIconName
	// inverse sits on ink bands
	variant?: 'default' | 'soft' | 'inverse'
	size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
	icon: undefined,
	variant: 'default',
	size: 'md',
})
</script>
