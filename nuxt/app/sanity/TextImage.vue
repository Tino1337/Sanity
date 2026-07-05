<script setup lang="ts">
defineProps<{
  block: Record<string, unknown> & {_key: string; _type: string}
}>()
</script>

<template>
  <div class="sanity-block" :data-sanity="block._key">
    <BlockTextImage :blockdata="block" />
  </div>
</template>
