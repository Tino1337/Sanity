<script setup lang="ts">
defineProps<{
  blockdata?: {
    eyebrow?: string
    headline?: string
    headlineLevel?: string
    body?: unknown
  }
}>()
</script>

<template>
  <LayoutSection>
    <LayoutContainer class="flex flex-col gap-4">
      <p v-if="blockdata?.eyebrow" class="text-sm uppercase tracking-wide text-muted">
        {{ blockdata.eyebrow }}
      </p>
      <ElemHeading
        v-if="blockdata?.headline"
        :level="blockdata.headlineLevel"
        class="text-3xl font-bold"
      >
        {{ blockdata.headline }}
      </ElemHeading>
      <div v-if="blockdata?.body" class="prose max-w-none">
        <SanityContent :value="blockdata.body" />
      </div>
    </LayoutContainer>
  </LayoutSection>
</template>
