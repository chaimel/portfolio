<template>
	<section id="about" class="about" aria-labelledby="about-title">
		<div class="wrapper">
			<div class="about__con">
				<MEyebrow index="03" aria-hidden="true">About me</MEyebrow>
				<h2 id="about-title" class="sr-only">About me</h2>

				<!-- each word lights up as the paragraph scrolls through the view -->
				<p ref="statement" class="about__statement" :style="{ '--total': tokens.length }">
					<template v-for="(token, index) in tokens" :key="index">
						<span
							v-if="token.kind === 'project'"
							class="about__chip"
							:style="{ '--i': index, '--project-accent': token.accent }"
						>
							<img
								v-if="token.image"
								:src="token.image.src"
								:width="token.image.width"
								:height="token.image.height"
								alt=""
								loading="lazy"
								decoding="async"
							>
							{{ token.text }}
						</span>
						<span v-else :class="token.kind === 'stat' ? 'about__stat' : 'about__word'" :style="{ '--i': index }">{{ token.text }}</span>{{ token.space ? ' ' : '' }}
					</template>
				</p>

				<!-- the story in magazine columns, beside the facts -->
				<div class="about__body">
					<div class="about__story">
						<MHeading variant="3" size="4" class="about__story-title">{{ about.title }}</MHeading>
						<div class="about__columns">
							<MText v-for="paragraph in about.story" :key="paragraph" color="--text-secondary" class="about__paragraph">
								{{ paragraph }}
							</MText>
						</div>
					</div>

					<div class="about__facts">
						<dl>
							<div v-for="fact in facts" :key="fact.label" class="about__fact">
								<dt>{{ fact.label }}</dt>
								<dd>
									{{ fact.value }}
									<span v-if="fact.note">{{ fact.note }}</span>
								</dd>
							</div>
						</dl>
						<p class="about__goal">
							<MIcon name="light-flag" size="sm" />
							<span><strong>Goal:</strong> {{ about.goal }}</span>
						</p>
					</div>
				</div>

				<div id="skills" class="about__skills">
					<div class="about__skills-head">
						<MHeading variant="3" size="3">Stack &amp; skills</MHeading>
						<MText color="--text-secondary">{{ toolkit.title }}</MText>
					</div>

					<div class="about__groups">
						<div v-for="group in toolGroups" :key="group.title" class="about__group">
							<span class="about__group-icon" aria-hidden="true"><MIcon :name="group.icon" size="md" /></span>
							<MHeading variant="4" size="5">{{ group.title }}</MHeading>
							<MText size="small" color="--text-secondary">{{ group.text }}</MText>
							<ul class="about__chips" :aria-label="`${group.title} tools`">
								<li v-for="tool in group.tools" :key="tool">{{ tool }}</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="about__how">
					<MHeading variant="3" size="3">{{ about.approach.title }}</MHeading>
					<ol class="about__steps">
						<li v-for="(point, index) in approachPoints" :key="point.title" class="about__step">
							<span class="about__step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
							<MHeading variant="4" size="5">{{ point.title }}</MHeading>
							<MText size="small" color="--text-secondary">{{ point.text }}</MText>
						</li>
					</ol>
					<p class="about__ai">
						<span class="about__ai-icon" aria-hidden="true"><MIcon name="light-sparkles" size="sm" /></span>
						<span><strong>{{ about.ai.title }}.</strong> {{ about.ai.text }}</span>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { about, approachPoints, credentials, roles, toolGroups, toolkit } from '~/data/features/home'
import { projects } from '~/data/features/projects'
import { contact } from '~/data/features/site'
import type { ProjectImage } from '~/types/features/project'

// --- The statement, word by word --------------------------------------
interface Token {
	kind: 'word' | 'stat' | 'project'
	text: string
	// a space after it, before the next token
	space: boolean
	image?: ProjectImage
	accent?: string
}

const tokens: Token[] = []

