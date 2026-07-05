<script setup lang="ts">
const { data: settings } = await useSiteSettings();
</script>

<template>
  <header class="border-b border-default">
    <div
      class="container mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 p-4"
    >
      <NuxtLink to="/" class="flex items-center hover:opacity-80">
        <img
          v-if="settings?.siteLogo?.asset?.url"
          :src="settings.siteLogo.asset.url"
          :alt="settings?.siteName || 'Site'"
          class="h-8 w-auto"
        >
        <span v-else class="text-lg font-semibold">
          {{ settings?.siteName || "Site" }}
        </span>
      </NuxtLink>

      <nav v-if="settings?.mainMenu?.length" class="flex flex-wrap gap-4">
        <template v-for="(item, index) in settings.mainMenu" :key="index">
          <a
            v-if="isExternalNavigationItem(item)"
            :href="getNavigationHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="text-sm hover:underline"
          >
            {{ item.title }}
          </a>
          <NuxtLink
            v-else
            :to="getNavigationHref(item)"
            class="text-sm hover:underline"
          >
            {{ item.title }}
          </NuxtLink>
        </template>
      </nav>
    </div>
  </header>
</template>
