<template>
	<section id="about" class="about" aria-labelledby="about-title">
		<div class="about__backdrop" aria-hidden="true" />

		<div class="wrapper">
			<!-- one bento grid: story, numbers, now, place, stack, habits, history -->
			<div class="about__con">
				<div class="tile tile--intro">
					<MEyebrow>About me</MEyebrow>
					<MHeading id="about-title" variant="2" size="3" class="tile__heading">{{ about.title }}</MHeading>
					<MText
						v-for="paragraph in about.story.slice(0, 2)"
						:key="paragraph"
						color="--text-secondary"
						class="tile__paragraph"
					>
						{{ paragraph }}
					</MText>
					<p class="tile__goal">
						<MIcon name="light-flag" size="sm" />
						<span><strong>Goal:</strong> {{ about.goal }}</span>
					</p>
				</div>

				<div class="tile tile--sites">
					<span class="tile__rings" aria-hidden="true" />
					<span class="tile__big">{{ hero.sites_shipped }}</span>
					<span class="tile__label">WordPress sites shipped</span>
				</div>

				<div class="tile tile--now">
					<span class="tile__kicker">
						<span class="tile__pulse" aria-hidden="true" />
						Now
					</span>
					<MHeading variant="3" size="5" class="tile__role">{{ current_role?.title }}</MHeading>
					<MText size="small" color="--text-secondary">at {{ current_role?.org }}</MText>
					<ul class="tile__chips" aria-label="Current stack">
						<li v-for="tag in current_role?.tags" :key="tag">{{ tag }}</li>
					</ul>
				</div>

				<div class="tile tile--place">
					<span class="tile__dots" aria-hidden="true" />
					<span class="tile__kicker tile__kicker--light">
						<MIcon name="light-map-pin" size="sm" />
						{{ contact.location }}
					</span>
					<span class="tile__clock">
						<span class="tile__time">{{ time || '—' }}</span>
						<span class="tile__zone">in {{ localTime.place }}</span>
					</span>
					<MBadge tone="inverse" size="sm" dot>{{ hero.status }}</MBadge>
				</div>

				<div id="skills" class="tile tile--stack">
					<div class="tile__stack-head">
						<MHeading variant="3" size="4">Stack &amp; skills</MHeading>
						<MText size="small" color="--text-muted">{{ toolkit.title }}</MText>
					</div>
					<div class="tile__groups">
						<div v-for="group in toolGroups" :key="group.title" class="tile__group">
							<span class="tile__group-title">
								<MIcon :name="group.icon" size="sm" />
								{{ group.title }}
							</span>
							<ul class="tile__chips" :aria-label="`${group.title} tools`">
								<li v-for="tool in group.tools" :key="tool">{{ tool }}</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="tile tile--work">
					<MHeading variant="3" size="4">{{ about.approach.title }}</MHeading>
					<ol class="tile__steps">
						<li v-for="(point, index) in approachPoints" :key="point.title">
							<span class="tile__step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
							<div>
								<span class="tile__step-title">{{ point.title }}</span>
								<MText size="small" color="--text-secondary">{{ point.text }}</MText>
							</div>
						</li>
					</ol>
				</div>

				<div class="tile tile--ai">
					<span class="tile__icon" aria-hidden="true"><MIcon name="light-sparkles" size="md" /></span>
					<span class="tile__fact-label">How I use AI</span>
					<span class="tile__fact-value">{{ about.ai.title }}</span>
					<MText size="small" color="--text-secondary">{{ about.ai.text }}</MText>
				</div>

				<div class="tile tile--fact">
					<span class="tile__icon" aria-hidden="true"><MIcon name="light-graduation-cap" size="md" /></span>
					<span class="tile__fact-label">Studied</span>
					<span class="tile__fact-value">{{ degree?.title }}</span>
					<MText size="small" color="--text-muted">{{ degree?.place }} · {{ degree?.years }}</MText>
				</div>

				<div class="tile tile--fact tile--start">
					<span class="tile__icon" aria-hidden="true"><MIcon name="light-flag" size="md" /></span>
					<span class="tile__fact-label">Started · {{ first_role?.start }}</span>
					<span class="tile__fact-value">{{ first_role?.title }}</span>
					<MText size="small" color="--text-muted">{{ first_role?.org }}</MText>
				</div>

				<div class="tile tile--years">
					<span class="tile__big">{{ hero.years }}</span>
					<span class="tile__label">Years building for the web</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { about, approachPoints, credentials, hero, roles, toolGroups, toolkit } from '~/data/features/home'
