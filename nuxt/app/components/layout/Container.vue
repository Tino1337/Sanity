<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: $container-max;
  margin-inline: auto;
  padding: $space-8 $space-4;

  @include minquery($screen-m) {
    padding-inline: $space-8;
  }
}
</style>
