<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="error_page">
    <UiWrapper size="narrow">
      <div class="error_con">
        <p class="error_code">{{ error?.statusCode || 404 }}</p>
        <h1>{{ error?.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1>
        <p class="error_msg">
          {{
            error?.statusCode === 404
              ? "The page you're looking for doesn't exist or may have moved."
              : 'An unexpected error occurred. Please try again in a moment.'
          }}
        </p>
        <button class="button button_primary" type="button" @click="handleError">
          <span>Back to home</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </UiWrapper>
  </div>
</template>

<style scoped lang="scss">
.error_page {
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: 64px var(--gutter);
  background: var(--paper);
  color: var(--ink);
}

.error_con {
  text-align: center;
}

.error_code {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(4rem, 14vw, 8rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, var(--teal), var(--coral) 70%, var(--sun));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.error_msg {
  max-width: 46ch;
  margin: 0 auto 28px;
  color: var(--muted);
  font-size: 1.05rem;
}

.error_con .button {
  margin-inline: auto;
}
</style>
