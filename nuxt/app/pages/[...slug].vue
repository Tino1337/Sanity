<script setup lang="ts">
import {POST_QUERY} from '~/queries/post'
import {HOME_SLUG, PAGE_QUERY} from '~/queries/page'

const route = useRoute()
const slugParam = route.params.slug
const slugParts = Array.isArray(slugParam) ? slugParam : slugParam ? [slugParam] : []

const isPostRoute = slugParts[0] === 'posts' && slugParts.length === 2
const pageSlug = slugParts.join('/')

if (!isPostRoute && pageSlug === HOME_SLUG) {
  await navigateTo('/', {redirectCode: 301})
}

const postResult = isPostRoute
  ? await useSanityQuery(POST_QUERY, {slug: slugParts[1]!}, {key: `post-${slugParts[1]}`})
  : null

const pageResult = !isPostRoute
  ? await useSanityQuery(PAGE_QUERY, {slug: pageSlug}, {key: `page-${pageSlug}`})
  : null

const post = postResult?.data
const page = pageResult?.data

if (isPostRoute) {
  if (!post?.value) {
    throw createError({statusCode: 404, statusMessage: 'Post not found'})
  }

  useSeoMeta({
    title: post.value.seo?.metaTitle || post.value.title,
    description: post.value.seo?.metaDescription,
  })
} else if (!page?.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found'})
} else {
  useSeoMeta({
    title: page.value.seo?.metaTitle || page.value.title,
    description: page.value.seo?.metaDescription,
  })
}
</script>

<template>
  <SanityPost v-if="isPostRoute" :post="post" />
  <SanityPage v-else :page="page" />
</template>
