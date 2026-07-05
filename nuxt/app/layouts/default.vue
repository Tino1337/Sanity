<template>
  <div class="layout">
    <NavHeader />
    <main class="layout__main">
      <slot />
    </main>
    <NavFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  &__main {
    flex: 1;
  }
}
</style>
