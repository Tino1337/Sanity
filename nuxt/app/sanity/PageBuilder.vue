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
  <div v-if="blocks?.length" class="page-builder">
    <component
      :is="resolveBlockComponent(block._type)"
      v-for="block in blocks"
      :key="block._key"
      :block="block"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-builder {
  display: flex;
  flex-direction: column;
  gap: $space-16;
}
</style>
