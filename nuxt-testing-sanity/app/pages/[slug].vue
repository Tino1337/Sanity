<script setup lang="ts">
const route = useRoute();

const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  content[]{
    _key,
    _type,
    ...
  }
}`;

if (route.params.slug === "home") {
  await navigateTo("/", { redirectCode: 301 });
}

const { data: page } = await useSanityQuery<PAGE_QUERY_RESULT>(
  PAGE_QUERY,
  route.params,
  { key: `page-${route.params.slug as string}` },
);
</script>

<template>
  <main
    v-if="page"
    class="container mx-auto max-w-3xl p-8 flex flex-col gap-8"
  >
    <PageBuilder :blocks="page.content" />
  </main>
</template>
