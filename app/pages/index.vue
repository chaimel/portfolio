<template>
	<div>
		<Home />
	</div>
</template>

<script setup lang="ts">
import Home from '@/components/features/home/Index.vue'
import { siteDescription, siteTitle } from '~/data/features/site'

useHead({
	meta: [
		{ property: 'og:title', content: siteTitle },
		{ property: 'og:description', content: siteDescription },
		{ name: 'twitter:title', content: siteTitle },
		{ name: 'twitter:description', content: siteDescription },
	],
})

useCanonical('/')
</script>
