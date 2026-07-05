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
    <LayoutContainer class="rich-text">
      <p v-if="blockdata?.eyebrow" class="eyebrow">
        {{ blockdata.eyebrow }}
      </p>
      <ElemHeading
        v-if="blockdata?.headline"
        :level="blockdata.headlineLevel"
        class="rich-text__headline"
      >
        {{ blockdata.headline }}
      </ElemHeading>
      <div v-if="blockdata?.body" class="prose">
        <SanityContent :value="blockdata.body" />
      </div>
    </LayoutContainer>
  </LayoutSection>
</template>

<style lang="scss" scoped>
.rich-text {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__headline {
    font-size: $font-size-3xl;
  }
}
</style>
