<script setup lang="ts">
type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

const projects: Project[] = [
  {
    title: 'Beulahland Christian Academy',
    description: 'School site · WordPress build',
    href: 'https://www.beulahlandjax.org/',
    image: '/projects/p1.jpg',
    alt: 'Beulahland Christian Academy website screenshot',
  },
  {
    title: 'Spark City Smoke and Vape',
    description: 'Retail site · WordPress build',
    href: 'https://web.link2newsite.com/limelightll/sparkcityon575/',
    image: '/projects/p2.jpg',
    alt: 'Spark City Smoke and Vape website screenshot',
  },
  {
    title: 'SMT Logistics',
    description: 'Logistics site · WordPress build',
    href: 'http://www.smtlg.com/',
    image: '/projects/p3.jpg',
    alt: 'SMT Logistics website screenshot',
  },
  {
    title: 'SalmaStar Fishing Group',
    description: 'Company site · WordPress build',
    href: 'https://w3204.proweaversite3.com/',
    image: '/projects/p4.jpg',
    alt: 'SalmaStar Fishing Group website screenshot',
  },
  {
    title: 'Summerfield Home Care',
    description: 'Healthcare site · WordPress build',
    href: 'https://www.summerfieldhomecare.com/',
    image: '/projects/p5.jpg',
    alt: 'Summerfield Home Care website screenshot',
  },
  {
    title: 'Skyguide LLC',
    description: 'Services site · WordPress build',
    href: 'http://www.skyguidellc.com/',
    image: '/projects/p6.jpg',
    alt: 'Skyguide LLC website screenshot',
  },
];
</script>

<template>
  <section id="projects" class="projects" aria-labelledby="project-title">
    <UiWrapper>
      <div class="project_con">
        <div class="project_info">
          <p class="eyebrow">Selected Work</p>
          <h2 id="project-title">Recent websites I have built and shipped.</h2>
          <p class="section_sub">A selection of WordPress and front-end work currently running in production.</p>
        </div>
        <div class="project_holder">
          <ul class="project_boxes" role="list">
            <li
              v-for="(project, i) in projects"
              :key="project.href"
              :class="['proj_box', `proj_box${i + 1}`, 'reveal']"
            >
              <a :href="project.href" target="_blank" rel="noopener">
                <div class="proj_thumb">
                  <img :src="project.image" :alt="project.alt" loading="lazy">
                  <span class="proj_overlay">
                    <span class="proj_overlay_text">Open site</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  </span>
                </div>
                <div class="proj_info">
                  <div>
                    <h3>{{ project.title }}</h3>
                    <p class="proj_desc">{{ project.description }}</p>
                  </div>
                  <span class="proj_tag">Live</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </UiWrapper>
  </section>
</template>
