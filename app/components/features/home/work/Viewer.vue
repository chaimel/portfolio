<template>
	<MModal :name="props.name" labelledby="viewer-title" :max-width="1240">
		<div v-if="project" class="viewer" :style="accent_style">
			<div class="viewer__frame">
				<div class="viewer__bar">
					<span class="viewer__dots" aria-hidden="true"><i /><i /><i /></span>
					<span class="viewer__url">
						<MIcon name="light-lock" size="xs" />
						<span class="viewer__host">{{ host }}</span>
					</span>
				</div>

				<!-- the whole page, scrollable: wheel, touch, or arrow keys once focused -->
				<div
					ref="screen"
					class="viewer__screen"
					tabindex="0"
					:aria-label="`Full-page screenshot of ${project.title}. Scroll to see the whole page.`"
					@scroll.passive="scrolled = true"
				>
					<img
						:key="project.slug"
						class="viewer__img"
						:src="project.image.src"
						:alt="project.image.alt"
						:width="project.image.width"
						:height="project.image.height"
						decoding="async"
					>
				</div>

				<span :class="['viewer__scroll-hint', { 'viewer__scroll-hint--hidden': scrolled }]" aria-hidden="true">
					<MIcon name="light-mouse" size="sm" />
					Scroll to explore the page
				</span>
			</div>

			<div class="viewer__info">
				<div class="viewer__head">
					<span class="viewer__count">Project {{ index + 1 }} of {{ props.projects.length }}</span>
					<button type="button" class="viewer__close" aria-label="Close preview" @click="close">
						<MIcon name="light-close" size="md" />
					</button>
				</div>

				<div class="viewer__intro">
					<MBadge v-if="project.status === 'offline'" size="sm">Site offline</MBadge>
					<MBadge v-else tone="success" size="sm" dot>Live</MBadge>

					<MHeading id="viewer-title" variant="2" size="3" class="viewer__title">{{ project.title }}</MHeading>
					<MText size="small" color="--text-muted" class="viewer__meta">
						{{ project.category }}<template v-if="project.built_at"> · Built at {{ project.built_at }}</template>
					</MText>
					<MText v-if="project.summary" size="large" color="--text-secondary" class="viewer__summary">
						{{ project.summary }}
					</MText>
				</div>

				<dl class="viewer__facts">
					<div class="viewer__fact">
						<dt>Languages</dt>
						<dd>
							<ul class="viewer__tags">
								<li v-for="language in project.languages" :key="language">
									<MTag variant="soft" size="sm">{{ language }}</MTag>
								</li>
							</ul>
						</dd>
					</div>
					<div class="viewer__fact">
						<dt>Built with</dt>
						<dd>
							<ul class="viewer__tags">
								<li v-for="tool in project.stack" :key="tool">
									<MTag size="sm">{{ tool }}</MTag>
								</li>
							</ul>
						</dd>
					</div>
				</dl>

				<div class="viewer__actions">
					<MButton
						v-if="project.status === 'live'"
						:href="project.live_url"
						target="_blank"
						block
					>
						Visit the live site
						<template #suffix>
							<MIcon name="light-arrow-up-right" size="sm" />
						</template>
					</MButton>
					<MText v-else size="small" color="--text-muted" class="viewer__offline">
						The client’s site is no longer online. This capture shows the page as I built it.
					</MText>
				</div>

				<div class="viewer__nav">
					<MButton variant="neutral" size="sm" @click="go(-1)">
						<template #prefix>
							<MIcon name="light-arrow-left" size="sm" />
						</template>
						Previous
					</MButton>
					<span class="viewer__keys" aria-hidden="true">← → to browse</span>
					<MButton variant="neutral" size="sm" @click="go(1)">
						Next
						<template #suffix>
							<MIcon name="light-arrow-right" size="sm" />
						</template>
					</MButton>
				</div>
			</div>
		</div>
	</MModal>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Project } from '~/types/features/project'
import { hostLabel } from '~/utils/format'

// The work grid's project viewer: the whole page in a browser window you
// can scroll, with the project's details, languages and tools beside it.
interface Props {
	projects: Project[]
	name?: string
}

