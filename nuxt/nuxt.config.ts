// https://nuxt.com/docs/api/configuration/nuxt-config
import {getStudioUrl} from './env.config'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/sanity'],

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2026-05-15',
    perspective: 'published',
    queryEndpoint: '/api/sanity/query',
    visualEditing: {
      token: process.env.SANITY_VIEWER_TOKEN,
      studioUrl: getStudioUrl(),
      stega: true,
    },
    typegen: {
      enabled: true,
      schemaTypesPath: '../studio/schemaTypes',
      queryPaths: ['./app/queries/**/*.{ts,tsx}', './app/pages/**/*.{ts,tsx,vue}'],
    },
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
})
