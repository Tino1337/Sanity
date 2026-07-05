# Sanity + Nuxt Starter Template Prompt

Copy everything inside the fenced block below and paste it into your agent to scaffold a new project.

---

## Agent Prompt

````
You are scaffolding a reusable Sanity CMS + Nuxt 4 starter template. The goal is a clean, opinionated project structure that can be copied for future client projects — not a one-off site. Follow the patterns below exactly.

This architecture is inspired by proven headless CMS + Nuxt setups that separate CMS schemas from the frontend and use a three-layer component model. Adapt block types, document types, and field labels to each project — the folder structure and patterns stay the same.

---

## Core Principle: Three-Layer Rendering

Every CMS-driven UI follows three layers. Never mix them.

1. **CMS adapter layer** (`nuxt/app/sanity/*.vue`)
   - Receives raw Sanity block/document data
   - Transforms it into a normalized shape for the UI
   - Wires visual editing attributes
   - Must NOT contain layout or styling

2. **Presentation layer** (`nuxt/app/components/block/*.vue`)
   - CMS-agnostic section components
   - Receives a normalized `blockdata` prop
   - Handles layout, spacing, responsive behavior

3. **Atomic layer** (`nuxt/app/components/elem/*.vue`)
   - Reusable UI primitives: buttons, images, headlines, links, form fields

Example adapter (thin wrapper):

```vue
<template>
  <div class="sanity-block" :data-sanity="block._key">
    <block-hero :blockdata="sanitizedBlock" />
  </div>
</template>

<script setup>
const props = defineProps({ block: Object })

const sanitizedBlock = computed(() => ({
  ...props.block,
  headline: extractHeadline(props.block.headline),
  imageUrl: buildImageUrl(props.block.image),
}))
</script>
```

Presentation components use Nuxt auto-import prefixes: `block-*`, `elem-*`, `nav-*`, `layout-*`.

---

## Monorepo Layout

Use a monorepo with a standalone Sanity Studio and a Nuxt frontend side by side:

```
project-root/
├── studio/                              # Sanity Studio (schema-as-code)
│   ├── schemaTypes/
│   │   ├── index.ts                     # exports all schema types
│   │   ├── documents/                   # top-level content types
│   │   │   ├── page.ts
│   │   │   ├── post.ts                 # optional — remove if not needed
│   │   │   └── siteSettings.ts         # singleton global config
│   │   ├── blocks/                      # page builder block objects
│   │   │   ├── hero.ts
│   │   │   ├── richText.ts
│   │   │   ├── textImage.ts
│   │   │   └── ...                      # add project-specific blocks here
│   │   ├── objects/                     # embeddable nested objects (not in pageBuilder)
│   │   │   ├── link.ts
│   │   │   ├── button.ts
│   │   │   ├── seo.ts
│   │   │   ├── menuLink.ts
│   │   │   └── ...                      # add nested/reusable objects here
│   │   └── shared/                      # reusable field factories
│   │       ├── defaultBlockSettings.ts
│   │       ├── headlineFields.ts
│   │       ├── pageBuilderType.ts
│   │       └── linkField.ts
│   ├── structure/
│   │   └── index.ts                     # desk structure, singletons
│   ├── sanity.config.ts
│   ├── sanity.cli.ts                    # TypeGen → ../nuxt/sanity.types.ts
│   └── package.json
├── nuxt/                                # Nuxt 4 frontend
│   ├── app/
│   │   ├── sanity/                      # CMS adapter layer
│   │   │   ├── PageBuilder.vue          # block renderer (replaces CMS auto-component resolution)
│   │   │   ├── Page.vue                 # document adapters
│   │   │   ├── Hero.vue                 # one adapter per block type
│   │   │   ├── RichText.vue
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── block/                   # presentation layer — CMS-agnostic
│   │   │   ├── elem/                    # atomic UI
│   │   │   ├── nav/                     # Header, Footer
│   │   │   └── layout/                  # Container, Section
│   │   ├── pages/
│   │   │   └── [...slug].vue            # catch-all CMS routing
│   │   ├── layouts/
│   │   │   └── default.vue              # fetches siteSettings singleton
│   │   ├── middleware/
│   │   ├── helpers/
│   │   │   ├── sanity.ts                # portable text, image, link helpers
│   │   │   └── utils.ts                 # CMS-agnostic utilities
│   │   ├── queries/                     # GROQ queries (defineQuery)
│   │   │   ├── page.ts
│   │   │   ├── siteSettings.ts
│   │   │   └── fragments/               # reusable GROQ projections
│   │   └── stores/
│   ├── server/api/                      # server routes that query Sanity
│   ├── sanity.types.ts                  # TypeGen output (generated, do not edit)
│   └── nuxt.config.js
└── package.json                         # optional root scripts: dev:all, build:all
```

