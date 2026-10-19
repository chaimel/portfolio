<template>
	<section class="work" aria-labelledby="work-title">
		<div class="wrapper">
			<div class="work__con">
				<MSectionHead
					eyebrow="More work"
					:title="work.title"
					title-id="work-title"
					:lede="work.lede"
					layout="split"
				>
					<dl class="work__counts">
						<div v-for="count in counts" :key="count.label" class="work__count">
							<dd>{{ count.value }}</dd>
							<dt>{{ count.label }}</dt>
						</div>
					</dl>
				</MSectionHead>

				<MText size="small" color="--text-muted" class="work__hint">
					<MIcon name="light-expand" size="xs" />
					{{ work.hint }}
				</MText>
			</div>
		</div>

		<!-- full width: each card sticks under the header and the next one
			 stacks over it (cards must be direct children for sticky to work) -->
		<div ref="stack" class="work__stack">
			<Card
				v-for="(project, position) in websites"
				:key="project.slug"
				:project="project"
				:index="position"
				:total="websites.length"
				@preview="openViewer(position)"
			/>
		</div>

		<Viewer v-model:index="viewer_index" :projects="websites" name="project-viewer" />
	</section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import { hero, work } from '~/data/features/home'
import { websites } from '~/data/features/projects'
import Card from './Card.vue'
import Viewer from './Viewer.vue'

const { openModal } = useModal()

const counts = computed(() => [
	{ value: hero.sites_shipped, label: 'WordPress sites shipped' },
	{ value: String(websites.length), label: 'Shown here' },
	{ value: String(websites.filter(site => site.status === 'live').length), label: 'Still live' },
])

const viewer_index = ref(0)

function openViewer(position: number) {
	viewer_index.value = position
	openModal('project-viewer')
}

// --- The stack ----------------------------------------------------
// While the cards stick (wide, tall-enough screens — the same media
// query as Card.vue), each card learns how much of it the next one
// covers, 0 → 1, as --covered; the card shrinks and darkens with it.
const stack = ref<HTMLElement | null>(null)
let stack_query: MediaQueryList | null = null
let frame = 0

function measure() {
	frame = 0
	const cards = [...(stack.value?.children ?? [])] as HTMLElement[]
	const active = stack_query?.matches ?? false

	cards.forEach((card, position) => {
		const next = cards[position + 1]
		let covered = 0

		// layout height, not the on-screen box: the shrink scales from the
		// top, so it would otherwise feed back into the measurement
		if (active && next) {
			const bottom = card.getBoundingClientRect().top + card.offsetHeight
			covered = Math.min(Math.max((bottom - next.getBoundingClientRect().top) / card.offsetHeight, 0), 1)
		}

		card.style.setProperty('--covered', covered.toFixed(3))
	})
}

function schedule() {
	if (!frame) frame = requestAnimationFrame(measure)
}

onMounted(() => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	stack_query = window.matchMedia('(min-width: 960px) and (min-height: 640px)')
	stack_query.addEventListener('change', schedule)
	window.addEventListener('scroll', schedule, { passive: true })
	window.addEventListener('resize', schedule, { passive: true })
	measure()
})

onBeforeUnmount(() => {
	stack_query?.removeEventListener('change', schedule)
	window.removeEventListener('scroll', schedule)
	window.removeEventListener('resize', schedule)
	if (frame) cancelAnimationFrame(frame)
})
</script>

<style lang="scss" scoped>
.work {
	background: var(--canvas);

	&__con {
		padding: 120px 0 0;
	}

	&__counts {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 36px;
	}

	&__count {
		display: flex;
		flex-direction: column;
		gap: 2px;

		dd {
			font-family: var(--font-display);
			font-size: 32px;
			font-weight: 700;
			line-height: 1;
			letter-spacing: -0.03em;
			color: var(--text-primary);
		}

		dt {
			order: 2;
			font-family: var(--font-ui);
			font-size: 13px;
			color: var(--text-muted);
		}
	}

	&__hint {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-top: 32px;
		font-family: var(--font-ui);
	}

	// nearly edge to edge, capped so ultra-wide screens stay sane
	&__stack {
		display: flex;
		flex-direction: column;
		gap: 48px;
		max-width: 1760px;
		margin: 0 auto;
		padding: 40px clamp(12px, 2vw, 32px) 120px;
	}
}

@media only screen and (max-width: 1024px) {
	.work {
		&__con {
			padding: 88px 0 0;
		}

		&__stack {
			gap: 24px;
			padding-bottom: 88px;
		}
	}
}

@media only screen and (max-width: 860px) {
	.work {
		&__con {
			padding: 64px 0 0;
		}

		&__stack {
			padding-bottom: 64px;
		}
	}
}
</style>
