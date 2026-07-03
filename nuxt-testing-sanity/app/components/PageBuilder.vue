<script setup lang="ts">
import BlogPostsBlock from "~/components/blocks/BlogPostsBlock.vue"
import CtaBlock from "~/components/blocks/CtaBlock.vue"
import HeroBlock from "~/components/blocks/HeroBlock.vue"
import TextBlock from "~/components/blocks/TextBlock.vue"

type PageBlock = {
  _key: string
  _type: string
}

defineProps<{
  blocks?: PageBlock[] | null
}>()

const blockComponents = {
  hero: HeroBlock,
  textBlock: TextBlock,
  cta: CtaBlock,
  blogPosts: BlogPostsBlock,
} as const
</script>

<template>
  <div v-if="blocks?.length" class="flex flex-col gap-16">
    <component
      :is="blockComponents[block._type as keyof typeof blockComponents]"
      v-for="block in blocks"
      :key="block._key"
      v-bind="block"
    />
  </div>
</template>
