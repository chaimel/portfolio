<template>
	<section class="work" aria-labelledby="work-title">
		<div class="wrapper">
			<div class="work__con">
				<MSectionHead
					eyebrow="More work"
					index="02"
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

				<ol class="work__index" @pointermove="movePreview" @pointerleave="leaveIndex">
					<Entry
						v-for="(project, position) in moreWork"
						:key="project.slug"
						:project="project"
						:index="position"
						:active="hovered === position"
						@enter="hovered = position"
						@preview="openViewer(position)"
					/>
				</ol>
			</div>
		</div>

		<!-- the hovered project's site, trailing the pointer; each new one
			 opens over the last -->
		<div ref="float" :class="['work__float', { 'work__float--on': hovered >= 0 }]" aria-hidden="true">
			<div
				v-for="(project, position) in moreWork"
				:key="project.slug"
				:class="['work__shot', { 'work__shot--on': hovered === position }]"
			>
				<img
					:src="project.image.src"
					:width="project.image.width"
					:height="project.image.height"
					alt=""
					loading="lazy"
					decoding="async"
				>
			</div>
		</div>

		<Viewer v-model:index="viewer_index" :projects="moreWork" name="project-viewer" />
	</section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import MSectionHead from '~/components/core/section/MSectionHead.vue'
import { hero, work } from '~/data/features/home'
import { moreWork } from '~/data/features/projects'
import Entry from './Entry.vue'
import Viewer from './Viewer.vue'

const { openModal } = useModal()

const counts = [
	{ value: hero.sites_shipped, label: 'WordPress sites shipped' },
	{ value: String(moreWork.length), label: 'Shown here' },
	{ value: String(moreWork.filter(site => site.status === 'live').length), label: 'Still live' },
]

const viewer_index = ref(0)

function openViewer(position: number) {
	viewer_index.value = position
	openModal('project-viewer')
}

// --- The floating preview -------------------------------------------
// Mouse only: it eases toward the pointer each frame and leans into the
// direction it's moving. Phones get a screenshot in each row instead.
const hovered = ref(-1)
const float = ref<HTMLElement | null>(null)

let target = { x: 0, y: 0 }
let current = { x: 0, y: 0 }
let placed = false
let frame = 0

// it rides above the pointer so the hovered name stays readable, and
// drops below it near the top of the screen
function paint(tilt: number) {
	float.value?.style.setProperty('--float-x', `${current.x.toFixed(1)}px`)
	float.value?.style.setProperty('--float-y', `${current.y.toFixed(1)}px`)
	float.value?.style.setProperty('--float-tilt', `${tilt.toFixed(2)}deg`)
	float.value?.style.setProperty('--float-dy', current.y < 340 ? '36px' : 'calc(-100% - 36px)')
}

function follow() {
	frame = 0
	const dx = target.x - current.x
	const dy = target.y - current.y
	current = { x: current.x + dx * 0.16, y: current.y + dy * 0.16 }
	paint(Math.max(-8, Math.min(8, dx * 0.05)))
	if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) frame = requestAnimationFrame(follow)
}

function movePreview(event: PointerEvent) {
	if (event.pointerType !== 'mouse') return
	target = { x: event.clientX, y: event.clientY }

	// appear where the pointer is, not slide in from the last spot
	if (!placed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		current = { ...target }
		placed = true
		paint(0)
		return
	}
	if (!frame) frame = requestAnimationFrame(follow)
}

function leaveIndex() {
	hovered.value = -1
	placed = false
}

onBeforeUnmount(() => {
	if (frame) cancelAnimationFrame(frame)
})
</script>

<style lang="scss" scoped>
.work {
	background: var(--canvas);

	&__con {
		padding: 120px 0;
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
			letter-spacing: -0.015em;
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

	&__index {
		margin-top: 40px;
	}

	// --- Floating preview ---------------------------------------------
	&__float {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 30;
		width: 400px;
		aspect-ratio: 16 / 10;
		pointer-events: none;
		opacity: 0;
		transform:
			translate3d(var(--float-x, 0), var(--float-y, 0), 0)
			translate(-50%, var(--float-dy, 36px))
			rotate(var(--float-tilt, 0deg))
			scale(0.85);
		// transform isn't transitioned: the script already eases it
		transition: opacity 0.25s var(--ease);

		&--on {
			opacity: 1;
			transform:
				translate3d(var(--float-x, 0), var(--float-y, 0), 0)
				translate(-50%, var(--float-dy, 36px))
				rotate(var(--float-tilt, 0deg));
		}
	}

	&__shot {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border: 5px solid var(--white);
		border-radius: var(--radius-lg);
		background: var(--white);
		box-shadow: var(--shadow-float);
		clip-path: inset(100% 0 0 0 round var(--radius-lg));
		transition: clip-path 0.5s var(--ease);

		&--on {
			z-index: 1;
			clip-path: inset(0 0 0 0 round var(--radius-lg));
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
		}
	}
}

@media (hover: none), (pointer: coarse) {
	.work__float {
		display: none;
	}
}

@media only screen and (max-width: 1024px) {
	.work__con {
		padding: 88px 0;
	}
}

@media only screen and (max-width: 760px) {
	.work {
		&__con {
			padding: 64px 0;
		}

		&__float {
			display: none;
		}
	}
}
</style>