### Why monorepo?

- TypeGen can watch queries in `nuxt/` and generate types from schemas in `studio/`
- Studio stays standalone (fast dev, independent deploys)
- Schema and frontend live in one repo but remain decoupled

---

## Schema Organization Rules

### Directory responsibilities

| Folder | Purpose | Sanity type | In pageBuilder? |
|--------|---------|-------------|-----------------|
| `documents/` | Standalone content editors create | `document` | — |
| `blocks/` | Page builder sections | `object` | Yes |
| `objects/` | Nested/reusable embeddables | `object` | No |
| `shared/` | Field factories, array definitions | — | — |

### When to use what

- **Document** — has its own URL, appears in desk nav (page, post, person, form, etc.)
- **Block** — composes a page via the page builder array (hero, FAQ, gallery, etc.)
- **Object** — nested inside a block or document (button, link, menu item, card, form field)
- **Reference** — content reused across pages and centrally managed (author, category, global CTA)

**Default rule:** page builder blocks are inline objects. Use references only when content must be shared or centrally managed.

### Naming conventions

- Sanity `_type` names: **camelCase** (`richText`, `textImage`, `siteSettings`)
- Studio schema files: **kebab-case.ts** (`rich-text.ts`, `text-image.ts`)
- Nuxt adapter files: **PascalCase.vue** matching the block name (`RichText.vue`)
- Block presenters: **PascalCase.vue** in `components/block/`

---

## Shared Field Factories (`schemaTypes/shared/`)

Create reusable field factories instead of duplicating fields across blocks. Every new block should compose from these.

### defaultBlockSettings.ts

Fields every page builder block should include (in a `design` group):

```typescript
import { defineField } from 'sanity'

export const defaultBlockSettings = [
  defineField({
    name: 'isHidden',
    title: 'Hide block',
    type: 'boolean',
    group: 'design',
    initialValue: false,
  }),
  defineField({
    name: 'htmlId',
    title: 'HTML ID',
    type: 'string',
    group: 'design',
  }),
  defineField({
    name: 'spacing',
    title: 'Spacing',
    type: 'string',
    group: 'design',
    options: { list: ['normal', 'small', 'none'] },
    initialValue: 'normal',
  }),
]
```

### headlineFields.ts

Factory for common headline patterns:

```typescript
export function headlineFields(options?: { group?: string }) {
  return [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: options?.group }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: options?.group }),
    defineField({
      name: 'headlineLevel',
      title: 'Heading level',
      type: 'string',
      group: options?.group,
      options: { list: ['h1', 'h2', 'h3', 'h4'] },
      initialValue: 'h2',
    }),
  ]
}
```

### pageBuilderType.ts

Central array definition — add new blocks here when you create them:

