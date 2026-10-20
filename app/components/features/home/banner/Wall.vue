<template>
	<div class="wall" aria-hidden="true">
		<div class="wall__plane">
			<div v-for="(column, position) in columns" :key="position" class="wall__column">
				<!-- each column holds its tiles twice; sliding it up by half loops seamlessly -->
				<div v-for="copy in 2" :key="copy" class="wall__run">
					<figure
						v-for="tile in column"
						:key="`${copy}-${tile.image.src}`"
						class="wall__tile"
						:style="{ '--tile-accent': tile.accent }"
					>
						<span class="wall__bar">
							<span class="wall__dots" />
							<span class="wall__host">{{ tile.host }}</span>
						</span>
						<img
							:src="tile.image.src"
							:width="tile.image.width"
							:height="tile.image.height"
							alt=""
							decoding="async"
							class="wall__image"
						>
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { projects } from '~/data/features/projects'
import type { ProjectImage } from '~/types/features/project'
import { hostLabel } from '~/utils/format'

// The hero's wall of work: every project's crops in three slowly moving
// columns on a tilted plane. Decorative — the projects themselves are
// listed, with links, further down the page.
interface Tile {
	image: ProjectImage
	host: string
	accent?: string
}

const column_count = 3

// all the first crops, then all the second ones, so a column's
// neighbours are never two crops of the same site
const tiles: Tile[] = [0, 1].flatMap(part => projects.flatMap((project) => {
	const image = project.wall?.[part]
	return image ? [{ image, host: hostLabel(project.live_url), accent: project.accent }] : []
}))

const columns: Tile[][] = Array.from({ length: column_count }, (_, column) =>
	tiles.filter((_, index) => index % column_count === column),
)
</script>

<style lang="scss" scoped>
.wall {
	--wall-gap: 18px;

	overflow: hidden;
	perspective: 1800px;
	// fade the plane out at every edge so it melts into the hero
	mask-image:
		linear-gradient(to right, transparent 0%, black 30%, black 92%, transparent 100%),
		linear-gradient(to bottom, transparent 0%, black 26%, black 80%, transparent 100%);
	mask-composite: intersect;
	-webkit-mask-composite: source-in;

	&__plane {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--wall-gap);
		width: 118%;
		height: 150%;
		margin: -18% 0 0 -2%;
		transform: rotateX(24deg) rotateY(-16deg) rotateZ(14deg);
		transform-style: preserve-3d;
	}

	&__column {
		animation: wall-rise 64s linear infinite;
		will-change: transform;

		&:nth-child(2) {
			animation-duration: 78s;
			animation-direction: reverse;
		}

		&:nth-child(3) {
			animation-duration: 70s;
		}
	}

	&:hover &__column {
		animation-play-state: paused;
	}

	&__run {
		display: flex;
		flex-direction: column;
		gap: var(--wall-gap);
		padding-bottom: var(--wall-gap);
	}

	&__tile {
		--tile-accent: var(--brand);

		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--white);
		box-shadow: var(--shadow-card);
	}

	&__bar {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 24px;
		padding: 0 10px;
		border-bottom: 1px solid var(--border);
		background: var(--canvas);
	}

	&__dots {
		flex: 0 0 auto;
		width: 30px;
		height: 6px;
		background:
			radial-gradient(circle 3px at 3px 50%, var(--accent) 98%, transparent),
			radial-gradient(circle 3px at 15px 50%, var(--sun) 98%, transparent),
			radial-gradient(circle 3px at 27px 50%, color-mix(in srgb, var(--tile-accent) 80%, var(--white)) 98%, transparent);
	}

	&__host {
		overflow: hidden;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 500;
		color: var(--text-muted);
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&__image {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 10;
		object-fit: cover;
	}
}

@keyframes wall-rise {
	from {
		transform: translateY(0);
	}

	to {
		transform: translateY(-50%);
	}
}

@media (prefers-reduced-motion: reduce) {
	.wall__column {
		animation: none;
	}
}
</style>
