<template>
	<div class="showcase">
		<MBrowserShot
			:image="left.image"
			:url="hostLabel(left.live_url)"
			scroll
			decorative
			class="showcase__side showcase__side--left"
		/>
		<MBrowserShot
			:image="right.image"
			:url="hostLabel(right.live_url)"
			scroll
			decorative
			class="showcase__side showcase__side--right"
		/>
		<MBrowserShot
			:image="featuredProject.cover ?? featuredProject.image"
			:url="hostLabel(featuredProject.live_url)"
			:scroll="!featuredProject.cover"
			eager
			class="showcase__main"
		/>
		<MPhoneShot v-if="featuredProject.phone" :image="featuredProject.phone" decorative class="showcase__phone" />
	</div>
</template>

<script setup lang="ts">
import MBrowserShot from '~/components/core/project/MBrowserShot.vue'
import MPhoneShot from '~/components/core/project/MPhoneShot.vue'
import { featuredProject, websites } from '~/data/features/projects'
import type { Project } from '~/types/features/project'
import { hostLabel } from '~/utils/format'

// The featured web app up front, two live websites fanned out behind
// it, and the app again on a phone.
const live_sites = websites.filter(site => site.status === 'live')
const left = (live_sites.find(site => site.slug === 'smt-logistics') ?? live_sites[0]) as Project
const right = (live_sites.find(site => site.slug === 'beulahland-christian-academy') ?? live_sites[1]) as Project
</script>

<style lang="scss" scoped>
.showcase {
	position: relative;
	max-width: 1120px;
	margin: 0 auto;
	padding: 0 15%;

	// the ink band the screens rest on; it runs into the section below
	&::before {
		content: '';
		position: absolute;
		top: 58%;
		bottom: calc(var(--showcase-tail, 0px) * -1);
		left: -100vw;
		right: -100vw;
		z-index: 0;
		background: var(--ink);
	}

	&__main {
		position: relative;
		z-index: 2;
	}

	&__side {
		position: absolute;
		top: 12%;
		z-index: 1;
		width: 40%;

		&--left {
			left: 0;
			transform: rotate(-4deg);
			transform-origin: bottom right;
		}

		&--right {
			right: 0;
			transform: rotate(4deg);
			transform-origin: bottom left;
		}
	}

	&__phone {
		position: absolute;
		right: 6%;
		bottom: -7%;
		z-index: 3;
		width: 17%;
	}
}

@media only screen and (max-width: 760px) {
	.showcase {
		padding: 0 10% 0 0;

		&__side {
			display: none;
		}

		&__phone {
			right: 0;
			width: 27%;
		}
	}
}
</style>
