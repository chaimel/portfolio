<template>
	<NuxtLink
		v-if="has_to"
		:to="resolved_to"
		:aria-disabled="props.disabled || undefined"
		:tabindex="props.disabled ? -1 : undefined"
		:class="button_class"
		@click="handleClick"
	>
		<span v-if="$slots['prefix']" class="m-button__prefix"><slot name="prefix" /></span>
		<slot />
		<span v-if="$slots['suffix']" class="m-button__suffix"><slot name="suffix" /></span>
	</NuxtLink>

	<a
		v-else-if="has_href"
		:href="props.href"
		:target="props.target || undefined"
		:rel="resolved_rel"
		:download="props.download || undefined"
		:aria-disabled="props.disabled || undefined"
		:tabindex="props.disabled ? -1 : undefined"
		:class="button_class"
		@click="handleClick"
	>
		<span v-if="$slots['prefix']" class="m-button__prefix"><slot name="prefix" /></span>
		<slot />
		<span v-if="$slots['suffix']" class="m-button__suffix"><slot name="suffix" /></span>
		<span v-if="props.target === '_blank'" class="sr-only"> (opens in a new tab)</span>
	</a>

	<button
		v-else
		:type="props.type"
		:disabled="props.disabled"
		:class="button_class"
		@click="handleClick"
	>
		<span v-if="$slots['prefix']" class="m-button__prefix"><slot name="prefix" /></span>
		<slot />
		<span v-if="$slots['suffix']" class="m-button__suffix"><slot name="suffix" /></span>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

// primary: teal action · secondary: ink · outline: quiet rule
// neutral: white bordered · ghost: toolbar · text: inline link
// inverse / inverse-outline: on ink bands
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'neutral' | 'ghost' | 'text' | 'inverse' | 'inverse-outline'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'
type ButtonTarget = '_self' | '_blank' | '_parent' | '_top'

interface Props {
	type?: ButtonType
	disabled?: boolean
	size?: ButtonSize
	variant?: ButtonVariant
	// stretch to the container width
	block?: boolean
	to?: RouteLocationRaw
	href?: string
	target?: ButtonTarget
	rel?: string
	// a file link: true, or the name to save it as
	download?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	type: 'button',
	variant: 'primary',
	disabled: false,
	block: false,
	to: undefined,
	href: '',
	target: undefined,
	rel: '',
	download: false,
})

const emit = defineEmits<{
	(_e: 'click', _event: MouseEvent): void
}>()

const button_class = computed(() => [
	'm-button',
	`m-button--${props.size}`,
	`m-button--${props.variant}`,
	{
		'm-button--block': props.block,
	},
])

const has_to = computed(() => Boolean(props.to))
const has_href = computed(() => !has_to.value && Boolean(props.href))
const resolved_to = computed<RouteLocationRaw>(() => props.to || '/')
const resolved_rel = computed(() => {
	if (props.target !== '_blank') return props.rel || undefined

	const rel_parts = new Set((props.rel || '').split(/\s+/).filter(Boolean))
	rel_parts.add('noopener')
	rel_parts.add('noreferrer')
	return Array.from(rel_parts).join(' ')
})

function handleClick(event: MouseEvent) {
	if (props.disabled) {
		event.preventDefault()
		event.stopPropagation()
		return
	}

	emit('click', event)
}
</script>
