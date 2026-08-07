<script setup lang="ts">
const points = [
  { label: 'Build.', text: 'Custom WordPress themes and Nuxt.js front ends from design to live launch.' },
  { label: 'Review.', text: 'I check AI-assisted code for accessibility, responsiveness, correctness, and maintainability.' },
  { label: 'Improve.', text: 'Faster loads, better responsiveness, cleaner code as the site grows.' },
];
</script>

<template>
  <section id="about" class="about" aria-label="Professional snapshot">
    <UiWrapper>
      <div class="about_con">
        <div class="about_info">
          <p class="eyebrow">Profile</p>
          <h2>Web developer focused on clear delivery and maintainable front ends.</h2>
        </div>
        <div class="about_copy">
          <p>
            My career goal is to keep growing as a full-stack web developer while
            delivering project requirements on time and with quality. I am comfortable
            working with clear direction, learning new tools, and turning designs and
            website updates into dependable production work. I use Claude and GPT to explore solutions, then review, test, and refine the code before it ships.
          </p>
          <ul class="about_boxes" role="list">
            <li
              v-for="(point, i) in points"
              :key="point.label"
              :class="['ab_box', `ab_box${i + 1}`, 'reveal']"
            >
              <div class="ab_info">
                <strong>{{ point.label }}</strong> {{ point.text }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UiWrapper>
  </section>
</template>
