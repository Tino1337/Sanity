<script setup lang="ts">
defineProps<{
  page?: {
    title?: string
    pageBuilder?: Array<{_key: string; _type: string}> | null
  } | null
}>()
</script>

<template>
  <main v-if="page" class="flex flex-col gap-8">
    <SanityPageBuilder :blocks="page.pageBuilder" />
  </main>
</template>
