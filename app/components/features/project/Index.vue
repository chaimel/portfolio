<template>
	<div class="project">
		<Banner :project="props.project" :study="props.study" />
		<Overview :study="props.study" />
		<Flow :study="props.study" />
		<Highlights :study="props.study" />
		<Screens :study="props.study" />
		<Cta />
	</div>
</template>

<script setup lang="ts">
import type { CaseStudy, Project } from '~/types/features/project'
import Banner from './Banner.vue'
import Cta from './Cta.vue'
import Flow from './Flow.vue'
import Highlights from './Highlights.vue'
import Overview from './Overview.vue'
import Screens from './Screens.vue'

interface Props {
	project: Project
	study: CaseStudy
}

const props = defineProps<Props>()
</script>
