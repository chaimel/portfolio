<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const open = ref(false);
const toggle = ref<HTMLButtonElement | null>(null);

const toggleMenu = () => {
  open.value = !open.value;
};

const closeMenu = () => {
  open.value = false;
};

// Esc closes the open menu and returns focus to the toggle button.
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && open.value) {
    closeMenu();
    toggle.value?.focus();
  }
};

// Reset the menu if the viewport widens past the mobile breakpoint while it's open,
// so the toggle's aria-expanded / hamburger state can't get stuck on desktop.
let desktopMq: MediaQueryList | null = null;
const onDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
  if (event.matches) closeMenu();
};

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  desktopMq = window.matchMedia('(min-width: 921px)');
  desktopMq.addEventListener('change', onDesktop);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  desktopMq?.removeEventListener('change', onDesktop);
});
</script>

<template>
  <header class="site_header" :class="{ 'is-open': open }">
    <UiWrapper>
      <div class="header_con">
        <a class="brand" href="#top" aria-label="Chaimel Enjambre home">
          <span class="brand_mark">CE</span>
          <span class="brand_name">Chaimel Enjambre</span>
        </a>
        <nav id="primary-nav" class="page_nav" aria-label="Primary navigation">
          <a href="#projects" @click="closeMenu">Projects</a>
          <a href="#experience" @click="closeMenu">Experience</a>
          <a href="#skills" @click="closeMenu">Skills</a>
          <a href="#contactus" @click="closeMenu">Contact</a>
          <a
            class="nav_cta"
            href="/Chaimel-Enjambre-Resume.pdf"
            target="_blank"
            rel="noopener"
            @click="closeMenu"
          >
            Résumé
          </a>
        </nav>
        <button
          ref="toggle"
          class="nav_toggle"
          type="button"
          aria-controls="primary-nav"
          :aria-expanded="open"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </UiWrapper>
  </header>
</template>
