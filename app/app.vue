<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

let observer: IntersectionObserver | null = null;
let onScroll: (() => void) | null = null;
let rafId: number | null = null;
let smoothRafId: number | null = null;

// ---------- SEO: structured data + absolute-URL social tags ----------
// siteUrl is empty until NUXT_PUBLIC_SITE_URL is set (see nuxt.config.ts).
// Absolute-URL tags are emitted ONLY when the domain is configured.
const siteUrl = (useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '');
const pageUrl = siteUrl ? `${siteUrl}/` : undefined;
const ogImage = siteUrl ? `${siteUrl}/og-image.png` : undefined;

const profileLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  ...(pageUrl ? { url: pageUrl } : {}),
  mainEntity: {
    '@type': 'Person',
    name: 'Chaimel Enjambre',
    jobTitle: 'Front-End Developer',
    email: 'mailto:chaimelenjambre15@gmail.com',
    telephone: '+639275372224',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ginatilan',
      addressRegion: 'Cebu',
      addressCountry: 'PH',
    },
    worksFor: { '@type': 'Organization', name: 'Glophics' },
    knowsAbout: [
      'HTML', 'CSS', 'JavaScript', 'Nuxt.js', 'Bootstrap',
      'WordPress', 'PHP', 'Android (Java)', 'Responsive design',
    ],
    ...(pageUrl ? { url: pageUrl } : {}),
  },
};

useHead({
  link: pageUrl ? [{ rel: 'canonical', href: pageUrl }] : [],
  meta: ogImage
    ? [
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'Chaimel Enjambre — Front-End Developer' },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:image:alt', content: 'Chaimel Enjambre — Front-End Developer' },
      ]
    : [],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(profileLd) },
  ],
});

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el));

  const progressBar = document.querySelector<HTMLElement>('.scroll_progress span');
  const siteHeader = document.querySelector<HTMLElement>('.site_header');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let target = 0;
  let current = 0;
  let ticking = false;
  let lastScrolled = false;

  const readScroll = () => {
    const root = document.documentElement;
    target = root.scrollTop / Math.max(root.scrollHeight - root.clientHeight, 1);
    target = Math.min(Math.max(target, 0), 1);

    const shouldScroll = window.scrollY > 8;
    if (siteHeader && shouldScroll !== lastScrolled) {
      siteHeader.classList.toggle('is-scrolled', shouldScroll);
      lastScrolled = shouldScroll;
    }
    ticking = false;
  };

  const tick = () => {
    const diff = target - current;
    current += diff * (reduceMotion ? 1 : 0.22);
    if (Math.abs(diff) < 0.0005) current = target;
    if (progressBar) progressBar.style.transform = `scaleX(${current})`;
    smoothRafId = requestAnimationFrame(tick);
  };

  onScroll = () => {
    if (ticking) return;
    ticking = true;
    rafId = requestAnimationFrame(readScroll);
  };

  document.addEventListener('scroll', onScroll, { passive: true });
  readScroll();
  smoothRafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (onScroll) document.removeEventListener('scroll', onScroll);
  if (rafId !== null) cancelAnimationFrame(rafId);
  if (smoothRafId !== null) cancelAnimationFrame(smoothRafId);
});
</script>

<template>
  <div>
    <div class="scroll_progress" aria-hidden="true"><span /></div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
