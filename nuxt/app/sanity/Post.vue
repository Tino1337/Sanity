<script setup lang="ts">
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

defineProps<{
  post?: {
    title?: string
    publishedAt?: string
    image?: SanityImageSource
    body?: unknown
  } | null
}>()

const {projectId, dataset} = useSanity().client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({projectId, dataset}).image(source)
    : null
</script>

<template>
  <main v-if="post" class="post">
    <img
      v-if="post.image"
      :src="urlFor(post.image)?.width(550).height(310).url()"
      :alt="post.title"
      class="post__image"
      width="550"
      height="310"
    >
    <h1 v-if="post.title" class="post__title">
      {{ post.title }}
    </h1>
    <div class="prose">
      <p v-if="post.publishedAt" class="post__date">
        Published: {{ formatDate(post.publishedAt) }}
      </p>
      <SanityContent v-if="post.body" :value="post.body" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__image {
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: $small-radius;
    object-fit: cover;
  }

  &__title {
    margin: 0;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
  }

  &__date {
    margin: 0 0 $space-4;
    color: $color-text-muted;
  }
}
</style>
