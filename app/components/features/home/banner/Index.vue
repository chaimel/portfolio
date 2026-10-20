<template>
	<section id="top" class="banner" aria-labelledby="banner-title">
		<div class="banner__backdrop" aria-hidden="true" />

		<div class="wrapper">
			<div class="banner__con">
				<div class="banner__text">
					<div class="banner__status">
						<MBadge tone="success" dot>{{ hero.status }}</MBadge>
						<span class="banner__clock">
							<MIcon name="light-map-pin" size="xs" />
							{{ localTime.place }} · {{ time || '—' }}
						</span>
					</div>

					<MEyebrow class="banner__eyebrow">{{ hero.eyebrow }}</MEyebrow>

					<!-- the name is the headline; the last name is outlined like the work numbers -->
					<MHeading id="banner-title" variant="1" class="banner__name">
						<span class="banner__first">{{ first_name }}</span>
						<span class="banner__last">{{ last_name }}</span>
					</MHeading>

					<p class="banner__statement">
						{{ hero.line }} <Rotator :words="hero.words" /> {{ hero.tail }}
					</p>

					<MText size="large" color="--text-secondary" class="banner__lede">{{ hero.lede }}</MText>

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

				<Wall class="banner__wall" />

				<dl class="banner__stats">
					<div v-for="stat in stats" :key="stat.label" class="banner__stat">
						<dt>{{ stat.label }}</dt>
						<dd>{{ stat.value }}</dd>
					</div>
					<div v-if="current_role" class="banner__stat banner__stat--now">
						<dt>Now</dt>
						<dd>{{ current_role.title }} <span>at {{ current_role.org }}</span></dd>
					</div>
				</dl>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { hero, roles } from '~/data/features/home'
import { contact, localTime, siteName } from '~/data/features/site'
import Rotator from './Rotator.vue'
import Wall from './Wall.vue'

const { scrollToSection } = useSectionScroll()
const time = useLocalTime(localTime.timezone)

const [first_name, ...rest] = siteName.split(' ')
const last_name = rest.join(' ')

const current_role = roles.find(role => !role.end)

// roles are counted from the data, so a new one updates the stat
const first_year = roles.at(-1)?.start.split(' ').at(-1) ?? ''

const stats = [
	{ value: hero.years, label: 'Years building websites' },
	{ value: hero.sites_shipped, label: 'WordPress sites shipped' },
	{ value: String(roles.length), label: `Roles since ${first_year}` },
]
</script>

<style lang="scss" scoped>
// starts under the (transparent) header, so its light runs to the top edge
.banner {
	position: relative;
	overflow: hidden;
	isolation: isolate;
	margin-top: calc(var(--header-height) * -1);
	padding-top: var(--header-height);

	// soft brand light and a fading dot grid behind the name
	&__backdrop {
		position: absolute;
		inset: 0;
		z-index: -2;
		pointer-events: none;
		background:
			radial-gradient(44rem 30rem at 0% 0%, var(--brand-soft), transparent 70%),
			radial-gradient(40rem 30rem at 100% 100%, var(--sun-soft), transparent 70%);

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background-image: radial-gradient(var(--border-strong) 1px, transparent 1.4px);
			background-size: 26px 26px;
			opacity: 0.6;
			mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
		}
	}

	&__con {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: min(calc(100svh - var(--header-height)), 900px);
		padding: 56px 0 40px;
	}

	&__text {
		position: relative;
		z-index: 1;
		max-width: 700px;
	}

	&__status {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px 18px;
	}

	&__clock {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 500;
		color: var(--text-secondary);
		font-variant-numeric: tabular-nums;
	}

	&__eyebrow {
		padding-top: 36px;
	}

	// --- The name ---------------------------------------------
	&__name {
		padding-top: 14px;
		font-size: clamp(64px, 10.4vw, 156px);
		line-height: 0.88;
		letter-spacing: -0.035em;
	}

	&__first,
	&__last {
		display: block;
	}

	&__first {
		width: fit-content;
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	// the stroke is painted under a canvas-colored fill, so the variable
	// font's overlapping contours don't show through as extra lines
	&__last {
		color: var(--canvas);
		-webkit-text-stroke: 4px var(--ink);
		paint-order: stroke fill;
	}

	&__statement {
		padding-top: 28px;
		font-family: var(--font-display);
		font-size: clamp(24px, 2.4vw, 34px);
		font-weight: 600;
		line-height: 1.25;
		letter-spacing: -0.015em;
		color: var(--text-primary);
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

	// --- The wall bleeds off the right edge --------------------
	&__wall {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		width: 50vw;
	}

	// --- Stats, on a glass bar over the wall's fade -----------
	&__stats {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 0.8fr)) minmax(0, 1.4fr);
		margin-top: 64px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--header-glass);
		box-shadow: var(--shadow-card);
		backdrop-filter: saturate(1.4) blur(14px);
		-webkit-backdrop-filter: saturate(1.4) blur(14px);
	}

	&__stat {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 20px 24px;

		& + & {
			border-left: var(--rule);
		}

		dt {
			order: 2;
			font-family: var(--font-ui);
			font-size: 13px;
			line-height: 18px;
			color: var(--text-secondary);
		}

		dd {
			order: 1;
			font-family: var(--font-display);
			font-size: 36px;
			font-weight: 700;
			line-height: 1;
			letter-spacing: -0.02em;
			color: var(--text-primary);
		}

		// "Now" reads as a label over the role, not a big number
		&--now {
			justify-content: center;

			dt {
				order: 1;
				font-size: 12px;
				font-weight: 600;
				letter-spacing: 0.12em;
				text-transform: uppercase;
				color: var(--brand-strong);
			}

			dd {
				order: 2;
				font-size: 20px;
				font-weight: 600;
				line-height: 26px;
				letter-spacing: -0.01em;

				span {
					font-family: var(--font-ui);
					font-size: 15px;
					font-weight: 500;
					color: var(--text-secondary);
				}
			}
		}
	}
}

@media only screen and (max-width: 1024px) {
	.banner {
		&__con {
			min-height: 0;
			padding: 48px 0 40px;
		}

		&__text {
			max-width: none;
		}

		// below the text, as a band across the full width
		&__wall {
			position: relative;
			z-index: 0;
			width: auto;
			height: 360px;
			margin: 40px -28px 0;
		}

		&__stats {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			margin-top: -40px;
		}

		&__stat--now {
			grid-column: 1 / -1;
			border-top: var(--rule);
			border-left: 0 !important;
		}
	}
}

@media only screen and (max-width: 600px) {
	.banner {
		&__con {
			padding-top: 32px;
		}

		&__eyebrow {
			padding-top: 24px;
		}

		&__name {
			font-size: clamp(56px, 17.5vw, 80px);
		}

		&__last {
			-webkit-text-stroke-width: 3px;
		}

		&__actions .m-button {
			flex: 1 1 auto;
		}

		&__wall {
			height: 280px;
			margin: 32px -20px 0;
		}

		&__stat {
			padding: 16px;

			dd {
				font-size: 28px;
			}

			dt {
				font-size: 12px;
				line-height: 16px;
			}
		}

		&__stat--now dd {
			font-size: 18px;
			line-height: 24px;
		}
	}
}
</style>