import { contact, localTime } from '~/data/features/site'

const current_role = roles.find(role => !role.end)
const first_role = roles.at(-1)
const degree = credentials[0]

const time = useLocalTime(localTime.timezone)
</script>

<style lang="scss" scoped>
.about {
	position: relative;
	overflow: hidden;
	isolation: isolate;
	background: var(--canvas);

	// soft brand light and a fading dot grid, like the hero
	&__backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(46rem 32rem at 0% 0%, var(--brand-soft), transparent 70%),
			radial-gradient(38rem 28rem at 100% 100%, var(--sun-soft), transparent 70%);

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background-image: radial-gradient(var(--border-strong) 1px, transparent 1.4px);
			background-size: 26px 26px;
			opacity: 0.5;
			mask-image: linear-gradient(to bottom, black 0%, transparent 40%);
		}
	}

	// --- The bento --------------------------------------------
	&__con {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-areas:
			'intro intro sites now'
			'intro intro place place'
			'stack stack stack stack'
			'work  work  work  years'
			'edu   start ai    ai';
		gap: 16px;
		padding: 120px 0;
	}
}

.tile {
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: 28px;
	border: 1px solid var(--border);
	border-radius: var(--radius-xl);
	background: var(--white);
	box-shadow: var(--shadow-card);
	transition:
		box-shadow 0.3s var(--ease),
		transform 0.3s var(--ease);

	&:hover {
		box-shadow: var(--shadow-pop);
		transform: translateY(-3px);
	}

	// --- Story ------------------------------------------------
	&--intro {
		grid-area: intro;
		padding: 36px;
		background:
			radial-gradient(30rem 18rem at 100% 0%, var(--brand-tint), transparent 70%),
			var(--white);
	}

	&__heading {
		padding: 14px 0 6px;
	}

	&__paragraph {
		padding-top: 12px;
	}

	&__goal {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		margin-top: auto;
		padding: 16px 18px;
		border-radius: var(--radius-md);
		background: var(--brand-tint);
		font-size: 15px;
		line-height: 24px;
		color: var(--brand-deep);

		.m-icon {
			margin-top: 4px;
			color: var(--brand);
		}
	}

	&--intro &__goal {
		margin-top: 24px;
	}

	// --- Numbers ----------------------------------------------
	&__big {
		font-family: var(--font-display);
		font-size: 72px;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.03em;
	}

	&__label {
		padding-top: 10px;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
	}

	&--sites {
		grid-area: sites;
		justify-content: flex-end;
		border-color: transparent;
		background: linear-gradient(150deg, var(--brand) 0%, var(--brand-strong) 70%, var(--brand-deep) 100%);
		color: var(--white);
	}

	// concentric rings drifting off the corner
	&__rings {
		position: absolute;
		top: -60px;
		right: -60px;
		width: 180px;
		height: 180px;
		border: 1px solid var(--on-dark-border);
		border-radius: 50%;
		box-shadow:
			0 0 0 24px var(--on-dark-fill),
			0 0 0 25px var(--on-dark-rule),
			0 0 0 50px var(--on-dark-fill),
			0 0 0 51px var(--on-dark-rule);
	}

	&--years {
		grid-area: years;
		justify-content: flex-end;
		border-color: transparent;
		background: linear-gradient(150deg, var(--accent-soft) 0%, var(--sun-soft) 100%);

		.tile__big {
			color: var(--accent-strong);
		}

		.tile__label {
			color: var(--text-secondary);
		}
	}

	// --- Now --------------------------------------------------
	&--now {
		grid-area: now;
	}

	&__kicker {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);

		&--light {
			color: var(--on-dark-muted);
			letter-spacing: 0.04em;
			text-transform: none;
			font-size: 14px;
		}
	}

	&__pulse {
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--live);

		&::after {
			content: '';
			position: absolute;
			inset: -5px;
			border-radius: 50%;
			background: var(--live);
			opacity: 0.4;
			animation: tile-pulse 1.8s ease-out infinite;
		}
	}

	&__role {
		padding-top: 16px;
	}

	&__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: auto;
		padding-top: 16px;

		li {
			padding: 5px 11px;
			border: 1px solid var(--border);
			border-radius: var(--radius-full);
			background: var(--canvas);
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 500;
			color: var(--text-primary);
		}
	}

	// --- Place + live clock -----------------------------------
	&--place {
		grid-area: place;
		justify-content: space-between;
		gap: 16px;
		border-color: transparent;
		background:
			radial-gradient(26rem 16rem at 100% 100%, color-mix(in srgb, var(--brand) 45%, transparent), transparent 70%),
			var(--ink);
		color: var(--white);
	}

	&--place .m-badge {
		align-self: flex-start;
	}

	&__dots {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(var(--on-dark-border) 1px, transparent 1.4px);
		background-size: 18px 18px;
		mask-image: linear-gradient(110deg, transparent 30%, black 100%);
		pointer-events: none;
	}

	&__clock {
		position: relative;
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 4px 14px;
	}

	&__time {
		font-family: var(--font-display);
		font-size: 56px;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.025em;
		font-variant-numeric: tabular-nums;
	}

	&__zone {
		font-family: var(--font-ui);
		font-size: 15px;
		color: var(--on-dark-muted);
	}

	// --- Stack ------------------------------------------------
	&--stack {
		grid-area: stack;
		gap: 24px;
	}

	&__stack-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 6px 24px;
	}

	&__groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 24px 32px;
	}

	&__group {
		--group-color: var(--brand);

		&:nth-child(2) {
			--group-color: var(--accent);
		}

		&:nth-child(3) {
			--group-color: var(--sun);
		}

		.tile__chips {
			padding-top: 12px;

			li {
				border-color: color-mix(in srgb, var(--group-color) 30%, var(--border));
				background: color-mix(in srgb, var(--group-color) 8%, var(--white));
			}
		}
	}

	&__group-title {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-bottom: 10px;
		border-bottom: 2px solid var(--group-color);
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;

		.m-icon {
			color: color-mix(in srgb, var(--group-color) 80%, var(--ink));
		}
	}

	// --- How I work -------------------------------------------
	&--work {
		grid-area: work;
		gap: 22px;
		background: linear-gradient(120deg, var(--sun-soft) 0%, var(--white) 60%);
	}

	// side by side when there's room, stacked when there isn't
	&__steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px 28px;

		li {
			display: grid;
			grid-template-columns: 36px minmax(0, 1fr);
			gap: 10px;
		}
	}

	&__step-number {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--sun-deep);
	}

	&__step-title {
		display: block;
		padding-bottom: 4px;
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text-primary);
	}

	// --- AI ---------------------------------------------------
	&--ai {
		grid-area: ai;
		gap: 4px;
		background:
			radial-gradient(18rem 12rem at 100% 0%, var(--brand-soft), transparent 70%),
			var(--white);

		.tile__icon {
			background: var(--brand-strong);
			color: var(--sun);
		}
	}

	// --- Small facts ------------------------------------------
	&--fact {
		grid-area: edu;
		gap: 4px;
	}

	&--start {
		grid-area: start;
	}

	&__icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		margin-bottom: 14px;
		border-radius: var(--radius-sm);
		background: var(--brand-soft);
		color: var(--brand-strong);
	}

	&--start &__icon {
		background: var(--sun-soft);
		color: var(--sun-deep);
	}

	&__fact-label {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	&__fact-value {
		font-family: var(--font-display);
		font-size: 17px;
		font-weight: 600;
		line-height: 24px;
		color: var(--text-primary);
	}
}

@keyframes tile-pulse {
	0% {
		opacity: 0.5;
		transform: scale(0.6);
	}

	100% {
		opacity: 0;
		transform: scale(1.6);
	}
}

@media only screen and (max-width: 1100px) {
	.about__con {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-areas:
			'intro intro'
			'sites years'
			'now   place'
			'stack stack'
			'work  work'
			'edu   start'
			'ai    ai';
		padding: 88px 0;
	}
}

@media only screen and (max-width: 640px) {
	.about__con {
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas:
			'intro'
			'sites'
			'now'
			'place'
			'stack'
			'work'
			'ai'
			'years'
			'edu'
			'start';
		padding: 64px 0;
	}

	.tile {
		padding: 24px;

		&--intro {
			padding: 26px;
		}

		&__big {
			font-size: 56px;
		}

		&__time {
			font-size: 44px;
		}
	}
}
</style>
