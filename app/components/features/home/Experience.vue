<script setup lang="ts">
type Role = {
  date: string;
  title: string;
  org: string;
  summary: string;
};

const roles: Role[] = [
  {
    date: 'Oct 2022 — Present',
    title: 'Front-End Developer',
    org: 'Glophics',
    summary: 'Maintains websites and handles updates using Nuxt.js.',
  },
  {
    date: 'Feb 2021 — Sep 2022',
    title: 'Front-End WordPress Developer',
    org: 'Proweaver',
    summary: 'Created custom WordPress websites using HTML, CSS, JavaScript, and theme workflows.',
  },
  {
    date: 'Jun 2019 — Oct 2019',
    title: 'App Tester',
    org: 'Spingine Corporation',
    summary: 'Tested applications, found bugs, and learned practical QA habits for software delivery.',
  },
  {
    date: 'Jun 2018 — Feb 2019',
    title: 'IT Trainee',
    org: 'SystemsCore Inc.',
    summary: 'Worked as an OJT software developer trainee in an IT and computer technology environment.',
  },
];
</script>

<template>
  <section id="experience" class="experience" aria-labelledby="exp-title">
    <UiWrapper>
      <div class="experience_con">
        <div class="experience_info">
          <p class="eyebrow">Experience</p>
          <h2 id="exp-title">Front-end work across Nuxt.js, WordPress, and testing.</h2>
        </div>
        <ol class="exp_timeline" role="list">
          <li
            v-for="(role, i) in roles"
            :key="role.date"
            :class="['exp_box', `exp_box${i + 1}`, 'reveal']"
          >
            <span class="exp_dot" aria-hidden="true"></span>
            <p class="exp_date">{{ role.date }}</p>
            <h3>{{ role.title }}</h3>
            <p class="exp_org">{{ role.org }}</p>
            <p>{{ role.summary }}</p>
          </li>
        </ol>
      </div>
    </UiWrapper>
  </section>
</template>
