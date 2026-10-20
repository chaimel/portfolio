<template>
	<NuxtLink
		to="/"
		:class="['logo', { 'logo--inverse': props.inverse }]"
		:aria-label="`${siteName}, home`"
		@click="toTop"
	>
		<span class="logo__mark" aria-hidden="true">CE</span>
		<span class="logo__word" aria-hidden="true">Chaimel <strong>Enjambre</strong></span>
	</NuxtLink>
</template>

<script setup lang="ts">
import { siteName } from '~/data/features/site'

interface Props {
	// white wordmark for ink backgrounds
	inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	inverse: false,
})

const route = useRoute()

// Already home: a link to "/" wouldn't move, so scroll back up instead.
function toTop(event: MouseEvent) {
	if (route.path !== '/') return

	event.preventDefault()
	window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.logo {
	display: inline-flex;
	align-items: center;
	gap: 12px;
	flex: 0 0 auto;
	border-radius: var(--radius-sm);
	color: var(--text-primary);

	&__mark {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 11px;
		background: linear-gradient(135deg, var(--brand) 0%, var(--brand-strong) 100%);
		box-shadow: var(--shadow-mark);
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--white);
	}

	&__word {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 500;
		letter-spacing: -0.01em;
		white-space: nowrap;

		strong {
			font-weight: 700;
		}
	}

	&--inverse {
		color: var(--white);

		&:focus-visible {
			outline-color: var(--sun);
		}
	}
}

@media only screen and (max-width: 380px) {
	.logo__word {
		font-size: 16px;
	}
}
</style>
