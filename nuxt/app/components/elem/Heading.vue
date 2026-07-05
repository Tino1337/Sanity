<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    level?: string
  }>(),
  {level: 'h2'},
)

const tag = computed(() => {
  const allowed = ['h1', 'h2', 'h3', 'h4'] as const
  return allowed.includes(props.level as typeof allowed[number])
    ? props.level
    : 'h2'
})
</script>

<template>
  <component :is="tag" class="heading">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.heading {
  margin: 0;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}
</style>