for (const part of about.statement) {
	if ('stat' in part) {
		tokens.push({ kind: 'stat', text: part.stat, space: true })
	}
	else if ('project' in part) {
		const project = projects.find(item => item.slug === part.project)
		tokens.push({
			kind: 'project',
			text: project?.title ?? part.project,
			space: true,
			image: project?.wall?.[0],
			accent: project?.accent,
		})
	}
	else {
		// text that doesn't start with a space ("." after a chip) hugs what's before it
		const previous = tokens.at(-1)
		if (previous && !/^\s/.test(part.text)) previous.space = false
		const words = part.text.trim().split(/\s+/)
		words.forEach((word, index) => {
			const last = index === words.length - 1
			tokens.push({ kind: 'word', text: word, space: !last || /\s$/.test(part.text) })
		})
	}
}

// 0 → 1 from when the paragraph's top passes 80% down the view to when
// its bottom passes 55% — fully lit before it leaves
const statement = ref<HTMLElement | null>(null)
let frame = 0

function light() {
	frame = 0
	const box = statement.value?.getBoundingClientRect()
	if (!box) return
	const view = window.innerHeight
	const progress = Math.min(Math.max((view * 0.8 - box.top) / (view * 0.25 + box.height), 0), 1)
	statement.value?.style.setProperty('--lit', progress.toFixed(3))
}

function schedule() {
	if (!frame) frame = requestAnimationFrame(light)
}

onMounted(() => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
	window.addEventListener('scroll', schedule, { passive: true })
	window.addEventListener('resize', schedule, { passive: true })
	light()
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', schedule)
	window.removeEventListener('resize', schedule)
	if (frame) cancelAnimationFrame(frame)
})

// --- Facts ----------------------------------------------------------------
const current_role = roles.find(role => !role.end)
const first_role = roles.at(-1)
const degree = credentials[0]

const facts = [
	{ label: 'Based in', value: contact.location, note: '' },
	{ label: 'Now', value: current_role?.title ?? '', note: `at ${current_role?.org} · since ${current_role?.start}` },
	{ label: 'Studied', value: degree?.title ?? '', note: `${degree?.place} · ${degree?.years}` },
	{ label: 'First role', value: first_role?.title ?? '', note: `${first_role?.org} · ${first_role?.start}` },
]
</script>

