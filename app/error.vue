<template>
	<div class="error-page">
		<Header />

		<main id="main-content" class="error-page__main" tabindex="-1">
			<div class="wrapper">
				<div class="error-page__con">
					<span class="error-page__code">{{ status_code }}</span>

					<MHeading variant="1" size="2" class="error-page__title">
						{{ is_missing ? 'That page isn’t here' : 'Something went wrong' }}
					</MHeading>

					<MText size="large" color="--text-secondary" class="error-page__lede">
						{{ message }}
					</MText>

					<div class="error-page__actions">
						<MButton size="lg" @click="goTo('/')">
							Back to the portfolio
							<template #suffix>
								<MIcon name="light-arrow-right" size="sm" />
							</template>
						</MButton>
						<MButton size="lg" variant="neutral" @click="goTo('/#work')">See my work</MButton>
					</div>
				</div>
			</div>
		</main>

		<Footer />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'
import Footer from '~/components/layout/Footer.vue'
import Header from '~/components/layout/Header.vue'
import { siteName } from '~/data/features/site'

interface Props {
	error?: NuxtError
}

const props = defineProps<Props>()

const status_code = computed(() => props.error?.status ?? 404)
const is_missing = computed(() => status_code.value === 404)

// A page's own copy only when it threw notFound(); Nuxt's "no route"
// text is technical.
const message = computed(() => {
	const data = props.error?.data as { friendly?: boolean } | undefined
	if (is_missing.value && data?.friendly && props.error?.message) return props.error.message
	return is_missing.value
		? 'The page may have moved, or the link has a typo. The work and contact details are all on the home page.'
		: 'An unexpected error occurred. Refresh to try again, or head back to the home page.'
})

// error.vue replaces app.vue, so its title template doesn't apply here.
useHead({
	title: computed(() => `${is_missing.value ? 'Page not found' : 'Something went wrong'} | ${siteName}`),
})

function goTo(path: string) {
	clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	&__main {
		flex: 1 0 auto;

		&:focus {
			outline: none;
		}
	}

	&__con {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-width: 720px;
		padding: 120px 0 136px;
	}

	&__code {
		font-family: var(--font-display);
		font-size: 96px;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.04em;
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	&__title {
		padding-top: 20px;
	}

	&__lede {
		max-width: 560px;
		padding-top: 16px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 32px;
	}
}

@media only screen and (max-width: 600px) {
	.error-page {
		&__con {
			padding: 72px 0 88px;
		}

		&__code {
			font-size: 72px;
		}
	}
}
</style>
