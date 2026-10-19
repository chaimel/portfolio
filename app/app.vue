<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import { toolGroups } from '~/data/features/home'
import { contact, siteDescription, siteName, siteRole, siteTitle } from '~/data/features/site'

// siteUrl is empty until NUXT_PUBLIC_SITE_URL is set (see nuxt.config.ts);
// absolute-URL tags are emitted only when the domain is configured.
const site_url = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
const og_image = site_url ? `${site_url}/og-image.png` : ''

const person = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'name': siteName,
	'jobTitle': siteRole,
	'email': `mailto:${contact.email}`,
	'telephone': contact.phone_href.replace('tel:', ''),
	'address': {
		'@type': 'PostalAddress',
		'addressLocality': 'Ginatilan',
		'addressRegion': 'Cebu',
		'addressCountry': 'PH',
	},
	'worksFor': { '@type': 'Organization', 'name': 'Glophics' },
	'knowsAbout': toolGroups.flatMap(group => group.tools),
	...(site_url ? { url: `${site_url}/` } : {}),
}

useHead({
	titleTemplate: title => (title && title !== siteName ? `${title} | ${siteName}` : siteTitle),
	meta: [
		{ name: 'description', content: siteDescription },
		...(og_image
			? [
					{ property: 'og:image', content: og_image },
					{ property: 'og:image:width', content: '1200' },
					{ property: 'og:image:height', content: '630' },
					{ property: 'og:image:alt', content: siteTitle },
					{ name: 'twitter:image', content: og_image },
				]
			: []),
	],
	script: [
		{ type: 'application/ld+json', innerHTML: JSON.stringify(person) },
	],
})
</script>
