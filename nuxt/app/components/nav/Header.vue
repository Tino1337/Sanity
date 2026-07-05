<script setup lang="ts">
import {SITE_SETTINGS_QUERY} from '~/queries/site-settings'

const {data: settings} = await useSanityQuery(SITE_SETTINGS_QUERY, {}, {
  key: 'site-settings',
})
</script>

<template>
  <header class="border-b border-default">
    <LayoutContainer class="flex flex-wrap items-center justify-between gap-4 py-4">
      <NuxtLink to="/" class="flex items-center hover:opacity-80">
        <img
          v-if="settings?.logo?.asset?.url"
          :src="settings.logo.asset.url"
          :alt="settings?.siteName || 'Site'"
          class="h-8 w-auto"
        >
        <span v-else class="text-lg font-semibold">
          {{ settings?.siteName || 'Site' }}
        </span>
      </NuxtLink>

      <nav v-if="settings?.mainNavigation?.length" class="flex flex-wrap gap-4">
        <template v-for="(item, index) in settings.mainNavigation" :key="index">
          <a
            v-if="isExternalMenuLink(item)"
            :href="resolveMenuHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="text-sm hover:underline"
          >
            {{ item.label }}
          </a>
          <NuxtLink
            v-else
            :to="resolveMenuHref(item)"
            class="text-sm hover:underline"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>
    </LayoutContainer>
  </header>
</template>
