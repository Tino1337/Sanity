<script setup lang="ts">
import {SITE_SETTINGS_QUERY} from '~/queries/site-settings'

const {data: settings} = await useSanityQuery(SITE_SETTINGS_QUERY, {}, {
  key: 'site-settings',
})
</script>

<template>
  <header class="header">
    <LayoutContainer class="header__inner">
      <NuxtLink to="/" class="header__brand">
        <img
          v-if="settings?.logo?.asset?.url"
          :src="settings.logo.asset.url"
          :alt="cleanStega(settings?.siteName) || 'Site'"
          class="header__logo"
        >
        <span v-else class="header__site-name">
          {{ settings?.siteName || 'Site' }}
        </span>
      </NuxtLink>

      <nav v-if="settings?.mainNavigation?.length" class="header__nav">
        <template v-for="(item, index) in settings.mainNavigation" :key="index">
          <a
            v-if="isExternalMenuLink(item)"
            :href="resolveMenuHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="header__link"
          >
            {{ item.label }}
          </a>
          <NuxtLink
            v-else
            :to="resolveMenuHref(item)"
            class="header__link"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>
    </LayoutContainer>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid $color-border;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
    padding-block: $space-4;
  }

  &__brand {
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.8;
      text-decoration: none;
    }
  }

  &__logo {
    height: $space-8;
    width: auto;
  }

  &__site-name {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
  }

  &__link {
    font-size: $font-size-sm;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