```typescript
import { defineType, defineArrayMember } from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page content',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'richText' }),
    defineArrayMember({ type: 'textImage' }),
    // Add new block types here as the project grows
  ],
  options: {
    insertMenu: {
      views: [
        { name: 'grid', previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png` },
      ],
    },
  },
})
```

### linkField.ts / seo.ts

Extract common patterns into shared objects:
- **link** — internal reference OR external URL OR email
- **seo** — metaTitle, metaDescription, ogImage, noIndex

---

## Document Schemas

### page.ts (template for all page-like documents)

```typescript
import { defineType, defineField } from 'sanity'
import { pageBuilderType } from '../shared/pageBuilderType'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'pageBuilder', type: 'pageBuilder', group: 'content' }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
})
```

Other document types (post, person, landingPage, etc.) follow the same pattern. Share common fields via factory functions in `shared/`.

### siteSettings.ts (singleton)

Global site config — header, footer, logo, 404 page, default SEO:

```typescript
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string' }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'mainNavigation', type: 'array', of: [{ type: 'menuLink' }] }),
    defineField({ name: 'footerNavigation', type: 'array', of: [{ type: 'menuLink' }] }),
    defineField({ name: 'notFoundPage', type: 'reference', to: [{ type: 'page' }] }),
    defineField({ name: 'defaultSeo', type: 'seo' }),
  ],
})
```

Register as singleton in desk structure with fixed `_id: 'siteSettings'`.

---

## Block Schema Template

Every block in `schemaTypes/blocks/` follows this pattern:

```typescript
import { defineType, defineField } from 'sanity'
import { defaultBlockSettings } from '../shared/defaultBlockSettings'
import { headlineFields } from '../shared/headlineFields'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'design', title: 'Design' },
  ],
  fields: [
    ...headlineFields({ group: 'content' }),
    defineField({ name: 'text', title: 'Text', type: 'text', group: 'content' }),
    defineField({ name: 'image', title: 'Image', type: 'image', group: 'content' }),
    defineField({ name: 'cta', title: 'Call to action', type: 'button', group: 'content' }),
    ...defaultBlockSettings,
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare: ({ title, media }) => ({
      title: title || 'Hero',
      subtitle: 'Hero',
      media,
    }),
  },
})
```

### Adding a new block (repeatable workflow)

1. Create `studio/schemaTypes/blocks/myBlock.ts` using the template above
2. Register it in `schemaTypes/index.ts`
3. Add `defineArrayMember({ type: 'myBlock' })` to `pageBuilderType.ts`
4. Create `nuxt/app/sanity/MyBlock.vue` adapter
5. Create `nuxt/app/components/block/MyBlock.vue` presenter
6. Register in `PageBuilder.vue` component map
7. Extend GROQ query if the block has references to dereference
8. Add a preview image at `studio/static/block-previews/myBlock.png`
9. Run TypeGen

---

## Object Schemas (Nested / Reusable)

Objects in `schemaTypes/objects/` are NOT added to the pageBuilder `of` list. They are embedded inside blocks or documents:

- **button** — label + link object
- **link** — internal page reference OR external URL
- **menuLink** — label, link, optional children array
- **card** — image, title, text, link
- **formField** — name, label, type, required

Nested objects render inline inside block presenters — they do NOT get their own adapter components:

```vue
<!-- inside block/Accordion.vue -->
<template v-for="item in blockdata.items" :key="item._key">
  <elem-link v-if="item._type === 'link'" :href="resolveLink(item.link)" :label="item.label" />
  <div v-else-if="item._type === 'textItem'" v-html="item.text" />
</template>
```

Use `item._type` to switch on nested object type.

---

## Studio Desk Structure

```typescript
import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // Document types — add/remove per project
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('post').title('Posts'),

      S.divider(),

      // Filter singletons from "All documents"
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings'].includes(item.getId() || '')
      ),
    ])
