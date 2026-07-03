<script setup lang="ts">
const props = defineProps<{
  heading?: string
  limit?: number
}>()

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`

const { data: posts } = await useSanityQuery<POSTS_QUERY_RESULT>(
  POSTS_QUERY,
  { limit: props.limit ?? 6 },
)
</script>

<template>
  <section class="flex flex-col gap-6">
    <h2 v-if="heading" class="text-2xl font-semibold">
      {{ heading }}
    </h2>
    <ul v-if="posts?.length" class="flex flex-col gap-y-4">
      <li v-for="post in posts" :key="post._id">
        <nuxt-link
          :to="`/posts/${post.slug.current}`"
          :prefetch="false"
          class="flex gap-4 rounded-xl border border-default p-4 hover:bg-elevated"
        >
          <SanityImage
            v-if="post.image?.asset?._ref"
            :asset-id="post.image.asset._ref"
            :w="160"
            :h="90"
            :alt="post.title"
            class="aspect-video w-40 shrink-0 rounded-lg object-cover"
          />
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-semibold">{{ post.title }}</h3>
            <p class="text-sm text-muted">
              {{ formatDate(post.publishedAt) }}
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <p v-else class="text-muted">No posts published yet.</p>
  </section>
</template>
