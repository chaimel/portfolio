<template>
	<li
		:class="['entry', { 'entry--active': props.active, 'entry--offline': is_offline }]"
		:style="accent_style"
		@pointerenter="emit('enter')"
	>
		<span class="entry__number" aria-hidden="true">{{ number }}</span>

		<div class="entry__main">
			<MHeading variant="3" class="entry__title">
				<!-- stretched over the whole row: anywhere on it opens the preview -->
				<button type="button" class="entry__open" @click="emit('preview')">
					{{ props.project.title }}<span class="sr-only">, preview the full page</span>
				</button>
			</MHeading>
			<div class="entry__meta">
				<span class="entry__category">{{ props.project.category }}</span>
				<ul class="entry__stack" :aria-label="`${props.project.title}: built with`">
					<li v-for="tool in tools" :key="tool">{{ tool }}</li>
				</ul>
			</div>
		</div>

		<!-- phones have no hover preview, so the row shows the site itself -->
		<img
			v-if="thumb"
			:src="thumb.src"
			:width="thumb.width"
			:height="thumb.height"
			alt=""
			loading="lazy"
			decoding="async"
			class="entry__thumb"
		>

		<span class="entry__where">
			<span class="entry__dot" aria-hidden="true" />
			{{ where }}
		</span>

		<a
			v-if="!is_offline"
			:href="props.project.live_url"
			target="_blank"
			rel="noopener"
			class="entry__live"
		>
			<MIcon name="light-arrow-up-right" size="md" />
			<span class="sr-only">{{ props.project.title }} live site (opens in a new tab)</span>
		</a>
		<span v-else class="entry__live entry__live--off" aria-hidden="true">
			<MIcon name="light-arrow-up-right" size="md" />
		</span>
	</li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '~/types/features/project'

// One project in the work index: number, name, what it is, what it's
// built with, and where. Hovering paints the row in the client's brand
// color (work/Index.vue floats the screenshot beside the pointer).
interface Props {
	project: Project
	// 0-based place in the index
	index: number
	active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
})

const emit = defineEmits<{
	(_e: 'enter'): void
	(_e: 'preview'): void
}>()

const is_offline = computed(() => props.project.status === 'offline')
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const thumb = computed(() => props.project.wall?.[0])
const tools = computed(() => props.project.stack.slice(0, 4))

// "Maintained at Glophics · Live", "Built at Proweaver · Live", "Offline"
const where = computed(() => {
	const made = props.project.built_at
		? `${props.project.scope ? 'Maintained' : 'Built'} at ${props.project.built_at}`
		: ''
	return [made, is_offline.value ? 'Offline' : 'Live'].filter(Boolean).join(' · ')
})

// the brand color is data, so it arrives as a custom property
const accent_style = computed(() => (props.project.accent ? { '--project-accent': props.project.accent } : undefined))
</script>

<style lang="scss" scoped>
// the hovered (or keyboard-focused) row, painted in the client's color
@mixin lit {
	--entry-muted: var(--on-dark-muted);

	color: var(--white);

	&::before {
		transform: scaleY(1);
	}

	.entry__title {
		transform: translateX(12px);
	}

	.entry__number {
		-webkit-text-stroke-color: color-mix(in srgb, var(--project-accent) 55%, var(--white));
	}

	.entry__stack li {
		border-color: var(--on-dark-border);
	}

	.entry__live {
		border-color: var(--white);
		background: var(--white);
		color: var(--ink);
		transform: rotate(45deg);
	}
}

.entry {
	--project-accent: var(--brand);
	--entry-muted: var(--text-secondary);

	position: relative;
	isolation: isolate;
	display: grid;
	grid-template-columns: 76px minmax(0, 1fr) minmax(0, 210px) 52px;
	align-items: center;
	gap: 24px;
	padding: 28px 28px;
	border-top: var(--rule);
	color: var(--text-primary);
	transition: color 0.35s var(--ease);

	&:last-child {
		border-bottom: var(--rule);
	}

	// the client's color, wiping up from the bottom of the row
	&::before {
		content: '';
		position: absolute;
		inset: -1px 0;
		z-index: -1;
		border-radius: var(--radius-xl);
		background:
			radial-gradient(55% 140% at 100% 0%, color-mix(in srgb, var(--project-accent) 60%, transparent), transparent 70%),
			color-mix(in srgb, var(--project-accent) 18%, var(--ink));
		transform: scaleY(0);
		transform-origin: 50% 100%;
		transition: transform 0.5s var(--ease);
	}

	@media (hover: hover) {
		&--active {
			@include lit;
		}
	}

	&:has(.entry__open:focus-visible) {
		@include lit;
	}

	&__number {
		font-family: var(--font-display);
		font-size: 44px;
		font-weight: 700;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1.5px var(--border-strong);
		transition: -webkit-text-stroke-color 0.35s var(--ease);
	}

	&__main {
		min-width: 0;
	}

	&__title {
		font-size: clamp(30px, 3.8vw, 54px);
		line-height: 1.02;
		letter-spacing: -0.02em;
		color: inherit;
		transition: transform 0.5s var(--ease);
	}

	&__open {
		color: inherit;
		text-align: left;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			z-index: 1;
		}

		&:focus-visible {
			outline: none;
		}
	}

	&__meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px 16px;
		padding-top: 12px;
	}

	&__category {
		font-family: var(--font-ui);
		font-size: 15px;
		color: var(--entry-muted);
		transition: color 0.35s var(--ease);
	}

	&__thumb {
		display: none;
	}

	&__stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;

		li {
			padding: 4px 10px;
			border: 1px solid var(--border);
			border-radius: var(--radius-full);
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 500;
			transition: border-color 0.35s var(--ease);
		}
	}

	&__where {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 500;
		line-height: 18px;
		color: var(--entry-muted);
		transition: color 0.35s var(--ease);
	}

	&__dot {
		flex: 0 0 auto;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--live);
	}

	&--offline &__dot {
		background: var(--text-muted);
	}

	&__live {
		position: relative;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border: 1px solid var(--border-strong);
		border-radius: 50%;
		color: inherit;
		transition:
			background-color 0.35s var(--ease),
			border-color 0.35s var(--ease),
			color 0.35s var(--ease),
			transform 0.45s var(--ease);

		&:focus-visible {
			outline-offset: 3px;
		}

		&--off {
			opacity: 0.35;
		}
	}
}

@media only screen and (max-width: 1100px) {
	.entry {
		grid-template-columns: 60px minmax(0, 1fr) 52px;

		&__where {
			display: none;
		}
	}
}

// stacked, with the site's screenshot in the row
@media only screen and (max-width: 760px) {
	.entry {
		grid-template-columns: minmax(0, 1fr) 46px;
		grid-template-areas:
			'main  live'
			'thumb thumb'
			'where where';
		gap: 14px 16px;
		padding: 26px 0;

		&__number {
			display: none;
		}

		&__main {
			grid-area: main;
		}

		&__live {
			grid-area: live;
			width: 46px;
			height: 46px;
		}

		&__thumb {
			grid-area: thumb;
			display: block;
			width: 100%;
			height: auto;
			aspect-ratio: 16 / 10;
			object-fit: cover;
			border: 1px solid var(--border);
			border-radius: var(--radius-md);
		}

		&__where {
			grid-area: where;
			display: inline-flex;
		}
	}
}
</style>