const props = withDefaults(defineProps<Props>(), {
	name: 'project-viewer',
})

// which project is showing; the grid sets it before opening
const index = defineModel<number>('index', { default: 0 })

const { isOpen, closeModal } = useModal()

const screen = ref<HTMLElement | null>(null)
const scrolled = ref(false)

const project = computed(() => props.projects[index.value])
const host = computed(() => (project.value ? hostLabel(project.value.live_url) : ''))

// the client's brand color tints the stage around their page
const accent_style = computed(() => (project.value?.accent ? { '--project-accent': project.value.accent } : undefined))

function close() {
	closeModal(props.name)
}

// wraps around at both ends
function go(step: number) {
	const total = props.projects.length
	index.value = (index.value + step + total) % total
}

// every project starts at the top of its page, with the hint showing
watch(index, async () => {
	scrolled.value = false
	await nextTick()
	screen.value?.scrollTo({ top: 0 })
	scrolled.value = false
})

watch(() => isOpen(props.name), (open) => {
	if (open) scrolled.value = false
})

// ← and → page through the projects while the viewer is open
function onKeydown(event: KeyboardEvent) {
	if (!isOpen(props.name)) return
	if (event.key === 'ArrowLeft') go(-1)
	if (event.key === 'ArrowRight') go(1)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style lang="scss" scoped>
.viewer {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 380px;
	height: min(86dvh, 840px);

	// --- The page ---------------------------------------------
	&__frame {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 0;
		border-right: var(--rule);
		background: color-mix(in srgb, var(--project-accent, var(--brand)) 16%, var(--white));
		transition: background-color 0.3s var(--ease);
	}

	&__bar {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 44px;
		padding: 0 18px;
		border-bottom: var(--rule);
		background: var(--canvas);
	}

	&__dots {
		display: inline-flex;
		gap: 7px;

		i {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--border-strong);
		}
	}

	&__url {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-width: 0;
		height: 26px;
		margin: 0 auto;
		padding: 0 14px;
		border: var(--rule);
		border-radius: var(--radius-full);
		background: var(--white);
		font-family: var(--font-ui);
		font-size: 12px;
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

	&__screen {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;

		&:focus-visible {
			outline: 2px solid var(--brand);
			outline-offset: -2px;
		}
	}

	&__img {
		display: block;
		width: 100%;
		height: auto;
	}

	&__scroll-hint {
		position: absolute;
		left: 50%;
		bottom: 20px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 18px;
		border-radius: var(--radius-full);
		background: var(--ink);
		box-shadow: var(--shadow-float);
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--white);
		white-space: nowrap;
		pointer-events: none;
		transform: translateX(-50%);
		transition: opacity 0.3s var(--ease);

		&--hidden {
			opacity: 0;
		}
	}

	// --- Details ----------------------------------------------
	&__info {
		display: flex;
		flex-direction: column;
		gap: 24px;
		min-height: 0;
		padding: 20px 28px 24px;
		overflow-y: auto;
	}

	&__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__count {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	&__close {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		margin-right: -8px;
		border-radius: 50%;
		color: var(--text-primary);
		transition: background-color 0.2s var(--ease);

		&:hover {
			background: var(--surface-muted);
		}
	}

	&__title {
		padding-top: 14px;
	}

	&__meta {
		padding-top: 4px;
	}

	&__summary {
		padding-top: 14px;
	}

	&__facts {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 20px;
		border-top: var(--rule);
	}

	&__fact {
		display: flex;
		flex-direction: column;
		gap: 8px;

		dt {
			font-family: var(--font-ui);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--text-muted);
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	&__nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px 12px;
		margin-top: auto;
		padding-top: 20px;
		border-top: var(--rule);
	}

	// its own line under the two buttons
	&__keys {
		order: 3;
		flex-basis: 100%;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--text-muted);
		text-align: center;
	}
}

@media only screen and (max-width: 900px) {
	.viewer {
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 55%) minmax(0, 45%);
		height: calc(100dvh - 20px);

		&__frame {
			border-right: 0;
			border-bottom: var(--rule);
		}

		&__info {
			gap: 18px;
			padding: 16px 20px 20px;
		}

		&__keys {
			display: none;
		}
	}
}
</style>
