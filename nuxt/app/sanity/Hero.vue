<script setup lang="ts">
const props = defineProps<{
  block: Record<string, unknown> & {_key: string; _type: string}
}>()

const sanitizedBlock = computed(() => ({
  ...props.block,
  headline: (props.block.headline ?? props.block.title) as string | undefined,
  text: (props.block.text ?? props.block.subtitle) as string | undefined,
}))
</script>

<template>
  <div class="sanity-block" :data-sanity="block._key">
    <BlockHero :blockdata="sanitizedBlock" />
  </div>
</template>
