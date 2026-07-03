<script setup lang="ts">
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const route = useRoute();

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

const { data: post } = await useSanityQuery<POST_QUERY_RESULT>(
  POST_QUERY,
  route.params,
  { key: `post-${route.params.slug as string}` },
);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main
    v-if="post"
    class="container mx-auto max-w-3xl p-8 flex flex-col gap-4"
  >
    <img
      v-if="post.image"
      :src="urlFor(post.image)?.width(550).height(310).url()"
      :alt="post?.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    />
    <h1 v-if="post.title" class="text-4xl font-bold mb-8">{{ post.title }}</h1>
    <div class="prose">
      <p v-if="post.publishedAt">
        Published: {{ formatDate(post.publishedAt) }}
      </p>
      <SanityContent v-if="post.body" :value="post.body" />
    </div>
  </main>
</template>
