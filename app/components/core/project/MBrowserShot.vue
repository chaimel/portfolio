<template>
	<figure
		:class="['m-browser-shot', `m-browser-shot--${props.tone}`, { 'm-browser-shot--scroll': props.scroll }]"
		:style="shot_style"
	>
		<div class="m-browser-shot__frame">
			<div class="m-browser-shot__bar" aria-hidden="true">
				<span class="m-browser-shot__dots"><i /><i /><i /></span>
				<span v-if="props.url" class="m-browser-shot__url">
					<MIcon name="light-lock" size="xs" />
					<span class="m-browser-shot__host">{{ props.url }}</span>
				</span>
			</div>

			<div class="m-browser-shot__screen">
				<img
					class="m-browser-shot__img"
					:src="props.image.src"
					:alt="props.decorative ? '' : props.image.alt"
					:width="props.image.width"
					:height="props.image.height"
					:loading="props.eager ? 'eager' : 'lazy'"
					:fetchpriority="props.eager ? 'high' : undefined"
					decoding="async"
				>
			</div>
		</div>

		<figcaption v-if="$slots['default']" class="m-browser-shot__caption">
			<slot />
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectImage } from '~/types/features/project'

// A screenshot in a browser window. With `scroll`, a full-page capture
// shows its top and scrolls to the bottom while hovered. A parent can
// drive that too by setting --shot-scroll: 1 (a card on hover, say).
interface Props {
	image: ProjectImage
	// the address shown in the bar, e.g. "duelobattleground.com"
	url?: string
	scroll?: boolean
	// screen width ÷ height while scrolling; leave it out to let a parent
	// set --shot-ratio in CSS (cards change it per size and breakpoint)
	ratio?: number
	// above-the-fold shots load first
	eager?: boolean
	// when nearby text already names the page
	decorative?: boolean
	// dark chrome for ink bands
	tone?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
	url: undefined,
	scroll: false,
	ratio: undefined,
	eager: false,
	decorative: false,
	tone: 'light',
})

// Longer pages scroll for longer, so every page moves at the same speed.
const shot_style = computed(() => {
	if (!props.scroll) return undefined

	const screens = (props.image.height / props.image.width) * (props.ratio ?? 1.6)
	const seconds = Math.max(screens - 1, 0) * 1.1

	return {
		...(props.ratio ? { '--shot-ratio': String(props.ratio) } : {}),
		'--shot-extra': `${seconds.toFixed(2)}s`,
	}
})
</script>

<style lang="scss" scoped>
.m-browser-shot {
	margin: 0;

	&__frame {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--white);
		box-shadow: var(--shadow-card);
	}

	// --- Window chrome ----------------------------------------
	&__bar {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 34px;
		padding: 0 14px;
		border-bottom: 1px solid var(--border);
		background: var(--canvas);
	}

	&__dots {
		display: inline-flex;
		flex: 0 0 auto;
		gap: 6px;

		i {
			width: 9px;
			height: 9px;
			border-radius: 50%;
			background: var(--border-strong);
		}
	}

	&__url {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-width: 0;
		max-width: 72%;
		height: 22px;
		margin: 0 auto;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: var(--white);
		font-family: var(--font-ui);
		font-size: 11px;
		line-height: 1;
		color: var(--text-muted);

		.m-icon {
			color: var(--success);
		}
	}

	&__host {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	// --- Screen -----------------------------------------------
	&__screen {
		position: relative;
		overflow: hidden;
		background: var(--surface-muted);
	}

	&__img {
		display: block;
		width: 100%;
		height: auto;
	}

	&__caption {
		padding-top: 14px;
		font-family: var(--font-ui);
		font-size: 14px;
		line-height: 22px;
		color: var(--text-muted);
	}

	// --- Scroll on hover --------------------------------------
	// The screen keeps a fixed ratio and the page slides up inside it:
	// 100% is the page's height, 100cqw / ratio the screen's.
	&--scroll {
		&:hover {
			--shot-scroll: 1;
		}

		.m-browser-shot__screen {
			aspect-ratio: var(--shot-ratio, 1.6);
			container-type: inline-size;
		}

		.m-browser-shot__img {
			position: absolute;
			top: 0;
			left: 0;
			transform: translate3d(0, calc(var(--shot-scroll, 0) * (-100% + 100cqw / var(--shot-ratio, 1.6))), 0);
			transition: transform calc(0.8s + var(--shot-scroll, 0) * var(--shot-extra)) cubic-bezier(0.45, 0, 0.55, 1);
			will-change: transform;
		}
	}

	// --- On ink bands -----------------------------------------
	&--dark {
		.m-browser-shot__frame {
			border-color: var(--on-dark-rule);
			background: var(--ink-soft);
			box-shadow: var(--shadow-float);
		}

		.m-browser-shot__bar {
			border-bottom-color: var(--on-dark-rule);
			background: var(--ink-raised);
		}

		.m-browser-shot__dots i {
			background: var(--on-dark-border);
		}

		.m-browser-shot__url {
			border-color: var(--on-dark-rule);
			background: var(--on-dark-fill);
			color: var(--on-dark-subtle);

			.m-icon {
				color: var(--live);
			}
		}

		.m-browser-shot__caption {
			color: var(--on-dark-subtle);
		}
	}
}

@media (prefers-reduced-motion: reduce) {
	.m-browser-shot--scroll .m-browser-shot__img {
		transform: none;
	}
}
</style>
