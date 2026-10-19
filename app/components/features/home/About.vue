<template>
	<section id="about" class="about" aria-labelledby="about-title">
		<div class="wrapper">
			<div class="about__con">
				<div class="about__top">
					<MSectionHead eyebrow="About me" :title="about.title" title-id="about-title" inverse class="about__head" />

					<div class="about__story">
						<MText
							v-for="(paragraph, index) in about.story"
							:key="paragraph"
							:size="index === 0 ? 'xlarge' : 'large'"
							:color="index === 0 ? '--white' : '--on-dark-muted'"
							class="about__paragraph"
						>
							{{ paragraph }}
						</MText>

						<dl class="about__facts">
							<div v-for="(fact, index) in aboutFacts" :key="fact.label" v-reveal="index * 70" class="about__fact">
								<span class="about__fact-icon" aria-hidden="true">
									<MIcon :name="fact.icon" size="md" />
								</span>
								<dt>{{ fact.label }}</dt>
								<dd>{{ fact.value }}</dd>
							</div>
						</dl>
					</div>
				</div>

				<div class="about__approach">
					<div class="about__approach-head">
						<MHeading variant="3" size="3" color="--white">{{ about.approach.title }}</MHeading>
						<MText color="--on-dark-muted">{{ about.approach.text }}</MText>
					</div>

					<ol class="about__points">
						<li v-for="(point, index) in approachPoints" :key="point.title" v-reveal="index * 90" class="about__point">
							<div class="about__point-top">
								<span class="about__icon" aria-hidden="true">
									<MIcon :name="point.icon" size="md" />
								</span>
								<span class="about__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
							</div>
							<MHeading variant="4" size="4" color="--white" class="about__point-title">{{ point.title }}</MHeading>
							<MText color="--on-dark-muted" class="about__point-text">{{ point.text }}</MText>
						</li>
					</ol>

					<div v-reveal class="about__ai">
						<span class="about__ai-icon" aria-hidden="true">
							<MIcon name="light-sparkles" size="md" />
						</span>
						<div>
							<MHeading variant="4" size="5" color="--white">{{ about.ai.title }}</MHeading>
							<MText color="--on-dark-muted" class="about__ai-text">{{ about.ai.text }}</MText>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import { about, aboutFacts, approachPoints } from '~/data/features/home'
</script>

<style lang="scss" scoped>
// An ink band like Featured: teal light from the top left, a little sun
// from the bottom right, and glass panels instead of white cards.
.about {
	position: relative;
	isolation: isolate;
	background:
		radial-gradient(48rem 32rem at 0% 0%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%),
		radial-gradient(36rem 26rem at 100% 100%, color-mix(in srgb, var(--sun) 10%, transparent), transparent 70%),
		var(--ink);
	color: var(--white);

	&__con {
		padding: 120px 0;
	}

	// --- Story ------------------------------------------------
	&__top {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		align-items: start;
		gap: 48px 80px;
	}

	&__head {
		position: sticky;
		top: calc(var(--header-height) + 40px);
	}

	&__paragraph + &__paragraph {
		padding-top: 18px;
	}

	&__facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		padding-top: 36px;
	}

	&__fact {
		display: grid;
		grid-template-columns: 44px minmax(0, 1fr);
		grid-template-rows: auto auto;
		align-items: center;
		column-gap: 14px;
		padding: 16px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-md);
		background: var(--on-dark-fill);

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--on-dark-subtle);
		}

		dd {
			font-family: var(--font-ui);
			font-size: 15px;
			font-weight: 500;
			line-height: 22px;
			color: var(--white);
		}
	}

	&__fact-icon {
		display: grid;
		grid-row: span 2;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--brand) 28%, transparent);
		color: color-mix(in srgb, var(--brand) 45%, var(--white));
	}

	// --- How I work -------------------------------------------
	&__approach {
		margin-top: 96px;
		padding-top: 56px;
		border-top: 1px solid var(--on-dark-rule);
	}

	&__approach-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px 32px;
	}

	&__points {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
		padding-top: 32px;
	}

	&__point {
		display: flex;
		flex-direction: column;
		padding: 28px;
		border: 1px solid var(--on-dark-rule);
		border-radius: var(--radius-lg);
		background: var(--on-dark-fill);
		transition:
			border-color 0.25s var(--ease),
			transform 0.3s var(--ease);

		&:hover {
			border-color: var(--on-dark-border);
			transform: translateY(-3px);
		}
	}

	&__point-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	// teal, coral, sun — one per step
	&__icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--brand) 28%, transparent);
		color: color-mix(in srgb, var(--brand) 45%, var(--white));
	}

	&__point:nth-child(2) &__icon {
		background: color-mix(in srgb, var(--accent) 24%, transparent);
		color: color-mix(in srgb, var(--accent) 70%, var(--white));
	}

	&__point:nth-child(3) &__icon {
		background: color-mix(in srgb, var(--sun) 20%, transparent);
		color: var(--sun);
	}

	&__number {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--on-dark-border);
	}

	&__point-title {
		padding-top: 24px;
	}

	&__point-text {
		padding-top: 6px;
	}

	// the one panel lit in the brand color
	&__ai {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		align-items: center;
		gap: 20px;
		margin-top: 20px;
		padding: 24px 28px;
		border: 1px solid color-mix(in srgb, var(--brand) 45%, transparent);
		border-radius: var(--radius-lg);
		background: linear-gradient(120deg, color-mix(in srgb, var(--brand) 30%, transparent), color-mix(in srgb, var(--brand) 6%, transparent));
	}

	&__ai-icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: var(--radius-md);
		background: var(--on-dark-hover);
		color: var(--sun);
	}

	&__ai-text {
		padding-top: 4px;
	}
}

@media only screen and (max-width: 1024px) {
	.about {
		&__con {
			padding: 88px 0;
		}

		&__top {
			grid-template-columns: minmax(0, 1fr);
		}

		&__head {
			position: static;
		}

		&__approach {
			margin-top: 72px;
			padding-top: 48px;
		}

		&__points {
			grid-template-columns: minmax(0, 1fr);
			gap: 16px;
		}
	}
}

@media only screen and (max-width: 600px) {
	.about {
		&__con {
			padding: 64px 0;
		}

		&__facts {
			grid-template-columns: minmax(0, 1fr);
		}

		&__point {
			padding: 24px;
		}

		&__ai {
			grid-template-columns: minmax(0, 1fr);
			gap: 16px;
			padding: 24px;
		}
	}
}
</style>
