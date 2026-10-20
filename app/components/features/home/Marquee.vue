<template>
	<div class="marquee" role="region" aria-label="Tools I work with">
		<div class="marquee__band">
			<!-- two copies side by side make the loop seamless; screen readers get one -->
			<ul v-for="copy in 2" :key="copy" class="marquee__track" :aria-hidden="copy === 2 ? 'true' : undefined">
				<li v-for="item in items" :key="`${copy}-${item}`" class="marquee__item">
					{{ item }}
					<MIcon name="light-sparkles" size="md" class="marquee__mark" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { hero, toolGroups } from '~/data/features/home'

// A slow, tilted strip of the tools from the Skills section, plus the
// sites-shipped total, sliding by between the projects and About.
const items = [
	`${hero.sites_shipped} WordPress sites`,
	...toolGroups.flatMap(group => group.tools).filter(tool => !['Code review', 'Documentation', 'Responsive design', 'Theme development'].includes(tool)),
]
</script>

<style lang="scss" scoped>
.marquee {
	overflow: hidden;
	padding: 28px 0;
	background: var(--canvas);

	// slightly tilted, wider than the screen so the tilt never shows an edge
	&__band {
		display: flex;
		width: max-content;
		margin-left: -2%;
		padding: 18px 0;
		background: linear-gradient(90deg, var(--brand-strong), var(--brand) 50%, var(--brand-strong));
		box-shadow: var(--shadow-pop);
		transform: rotate(-1.5deg);

		&:hover .marquee__track {
			animation-play-state: paused;
		}
	}

	&__track {
		display: flex;
		flex: 0 0 auto;
		animation: marquee-slide 48s linear infinite;
	}

	&__item {
		display: inline-flex;
		align-items: center;
		gap: 28px;
		padding-right: 28px;
		font-family: var(--font-display);
		font-size: 26px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--white);
		white-space: nowrap;
	}

	&__mark {
		color: var(--sun);
	}
}

@keyframes marquee-slide {
	to {
		transform: translateX(-100%);
	}
}

@media only screen and (max-width: 600px) {
	.marquee {
		padding: 20px 0;

		&__band {
			padding: 14px 0;
		}

		&__item {
			gap: 20px;
			padding-right: 20px;
			font-size: 20px;
		}
	}
}

// the global reduced-motion rule would make it jump; hold it still instead
@media (prefers-reduced-motion: reduce) {
	.marquee__track {
		animation: none;
	}
}
</style>
