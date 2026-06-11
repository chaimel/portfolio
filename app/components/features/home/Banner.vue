<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const words = ['responsive', 'maintainable', 'accessible', 'production-ready'];

const rotatorText = ref(words[0]!);
const rotatorOut = ref(false);

let timer: ReturnType<typeof setInterval> | null = null;
let swapTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  timer = setInterval(() => {
    i = (i + 1) % words.length;
    rotatorOut.value = true;
    swapTimer = setTimeout(() => {
      rotatorText.value = words[i]!;
      rotatorOut.value = false;
    }, 280);
  }, 2400);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  if (swapTimer) clearTimeout(swapTimer);
});
</script>

<template>
  <section class="banner" aria-labelledby="bnr-title">
    <div class="bnr_bg" aria-hidden="true">
      <span class="orb orb1"></span>
      <span class="orb orb2"></span>
      <span class="orb orb3"></span>
    </div>
    <UiWrapper>
      <div class="bnr_con">
        <div class="bnr_info">
          <span class="status_pill">
            <span class="status_dot" aria-hidden="true"></span>
            Available for new front-end work
          </span>
          <p class="eyebrow">Front-End Developer · Cebu, PH</p>
          <h1 id="bnr-title">
            Hi, I'm <span class="accent">Chaimel</span>.<br>
            I build clean, fast,<br>
            <span class="rotator">
              <span class="rotator_word" :class="{ 'is-out': rotatorOut }" aria-hidden="true">{{ rotatorText }}</span>
            </span>
            websites.
          </h1>
          <p class="bnr_copy">
            I build and maintain responsive websites with WordPress, Nuxt.js,
            HTML, CSS, JavaScript, Bootstrap, PHP, and Android Java foundations.
          </p>
          <div class="bnr_actions" aria-label="Primary actions">
            <a class="button button_primary" href="mailto:chaimelenjambre15@gmail.com">
              <span>Email me</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a class="button button_secondary" href="/Chaimel-Enjambre-Resume.pdf" target="_blank" rel="noopener">View Résumé</a>
          </div>
          <dl class="bnr_stats" aria-label="At a glance">
            <div>
              <dt>Years building</dt>
              <dd>5<span>+</span></dd>
            </div>
            <div>
              <dt>Live sites shipped</dt>
              <dd>6<span>+</span></dd>
            </div>
            <div>
              <dt>Tools &amp; stacks</dt>
              <dd>8<span>+</span></dd>
            </div>
          </dl>
        </div>
      </div>
      <a class="scroll_indicator" href="#projects" aria-label="Scroll to projects">
        <span>Scroll</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="1" width="12" height="20" rx="6"/><line x1="7" y1="6" x2="7" y2="10"/></svg>
      </a>
    </UiWrapper>
  </section>
</template>