<style lang="scss" scoped>
.about {
	position: relative;
	background: var(--canvas);

	&__con {
		padding: 128px 0 120px;
	}

	// --- Statement ------------------------------------------------------
	&__statement {
		// fully lit until the script takes over (and for reduced motion)
		--lit: 1;

		max-width: 1160px;
		padding-top: 28px;
		font-family: var(--font-display);
		font-size: clamp(30px, 4.3vw, 60px);
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	&__word,
	&__stat,
	&__chip {
		opacity: clamp(0.14, calc(var(--lit) * (var(--total) + 4) - var(--i)), 1);
		transition: opacity 0.2s linear;
	}

	&__stat {
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	// a project, inline: its screenshot in a pill, then its name
	&__chip {
		--project-accent: var(--brand);

		display: inline-flex;
		align-items: center;
		gap: 0.3em;
		margin: 0.04em 0;
		padding: 0.1em 0.5em 0.1em 0.12em;
		border: 1px solid color-mix(in srgb, var(--project-accent) 40%, var(--border));
		border-radius: var(--radius-full);
		background: color-mix(in srgb, var(--project-accent) 12%, var(--white));
		font-size: 0.62em;
		line-height: 1.2;
		vertical-align: 0.18em;
		white-space: nowrap;

		img {
			width: 2.6em;
			height: 1.6em;
			border-radius: var(--radius-full);
			object-fit: cover;
			object-position: top;
		}
	}

	// --- Story + facts --------------------------------------------------
	&__body {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		align-items: start;
		gap: 48px 64px;
		padding-top: 96px;
	}

	&__story-title {
		max-width: 520px;
		padding-bottom: 20px;
	}

	&__columns {
		column-count: 2;
		column-gap: 40px;
		padding-top: 20px;
		border-top: var(--rule);
	}

	&__paragraph {
		break-inside: avoid;
		padding-bottom: 16px;
	}

	&__facts {
		padding: 8px 28px 28px;
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		background: var(--white);
		box-shadow: var(--shadow-card);
	}

	&__fact {
		padding: 18px 0;
		border-bottom: var(--rule);

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--text-muted);
		}

		dd {
			padding-top: 6px;
			font-family: var(--font-display);
			font-size: 19px;
			font-weight: 600;
			line-height: 26px;
			color: var(--text-primary);

			span {
				display: block;
				font-family: var(--font-ui);
				font-size: 14px;
				font-weight: 400;
				line-height: 22px;
				color: var(--text-secondary);
			}
		}
	}

	&__goal {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		margin-top: 20px;
		padding: 14px 16px;
		border-radius: var(--radius-md);
		background: var(--brand-tint);
		font-size: 15px;
		line-height: 23px;
		color: var(--brand-deep);

		.m-icon {
			flex-shrink: 0;
			margin-top: 4px;
			color: var(--brand);
		}
	}

	// --- Stack & skills --------------------------------------------------
	&__skills {
		padding-top: 112px;
		scroll-margin-top: calc(var(--header-height) + 24px);
	}

	&__skills-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px 32px;
		padding-bottom: 28px;
	}

	&__groups {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	&__group {
		--group-color: var(--brand);

		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 28px;
		border: 1px solid var(--border);
		border-top: 3px solid var(--group-color);
		border-radius: var(--radius-lg);
		background: var(--white);

		&:nth-child(2) {
			--group-color: var(--accent);
		}

		&:nth-child(3) {
			--group-color: var(--sun);
		}
	}

	&__group-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		margin-bottom: 6px;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--group-color) 14%, var(--white));
		color: color-mix(in srgb, var(--group-color) 80%, var(--ink));
	}

	&__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: auto;
		padding-top: 10px;

		li {
			padding: 5px 11px;
			border: 1px solid color-mix(in srgb, var(--group-color) 30%, var(--border));
			border-radius: var(--radius-full);
			background: color-mix(in srgb, var(--group-color) 8%, var(--white));
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 500;
		}
	}

	// --- How I work ------------------------------------------------------
	&__how {
		padding-top: 112px;
	}

	&__steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 40px;
		padding-top: 28px;
	}

	&__step {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-top: 20px;
		border-top: 2px solid var(--ink);
	}

	&__step-number {
		font-family: var(--font-display);
		font-size: 72px;
		font-weight: 700;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1.5px var(--brand);
	}

	&__ai {
		display: flex;
		align-items: center;
		gap: 14px;
		max-width: 860px;
		margin-top: 48px;
		padding: 16px 20px;
		border: 1px dashed var(--border-strong);
		border-radius: var(--radius-lg);
		font-size: 15px;
		line-height: 24px;
		color: var(--text-secondary);

		strong {
			color: var(--text-primary);
		}
	}

	&__ai-icon {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: var(--radius-sm);
		background: var(--brand-strong);
		color: var(--sun);
	}
}

@media only screen and (max-width: 1024px) {
	.about {
		&__con {
			padding: 96px 0 88px;
		}

		&__body {
			grid-template-columns: minmax(0, 1fr);
			padding-top: 72px;
		}

		&__groups {
			grid-template-columns: minmax(0, 1fr);
		}

		&__skills,
		&__how {
			padding-top: 88px;
		}
	}
}

@media only screen and (max-width: 700px) {
	.about {
		&__con {
			padding: 72px 0 64px;
		}

		&__columns {
			column-count: 1;
		}

		&__steps {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
		}

		&__step-number {
			font-size: 56px;
		}

		&__facts,
		&__group {
			padding-left: 22px;
			padding-right: 22px;
		}

		&__ai {
			align-items: flex-start;
		}
	}
}
</style>
