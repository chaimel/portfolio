<template>
  <div class="site">
    <a class="skip_link" href="#top">Skip to content</a>
    <LayoutHeader />
    <main id="top" tabindex="-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
