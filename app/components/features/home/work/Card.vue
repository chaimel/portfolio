<template>
	<article
		:class="['card', { 'card--offline': is_offline }]"
		:style="card_style"
		:aria-labelledby="`work-card-${props.project.slug}`"
	>
		<div class="card__inner">
			<div class="card__info">
				<div class="card__count" aria-hidden="true">
					<span class="card__number">{{ number }}</span>
					<span class="card__total">/ {{ total }}</span>
				</div>

				<div class="card__meta-row">
					<MBadge v-if="is_offline" tone="inverse" size="sm">Site offline</MBadge>
					<MBadge v-else tone="inverse" size="sm" dot>Live</MBadge>
					<MText variant="span" size="small" class="card__meta">
						{{ props.project.category }}<template v-if="props.project.built_at"> · {{ made }} at {{ props.project.built_at }}</template>
					</MText>
				</div>
				<MHeading :id="`work-card-${props.project.slug}`" variant="3" class="card__title">
					{{ props.project.title }}
				</MHeading>
				<MText v-if="props.project.summary" size="large" color="--on-dark-muted" class="card__summary">
					{{ props.project.summary }}
				</MText>

				<dl class="card__tech">
					<div v-if="props.project.scope" class="card__tech-row">
						<dt>My part</dt>
						<dd class="card__parts">{{ props.project.scope.parts.join(' · ') }}</dd>
					</div>
					<div class="card__tech-row">
						<dt>Languages</dt>
						<dd>
							<ul class="card__tags">
								<li v-for="language in props.project.languages" :key="language">
									<MTag variant="inverse" size="sm">{{ language }}</MTag>
								</li>
							</ul>
						</dd>
					</div>
					<div class="card__tech-row">
						<dt>Built with</dt>
						<dd>
							<ul class="card__tags">
								<li v-for="tool in props.project.stack" :key="tool">
									<MTag variant="inverse" size="sm">{{ tool }}</MTag>
								</li>
							</ul>
						</dd>
					</div>
				</dl>

				<MText v-if="props.project.scope?.note" size="small" color="--on-dark-subtle" class="card__note">
					<MIcon name="light-lock" size="xs" />
					{{ props.project.scope.note }}
				</MText>

				<div class="card__actions">
					<MButton variant="inverse" @click="emit('preview')">
						<template #prefix>
							<MIcon name="light-expand" size="sm" />
						</template>
						Preview the full page
						<span class="sr-only"> of {{ props.project.title }}</span>
					</MButton>
					<MButton v-if="!is_offline" :href="props.project.live_url" target="_blank" variant="inverse-outline">
						Live site
						<template #suffix>
							<MIcon name="light-arrow-up-right" size="sm" />
						</template>
					</MButton>
				</div>
			</div>

			<!-- the site runs off the card's right and bottom edges; hover to scroll it -->
			<div class="card__visual">
				<MBrowserShot :image="props.project.image" :url="host" scroll decorative tone="dark" />
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import type { Project } from '~/types/features/project'
import { hostLabel } from '~/utils/format'

// One project in the work stack: a dark card tinted with the client's
// brand color. On wide screens the cards stick under the header one
// after another, each a little lower, so they pile up like a deck.
interface Props {
	project: Project
	// 0-based place in the stack, out of total
	index: number
	total: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(_e: 'preview'): void
}>()

const is_offline = computed(() => props.project.status === 'offline')
// a project I only worked part of was maintained there, not built
const made = computed(() => props.project.scope ? 'Maintained' : 'Built')
const host = computed(() => hostLabel(props.project.live_url))
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const total = computed(() => String(props.total).padStart(2, '0'))

// the brand color is data, so it arrives as a custom property
const card_style = computed(() => ({
	'--stack-index': String(props.index),
	...(props.project.accent ? { '--project-accent': props.project.accent } : {}),
}))
</script>

