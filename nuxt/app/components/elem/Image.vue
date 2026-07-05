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
    class="image"
    :asset-id="assetId"
    :w="width ?? 1200"
    :h="height ?? 800"
    :alt="cleanStega(alt)"
  />
</template>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