```

Configure Presentation Tool for visual editing with frontend route mappings.

---

## Nuxt Integration

### Module setup

```javascript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxtjs/i18n',       // optional
    '@pinia/nuxt',         // optional
    '@nuxtjs/robots',      // optional
    '@nuxtjs/sitemap',     // optional
  ],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: '2026-05-15',
    visualEditing: {
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      stega: true,
      mode: 'live-visual-editing',
    },
  },
})
```

Required env vars:
- `NUXT_SANITY_PROJECT_ID`
- `NUXT_SANITY_DATASET`
- `NUXT_SANITY_API_READ_TOKEN` (draft preview)
- `NUXT_SANITY_STUDIO_URL`

### GROQ queries (`app/queries/`)

Use `defineQuery` for TypeGen compatibility. Keep reusable projections in `queries/fragments/`.

**page.ts:**

```typescript
import { defineQuery } from 'groq'

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    seo,
    pageBuilder[]{
      ...,
      _type == "referenceBlock" => {
        ...,
        referencedContent->
      }
    }
  }
`)
```

Use conditional projections (`_type == "x" => { ... }`) to dereference only where needed.

**siteSettings.ts:**

```typescript
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo,
    mainNavigation[]{ ..., children[]{ ... } },
    footerNavigation[]{ ... },
    notFoundPage->{ _id, title, slug },
    defaultSeo
  }
`)
```

### PageBuilder component

Central block renderer — maps `_type` to adapter component:

```vue
<template>
  <component
    v-for="block in blocks"
    :key="block._key"
    :is="resolveBlockComponent(block._type)"
    :block="block"
  />
</template>

<script setup>
defineProps({ blocks: { type: Array, default: () => [] } })

const blockComponents = {
  hero: resolveComponent('SanityHero'),
  richText: resolveComponent('SanityRichText'),
  textImage: resolveComponent('SanityTextImage'),
  // Register new blocks here
}

function resolveBlockComponent(type) {
  return blockComponents[type] ?? resolveComponent('SanityUnknownBlock')
}
</script>
```

Consider extracting the map to a separate `blockRegistry.ts` as the project grows.

### Catch-all routing

```vue
<script setup>
definePageMeta({ middleware: ['redirects'] })

const slug = useRoute().params.slug
const slugPath = slug?.length ? slug.join('/') : 'home'

const { data: page } = await useSanityQuery(PAGE_QUERY, { slug: slugPath })

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: page.value.seo?.metaTitle || page.value.title,
  description: page.value.seo?.metaDescription,
})
</script>

<template>
  <SanityPage :block="page" />
</template>
```

Support multiple document types in the query or use separate queries per type if routing differs.

### Layout

Fetch `siteSettings` singleton once in `layouts/default.vue`:

```javascript
const { data: siteSettings } = await useSanityQuery(SITE_SETTINGS_QUERY)
```

Pass to nav components. This replaces any global "site config" pattern from other CMS setups.

### Helpers (`helpers/sanity.ts`)

```typescript
export function extractHeadline(field: unknown): string { /* ... */ }
export function buildImageUrl(image: unknown, options?: ImageOptions): string { /* ... */ }
export function resolveLink(link: LinkObject): { href: string; isExternal: boolean } { /* ... */ }
export function getDocumentTitle(doc: { title?: string }): string { /* ... */ }
```

### Server API routes

For queries that should not run client-side (search, filtered lists, forms):

```javascript
// server/api/search.get.js
import { createClient } from '@sanity/client'
import { SEARCH_QUERY } from '~/queries/search'

export default defineEventHandler(async (event) => {
  const { term } = getQuery(event)
  const client = createClient({ /* ... */ })
  return client.fetch(SEARCH_QUERY, { term })
})
```

---

## CMS Concept Mapping (for migrations from other headless CMS)

If migrating from Storyblok, Contentful, or similar:

| Source CMS pattern | Sanity equivalent |
|---|---|
| Schema-as-code folder (e.g. `storyblok/`) | `studio/schemaTypes/` |
| Content types / components | `documents/`, `blocks/`, `objects/` |
| Schema push script | `sanity schema deploy` + TypeGen |
| Bloks / modules array on pages | `pageBuilder` array field |
| Global settings singleton story | `siteSettings` document with fixed `_id` |
| Component name (kebab-case) | `_type` (camelCase) |
| `_uid` / entry ID | `_key` on array items |
| Auto component resolver | `PageBuilder.vue` with type → component map |
| `useAsyncStoryblok` / SDK fetch | `useSanityQuery` |
| Relation resolution | GROQ dereferencing (`->`, `[]->`) |
| Rich text renderer | `<SanityContent :value="..." />` |
| Visual editor bridge | Sanity Presentation Tool + Visual Editing |
| CMS adapter folder | `app/sanity/` |
| Presentation components | `app/components/block/` (unchanged) |

---

## TypeGen Workflow

In `studio/sanity.cli.ts`:

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  typegen: {
    path: '../nuxt/app/queries/**/*.{ts,js}',
    schema: 'schema.json',
    generates: '../nuxt/sanity.types.ts',
  },
})
```

