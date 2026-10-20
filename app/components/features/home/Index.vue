<template>
	<div class="home">
		<Banner />
		<Featured />
		<Work />
		<Marquee />
		<About />
		<Experience />
		<Contact />
	</div>
</template>

<script setup lang="ts">
import About from './About.vue'
import Banner from './banner/Index.vue'
import Contact from './Contact.vue'
import Experience from './Experience.vue'
import Featured from './Featured.vue'
import Marquee from './Marquee.vue'
import Work from './work/Index.vue'
</script>
