<script setup lang="ts">
defineProps<{
  blockdata?: {
    eyebrow?: string
    headline?: string
    headlineLevel?: string
    text?: string
    image?: {
      asset?: {
        _ref?: string
      }
    }
  }
}>()
</script>

<template>
  <LayoutSection>
    <LayoutContainer class="flex flex-col gap-6 text-center">
      <ElemImage
        v-if="blockdata?.image?.asset?._ref"
        :asset-id="blockdata.image.asset._ref"
        :alt="blockdata.headline"
        class="aspect-[2/1] w-full rounded-2xl object-cover"
        :width="1200"
        :height="600"
      />
      <div class="flex flex-col gap-3">
        <p v-if="blockdata?.eyebrow" class="text-sm uppercase tracking-wide text-muted">
          {{ blockdata.eyebrow }}
        </p>
        <ElemHeading
          v-if="blockdata?.headline"
          :level="blockdata.headlineLevel"
          class="text-4xl font-bold tracking-tight"
        >
          {{ blockdata.headline }}
        </ElemHeading>
        <p v-if="blockdata?.text" class="text-lg text-muted">
          {{ blockdata.text }}
        </p>
      </div>
    </LayoutContainer>
  </LayoutSection>
</template>
