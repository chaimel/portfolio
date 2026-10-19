<template>
	<div>
		<Project :project="project" :study="study" />
	</div>
</template>

<script setup lang="ts">
import Project from '@/components/features/project/Index.vue'
import { projects } from '~/data/features/projects'
import { notFound } from '~/utils/errors'

const route = useRoute()

// Only projects with a case study have a page; the websites link
// straight to the live site from their cards.
const project = projects.find(item => item.slug === String(route.params.slug))
const study = project?.case_study

if (!project || !study) {
	throw notFound('That case study isn’t here. The rest of my work is on the home page.')
}

const title = `${project.title} — case study`
const description = study.lede

useHead({
	title,
	meta: [
		{ name: 'description', content: description },
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:type', content: 'article' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
	],
})

useCanonical(`/projects/${project.slug}`)
</script>
