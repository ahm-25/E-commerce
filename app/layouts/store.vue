<template>
  <div class="store-layout" :data-theme="currentTheme" :data-store-theme="storeTheme" :dir="currentDirection">
    <StoreHeader />
    <main class="store-main">
      <slot />
    </main>
    <StoreFooter />

    <!-- Cart Drawer integrated at layout level -->
    <StoreCartDrawer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { useI18n, useSwitchLocalePath, navigateTo } from '#imports'

// In a real multi-tenant app, the theme would come from tenant configuration (API)
const currentTheme = ref('light') // 'light' or 'dark'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Direction is derived from the active locale rather than being toggled on its own,
// so language and layout direction can never drift apart.
const currentDirection = computed(() => {
  const active = (locales.value as any[]).find(l => l.code === locale.value)
  return active?.dir || 'ltr'
})

const toggleLocale = () => {
  const next = locale.value === 'ar' ? 'en' : 'ar'
  return navigateTo(switchLocalePath(next))
}

const { storeTheme } = useStoreTheme()

// Provide a way to test toggling on the design system page
provide('themeConfig', {
  currentTheme,
  currentDirection,
  toggleTheme: () => currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light',
  toggleDirection: toggleLocale
})
</script>

<style scoped>
.store-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.store-main {
  flex: 1;
}
</style>
