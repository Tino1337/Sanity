# Adding a New Block — Quick Guide

Replace `featureGrid` / `FeatureGrid` with your block name everywhere.

## 1. Create schema

`studio-testing-sanity/schemaTypes/blocks/featureGridType.ts`

```typescript
import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const featureGridType = defineType({
  name: 'featureGrid',
  title: 'Feature grid',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'heading', type: 'string'}),
    // your fields...
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Feature grid', subtitle: 'Feature grid'}
    },
  },
})
```

## 2. Register schema

`schemaTypes/index.ts` — import + add to array (with other blocks, before `pageBuilderType`):

```typescript
import {featureGridType} from './blocks/featureGridType'

export const schemaTypes = [
  // ...other blocks
  featureGridType,
  pageBuilderType,
  pageType,
  postType,
]
```

## 3. Allow in page builder

`schemaTypes/pageBuilderType.ts`:

```typescript
defineArrayMember({type: 'featureGrid'}),
```

Restart Studio → block should appear when adding content to a page.

## 4. Create Vue component

`nuxt-testing-sanity/app/components/blocks/FeatureGridBlock.vue`

Props must match your schema field names:

```vue
<script setup lang="ts">
defineProps<{ heading?: string }>()
</script>

<template>
  <section>
    <h2 v-if="heading">{{ heading }}</h2>
  </section>
</template>
```

**Field cheatsheet:** `string` → `{{ field }}` · `image` → `<SanityImage :asset-id="image.asset._ref" />` · rich text → `<SanityContent :value="body" />`

**Dynamic block?** Component fetches its own data via `useSanityQuery` (see `BlogPostsBlock.vue`).

## 5. Wire up PageBuilder

`app/components/PageBuilder.vue`:

```typescript
import FeatureGridBlock from '~/components/blocks/FeatureGridBlock.vue'

const blockComponents = {
  // ...
  featureGrid: FeatureGridBlock,
} as const
```

## 6. Test

1. Add block to a page in Studio → Publish
2. Refresh frontend (`/` for home, `/slug` for other pages)

---

## Checklist

```
[ ] blocks/myBlockType.ts
[ ] schemaTypes/index.ts
[ ] pageBuilderType.ts
[ ] components/blocks/MyBlock.vue
[ ] PageBuilder.vue
[ ] Test in Studio + browser
```

## Rules

- Schema `name` = `PageBuilder` key = GROQ `_type` (all camelCase)
- Don't touch `pageType.ts`, `index.vue`, or `[slug].vue`
- Always use `block._key` as Vue key (already handled in PageBuilder)

## Existing blocks

| `name` | Schema | Component |
|--------|--------|-----------|
| `hero` | `heroType.ts` | `HeroBlock.vue` |
| `textBlock` | `textBlockType.ts` | `TextBlock.vue` |
| `cta` | `ctaType.ts` | `CtaBlock.vue` |
| `blogPosts` | `blogPostsType.ts` | `BlogPostsBlock.vue` |