Run after schema or query changes:

```bash
cd studio && npx sanity schema extract && npx sanity typegen generate
```

Use generated types in adapters and presenters for end-to-end type safety.

---

## Visual Editing

Configure in `sanity.config.ts`:

- Presentation Tool with frontend origin (e.g. `http://localhost:3000`)
- Route mappings per document type:
  - `page` → `/{slug.current}`
  - `post` → `/blog/{slug.current}` (adjust per project)
  - `siteSettings` → `/`

Enable in Nuxt via `@nuxtjs/sanity` `visualEditing` config.

---

## Starter Block Set (minimal — extend per project)

Ship the template with a small default set. Add more blocks as each project requires.

| Block | Purpose |
|-------|---------|
| `hero` | Full-width hero with headline, text, image, CTA |
| `richText` | Portable text content section |
| `textImage` | Two-column text + image (with reverse option) |

Suggested objects to include from the start:

| Object | Purpose |
|--------|---------|
| `link` | Internal/external link |
| `button` | CTA button with link |
| `seo` | SEO metadata |
| `menuLink` | Navigation item with optional children |

Everything else (accordion, gallery, testimonials, forms, maps, news feeds, team grids, etc.) gets added per project using the "Adding a new block" workflow above.

---

## What Stays CMS-Agnostic

These layers should never import Sanity-specific code:

- `app/components/block/*` — presentation components
- `app/components/elem/*` — atomic UI
- `app/components/layout/*` — layout wrappers
- `app/assets/scss/*` — styles
- `app/middleware/*` — routing middleware
- Form submission logic, email sending, third-party integrations

Only the adapter layer (`app/sanity/`), queries, helpers, and layout data fetching are CMS-specific.

---

## Implementation Order

1. Scaffold monorepo: `npx sanity init` in `studio/`, `npm create nuxt@latest` in `nuxt/`
2. Create shared field factories in `studio/schemaTypes/shared/`
3. Create object schemas in `studio/schemaTypes/objects/`
4. Create starter block schemas in `studio/schemaTypes/blocks/`
5. Create document schemas in `studio/schemaTypes/documents/`
6. Configure desk structure + singletons
7. Install and configure `@nuxtjs/sanity`
8. Write GROQ queries + fragments
9. Create `PageBuilder.vue` + document adapters
10. Create starter block adapters + presentation components
11. Wire catch-all page + default layout
12. Set up TypeGen
13. Configure Visual Editing
14. Add root `package.json` scripts to run both dev servers

---

## Constraints

- Nuxt 4 with `app/` directory
- `@nuxtjs/sanity` module (not raw client in components)
- `defineQuery` for all GROQ queries
- `defineType` / `defineField` for all schemas
- Standalone Studio — do NOT embed Studio inside Nuxt
- Three-layer separation — no styling in adapters, no Sanity imports in presenters
- camelCase `_type` names
- Inline objects for page builder blocks; references only when content is shared
- Fixed `_id` only for singletons; let Sanity generate IDs for everything else
- Keep the template minimal — project-specific blocks get added, not baked in

Start by scaffolding the monorepo folder structure, then shared factories, then the three starter blocks, then documents, then the Nuxt integration layer.
````
