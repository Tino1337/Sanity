<script setup lang="ts">
defineProps<{
  title?: string
  text?: string
  buttonLabel?: string
  buttonUrl?: string
}>()
</script>

<template>
  <section class="rounded-2xl bg-elevated p-8 text-center flex flex-col gap-4 items-center">
    <h2 v-if="title" class="text-2xl font-semibold">
      {{ title }}
    </h2>
    <p v-if="text" class="text-muted max-w-xl">
      {{ text }}
    </p>
    <a
      v-if="buttonLabel && buttonUrl"
      :href="buttonUrl"
      class="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-inverted hover:opacity-90"
    >
      {{ buttonLabel }}
    </a>
  </section>
</template>
