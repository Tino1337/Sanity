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
      class="text-image"
      :class="{'text-image--reverse': blockdata?.reverse}"
    >
      <div class="text-image__content">
        <p v-if="blockdata?.eyebrow" class="eyebrow">
          {{ blockdata.eyebrow }}
        </p>
        <ElemHeading
          v-if="blockdata?.headline"
          :level="blockdata.headlineLevel"
          class="text-image__headline"
        >
          {{ blockdata.headline }}
        </ElemHeading>
        <p v-if="blockdata?.text" class="text-image__text">
          {{ blockdata.text }}
        </p>
      </div>
      <ElemImage
        v-if="blockdata?.image?.asset?._ref"
        :asset-id="blockdata.image.asset._ref"
        :alt="blockdata.headline"
        class="text-image__image"
        :width="800"
        :height="600"
      />
    </LayoutContainer>
  </LayoutSection>
</template>

<style lang="scss" scoped>
.text-image {
  display: grid;
  align-items: center;
  gap: $space-8;

  @include minquery($screen-m) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  &--reverse {
    @include minquery($screen-m) {
      .text-image__content {
        order: 2;
      }

      .text-image__image {
        order: 1;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__headline {
    font-size: $font-size-3xl;
  }

  &__text {
    margin: 0;
    color: $color-text-muted;
    white-space: pre-line;
  }

  &__image {
    aspect-ratio: 4 / 3;
    border-radius: $medium-radius;
  }
}
</style>
