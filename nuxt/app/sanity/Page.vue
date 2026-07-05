<script setup lang="ts">
defineProps<{
  page?: {
    title?: string
    pageBuilder?: Array<{_key: string; _type: string}> | null
  } | null
}>()
</script>

<template>
  <main v-if="page" class="page">
    <SanityPageBuilder :blocks="page.pageBuilder" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: $space-8;
}
</style>
