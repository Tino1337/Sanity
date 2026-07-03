<script setup lang="ts">
type TextBlockBody = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
  { _type: "textBlock" }
>["body"];

defineProps<{
  heading?: string
  body?: TextBlockBody
}>()
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 v-if="heading" class="text-2xl font-semibold">
      {{ heading }}
    </h2>
    <div v-if="body" class="prose max-w-none">
      <SanityContent :value="body" />
    </div>
  </section>
</template>
