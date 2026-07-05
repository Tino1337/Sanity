<script setup lang="ts">
import {HOME_SLUG, PAGE_QUERY} from '~/queries/page'

const {data: page} = await useSanityQuery(PAGE_QUERY, {slug: HOME_SLUG}, {
  key: 'page-home',
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `No home page found. Create a page with slug "${HOME_SLUG}" in Sanity Studio.`,
  })
}

useSeoMeta({
  title: page.value.seo?.metaTitle || page.value.title,
  description: page.value.seo?.metaDescription,
})
</script>

<template>
  <SanityPage :page="page" />
</template>
