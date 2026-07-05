<script setup lang="ts">
import {SITE_SETTINGS_QUERY} from '~/queries/site-settings'

const {data: settings} = await useSanityQuery(SITE_SETTINGS_QUERY, {}, {
  key: 'site-settings',
})
</script>

<template>
  <footer class="footer">
    <LayoutContainer class="footer__inner">
      <nav v-if="settings?.footerNavigation?.length" class="footer__nav">
        <template v-for="(item, index) in settings.footerNavigation" :key="index">
          <a
            v-if="isExternalMenuLink(item)"
            :href="resolveMenuHref(item)"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="footer__link"
          >
            {{ item.label }}
          </a>
          <NuxtLink
            v-else
            :to="resolveMenuHref(item)"
            class="footer__link"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <p v-if="settings?.copyright" class="footer__copyright">
        {{ settings.copyright }}
      </p>
    </LayoutContainer>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid $color-border;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    padding-block: $space-8;
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
  }

  &__link:hover {
    text-decoration: underline;
  }

  &__copyright {
    margin: 0;
  }
}
</style>
