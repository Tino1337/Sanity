<script setup lang="ts">
defineProps<{
  blockdata?: {
    eyebrow?: string
    headline?: string
    headlineLevel?: string
    text?: string
    reverse?: boolean
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
    <LayoutContainer
      class="grid items-center gap-8 md:grid-cols-2"
      :class="blockdata?.reverse ? 'md:[&>*:first-child]:order-2' : ''"
    >
      <div class="flex flex-col gap-4">
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
        <p v-if="blockdata?.text" class="text-muted whitespace-pre-line">
          {{ blockdata.text }}
        </p>
      </div>
      <ElemImage
        v-if="blockdata?.image?.asset?._ref"
        :asset-id="blockdata.image.asset._ref"
        :alt="blockdata.headline"
        class="aspect-[4/3] w-full rounded-2xl object-cover"
        :width="800"
        :height="600"
      />
    </LayoutContainer>
  </LayoutSection>
</template>