<style lang="scss" scoped>
.card {
	--project-accent: var(--brand);
	--shot-ratio: 1.45;
	// 0 → 1 as the next card slides over this one (work/Index.vue sets it)
	--covered: 0;

	position: relative;
	overflow: hidden;
	border: 1px solid var(--on-dark-rule);
	border-radius: 32px;
	background:
		radial-gradient(60% 85% at 100% 0%, color-mix(in srgb, var(--project-accent) 60%, transparent), transparent 70%),
		radial-gradient(45% 60% at 0% 100%, color-mix(in srgb, var(--project-accent) 32%, transparent), transparent 70%),
		color-mix(in srgb, var(--project-accent) 16%, var(--ink));
	box-shadow: var(--shadow-stack);
	color: var(--white);

	// sinks back into the deck as it gets covered: a little smaller, darker
	&::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 4;
		border-radius: inherit;
		background: var(--ink);
		opacity: calc(var(--covered) * 0.5);
		pointer-events: none;
	}

	&__inner {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		// the row is the card's height: the tall screenshot runs off the bottom
		// instead of stretching the row and pushing the buttons out of view
		grid-template-rows: minmax(0, 1fr);
		gap: 56px;
		height: 100%;
	}

	// --- Text -------------------------------------------------
	&__info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-height: 0;
		padding: 36px 0 36px 56px;
	}


	&__count {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	// a big outlined numeral in the brand color
	&__number {
		font-family: var(--font-display);
		font-size: 80px;
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.03em;
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in srgb, var(--project-accent) 55%, var(--white));
	}

	&__total {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--on-dark-subtle);
	}

	&__meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 12px;
		padding-top: 20px;
	}

	&__meta {
		font-family: var(--font-ui);
		color: var(--on-dark-subtle);
	}

	&__title {
		padding-top: 10px;
		font-size: clamp(28px, 2.6vw, 40px);
		line-height: 1.08;
		letter-spacing: -0.015em;
		color: var(--white);
	}

	&__summary {
		max-width: 460px;
		padding-top: 14px;
	}

	&__tech {
		display: grid;
		gap: 10px;
		padding-top: 20px;
	}

	&__tech-row {
		display: grid;
		grid-template-columns: 84px minmax(0, 1fr);
		align-items: start;
		gap: 12px;

		dt {
			padding-top: 5px;
			font-family: var(--font-ui);
			font-size: 11px;
			font-weight: 600;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--on-dark-subtle);
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	&__parts {
		padding-top: 2px;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		color: var(--white);
	}

	&__note {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		max-width: 460px;
		padding-top: 16px;

		.m-icon {
			flex-shrink: 0;
			margin-top: 3px;
		}
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: auto;
		padding-top: 24px;
	}

	// --- Screenshot -------------------------------------------
	&__visual {
		position: relative;
		min-width: 0;
		min-height: 0;
		padding-top: 48px;

		// wider than its column, so it runs off the card's edge
		> :deep(.m-browser-shot) {
			width: 118%;
			transform: rotate(-2deg) translateY(10px);
			transform-origin: top left;
			transition: transform 0.6s var(--ease);
		}

		&:hover > :deep(.m-browser-shot) {
			transform: rotate(0deg) translateY(0);
		}
	}

	&--offline &__visual {
		filter: grayscale(0.4);
	}
}

// --- The stack ------------------------------------------------
// Only where there's room: each card sticks a little lower than the
// last, so the earlier ones peek out above it.
@media only screen and (min-width: 960px) and (min-height: 640px) {
	.card {
		position: sticky;
		top: calc(var(--header-height) + 20px + var(--stack-index) * 16px);
		height: min(660px, calc(100vh - var(--header-height) - 56px));
		transform: scale(calc(1 - var(--covered) * 0.05));
		transform-origin: 50% 0;
	}
}

@media only screen and (max-width: 959px) {
	.card {
		border-radius: var(--radius-xl);
		background:
			radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--project-accent) 50%, transparent), transparent 55%),
			color-mix(in srgb, var(--project-accent) 16%, var(--ink));

		&__inner {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}

		&__info {
			padding: 28px 24px 0;
		}

		&__number {
			font-size: 56px;
		}

		&__visual {
			height: 300px;
			overflow: hidden;
			padding: 32px 0 0 24px;

			> :deep(.m-browser-shot) {
				width: 110%;
				transform: none;
			}
		}
	}
}
</style>
