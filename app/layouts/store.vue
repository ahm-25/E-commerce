<template>
  <div class="store-layout" :data-theme="currentTheme" :dir="currentDirection">
    <StoreHeader />
    <main class="store-main">
      <slot />
    </main>
    <StoreFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// In a real multi-tenant app, these would come from tenant configuration (API)
const currentTheme = ref('light') // 'light' or 'dark'
const currentDirection = ref('ltr') // 'ltr' or 'rtl'

// Provide a way to test toggling on the design system page
import { provide } from 'vue'
provide('themeConfig', {
  currentTheme,
  currentDirection,
  toggleTheme: () => currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light',
  toggleDirection: () => currentDirection.value = currentDirection.value === 'ltr' ? 'rtl' : 'ltr'
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
