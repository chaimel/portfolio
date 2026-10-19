<template>
	<component :is="props.tag" :class="['m-eyebrow', `m-eyebrow--${props.tone}`]">
		<span class="m-eyebrow__mark" aria-hidden="true" />
		<slot />
	</component>
</template>

<script setup lang="ts">
// The small uppercase label above a heading.
interface Props {
	tag?: 'p' | 'span' | 'div'
	// brand on light bands, sun on ink bands
	tone?: 'brand' | 'accent' | 'sun'
}

const props = withDefaults(defineProps<Props>(), {
	tag: 'p',
	tone: 'brand',
})
</script>
