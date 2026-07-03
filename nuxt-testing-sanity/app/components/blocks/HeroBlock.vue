<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  image?: {
    asset?: {
      _ref?: string
    }
  }
}>()
</script>

<template>
  <section class="flex flex-col gap-6 text-center">
    <SanityImage
      v-if="image?.asset?._ref"
      :asset-id="image.asset._ref"
      :w="1200"
      :h="600"
      :alt="title"
      class="aspect-[2/1] w-full rounded-2xl object-cover"
    />
    <div class="flex flex-col gap-3">
      <h1 v-if="title" class="text-4xl font-bold tracking-tight">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-lg text-muted">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
