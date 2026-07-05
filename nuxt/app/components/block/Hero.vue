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
    <LayoutContainer class="hero">
      <ElemImage
        v-if="blockdata?.image?.asset?._ref"
        :asset-id="blockdata.image.asset._ref"
        :alt="blockdata.headline"
        class="hero__image"
        :width="1200"
        :height="600"
      />
      <div class="hero__content">
        <p v-if="blockdata?.eyebrow" class="eyebrow">
          {{ blockdata.eyebrow }}
        </p>
        <ElemHeading
          v-if="blockdata?.headline"
          :level="blockdata.headlineLevel"
          class="hero__headline"
        >
          {{ blockdata.headline }}
        </ElemHeading>
        <p v-if="blockdata?.text" class="hero__text">
          {{ blockdata.text }}
        </p>
      </div>
    </LayoutContainer>
  </LayoutSection>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: $space-6;
  text-align: center;

  &__image {
    aspect-ratio: 2 / 1;
    border-radius: $medium-radius;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__headline {
    font-size: $font-size-4xl;
    letter-spacing: -0.02em;
  }

  &__text {
    margin: 0;
    font-size: $font-size-lg;
    color: $color-text-muted;
  }
}
</style>
