<script setup lang="ts">
const HOME_PAGE_QUERY = groq`*[_type == "page" && slug.current == "home"][0]{
  title,
  content[]{
    _key,
    _type,
    ...
  }
}`;

const { data: page } = await useSanityQuery<HOME_PAGE_QUERY_RESULT>(HOME_PAGE_QUERY);
</script>

<template>
  <main
    v-if="page"
    class="container mx-auto max-w-3xl p-8 flex flex-col gap-8"
  >
    <PageBuilder :blocks="page.content" />
  </main>
  <main v-else class="container mx-auto max-w-3xl p-8">
    <p class="text-muted">
      No home page found. Create a page with slug <strong>home</strong> in Sanity Studio.
    </p>
  </main>
</template>
