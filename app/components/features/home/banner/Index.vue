<template>
	<section id="top" class="banner" aria-labelledby="banner-title">
		<div class="banner__backdrop" aria-hidden="true" />

		<div class="wrapper">
			<div class="banner__con">
				<div class="banner__intro">
					<div class="banner__text">
						<MEyebrow>{{ hero.eyebrow }}</MEyebrow>

						<MHeading id="banner-title" variant="1" class="banner__title">
							<span class="banner__line">Hi, I’m <span class="banner__name">{{ hero.name }}</span>.</span>
							<span class="banner__line">{{ hero.line }}</span>
							<span class="banner__line"><Rotator :words="hero.words" /> {{ hero.tail }}</span>
						</MHeading>

						<MText size="xlarge" color="--text-secondary" class="banner__lede">{{ hero.lede }}</MText>

						<div class="banner__actions">
							<MButton :to="{ path: '/', hash: '#work' }" size="lg" @click="scrollToSection($event, 'work')">
								See my work
								<template #suffix>
									<MIcon name="light-arrow-right" size="sm" />
								</template>
							</MButton>
							<MButton :href="`mailto:${contact.email}`" variant="neutral" size="lg">
								<template #prefix>
									<MIcon name="light-mail" size="sm" />
								</template>
								Email me
							</MButton>
						</div>
					</div>

					<div class="banner__aside">
						<MBadge tone="success" dot>{{ hero.status }}</MBadge>

						<dl class="banner__stats">
							<div v-for="stat in stats" :key="stat.label" class="banner__stat">
								<dt>{{ stat.label }}</dt>
								<dd>{{ stat.value }}</dd>
							</div>
						</dl>
					</div>
				</div>

				<Showcase />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { hero, roles } from '~/data/features/home'
import { contact } from '~/data/features/site'
import Rotator from './Rotator.vue'
import Showcase from './Showcase.vue'

const { scrollToSection } = useSectionScroll()

// roles are counted from the data, so a new one updates the stat
const first_year = roles.at(-1)?.start.split(' ').at(-1) ?? ''

const stats = [
	{ value: hero.years, label: 'Years building websites' },
	{ value: hero.sites_shipped, label: 'WordPress sites shipped' },
	{ value: String(roles.length), label: `Roles since ${first_year}` },
]
</script>

<style lang="scss" scoped>
.banner {
	// how far the ink band runs below the screens
	--showcase-tail: 96px;

	position: relative;
	overflow: hidden;
	isolation: isolate;

	// soft brand light and a fading dot grid behind the headline
	&__backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(44rem 30rem at 6% 0%, var(--brand-soft), transparent 70%),
			radial-gradient(34rem 26rem at 96% 8%, var(--sun-soft), transparent 70%);

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background-image: radial-gradient(var(--border-strong) 1px, transparent 1.4px);
			background-size: 26px 26px;
			opacity: 0.6;
			mask-image: linear-gradient(to bottom, black 0%, transparent 55%);
		}
	}

	&__con {
		padding: 72px 0 var(--showcase-tail);
	}

	&__intro {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
		align-items: end;
		gap: 48px 72px;
		padding-bottom: 72px;
	}

	// --- Headline ---------------------------------------------
	&__title {
		padding-top: 22px;
		font-size: clamp(42px, 5.4vw, 76px);
		line-height: 1.04;
		letter-spacing: -0.02em;
	}

	&__line {
		display: block;
	}

	&__name {
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	&__lede {
		max-width: 640px;
		padding-top: 24px;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 32px;
	}

	// --- At a glance ------------------------------------------
	&__aside {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
		padding-bottom: 4px;
	}

	&__stats {
		width: 100%;
		border-top: var(--rule);
	}

	&__stat {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 0;
		border-bottom: var(--rule);

		dt {
			order: 2;
			font-family: var(--font-ui);
			font-size: 14px;
			line-height: 20px;
			color: var(--text-secondary);
			text-align: right;
		}

		dd {
			order: 1;
			font-family: var(--font-display);
			font-size: 40px;
			font-weight: 700;
			line-height: 1;
			letter-spacing: -0.02em;
			color: var(--text-primary);
		}
	}
}

@media only screen and (max-width: 1024px) {
	.banner {
		--showcase-tail: 72px;

		&__con {
			padding-top: 56px;
		}

		&__intro {
			grid-template-columns: minmax(0, 1fr);
			gap: 40px;
			padding-bottom: 56px;
		}

		&__stats {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 16px;
			border-top: 0;
		}

		&__stat {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
			padding: 16px 0 0;
			border-top: var(--rule);
			border-bottom: 0;

			dt {
				text-align: left;
			}
		}
	}
}

@media only screen and (max-width: 600px) {
	.banner {
		--showcase-tail: 56px;

		&__con {
			padding-top: 40px;
		}

		&__title {
			font-size: clamp(34px, 9.4vw, 42px);
			letter-spacing: -0.02em;
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}

		&__stat dd {
			font-size: 30px;
		}

		&__stat dt {
			font-size: 13px;
			line-height: 18px;
		}
	}
}
</style>
