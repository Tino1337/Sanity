<script setup lang="ts">
const { data: settings } = await useSiteSettings();
</script>

<template>
  <footer class="mt-auto border-t border-default">
    <div
      class="container mx-auto flex max-w-3xl flex-col gap-4 p-8 text-sm text-muted"
    >
      <nav v-if="settings?.footerMenu?.length" class="flex flex-wrap gap-4">
        <template v-for="(item, index) in settings.footerMenu" :key="index">
          <a
            v-if="isExternalNavigationItem(item)"
            :href="getNavigationHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="hover:underline"
          >
            {{ item.title }}
          </a>
          <NuxtLink
            v-else
            :to="getNavigationHref(item)"
            class="hover:underline"
          >
            {{ item.title }}
          </NuxtLink>
        </template>
      </nav>

      <p v-if="settings?.copyright">
        {{ settings.copyright }}
      </p>
    </div>
  </footer>
</template>
