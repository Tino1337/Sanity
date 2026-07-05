<script setup lang="ts">
import {SITE_SETTINGS_QUERY} from '~/queries/site-settings'

const {data: settings} = await useSanityQuery(SITE_SETTINGS_QUERY, {}, {
  key: 'site-settings',
})
</script>

<template>
  <footer class="mt-auto border-t border-default">
    <LayoutContainer class="flex flex-col gap-4 py-8 text-sm text-muted">
      <nav v-if="settings?.footerNavigation?.length" class="flex flex-wrap gap-4">
        <template v-for="(item, index) in settings.footerNavigation" :key="index">
          <a
            v-if="isExternalMenuLink(item)"
            :href="resolveMenuHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="hover:underline"
          >
            {{ item.label }}
          </a>
          <NuxtLink
            v-else
            :to="resolveMenuHref(item)"
            class="hover:underline"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <p v-if="settings?.copyright">
        {{ settings.copyright }}
      </p>
    </LayoutContainer>
  </footer>
</template>
