<script setup lang="ts">
type PageBlock = {
  _key: string
  _type: string
}

defineProps<{
  blocks?: PageBlock[] | null
}>()

const blockComponents: Record<string, ReturnType<typeof resolveComponent>> = {
  hero: resolveComponent('SanityHero'),
  richText: resolveComponent('SanityRichText'),
  textImage: resolveComponent('SanityTextImage'),
}

function resolveBlockComponent(type: string) {
  return blockComponents[type] ?? resolveComponent('SanityUnknownBlock')
}
</script>

<template>
  <div v-if="blocks?.length" class="flex flex-col gap-16">
    <component
      :is="resolveBlockComponent(block._type)"
      v-for="block in blocks"
      :key="block._key"
      :block="block"
    />
  </div>
</template>
