<script setup lang="ts">
defineProps<{
  assetId: string
  alt?: string
  width?: number
  height?: number
}>()
</script>

<template>
  <SanityImage
    :asset-id="assetId"
    :w="width ?? 1200"
    :h="height ?? 800"
    :alt="alt"
  />
</template>
