<template>
  <section class="section">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.section {
  padding-block: $space-8;

  @include minquery($screen-m) {
    padding-block: $space-12;
  }
}
</style>
