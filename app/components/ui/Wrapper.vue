<script setup lang="ts">
type UiWrapperSize = 'narrow' | 'default' | 'wide' | 'fluid';

withDefaults(
  defineProps<{
    size?: UiWrapperSize;
    tag?: string;
  }>(),
  {
    size: 'default',
    tag: 'div',
  }
);
</script>

<template>
  <component :is="tag" class="ui-wrapper" :data-size="size">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.ui-wrapper {
  width: 100%;
  margin-inline: auto;

  &[data-size='narrow']  { max-width: 880px; }
  &[data-size='default'] { max-width: 1200px; }
  &[data-size='wide']    { max-width: 1440px; }
  &[data-size='fluid']   { max-width: none; }
}
</style>
