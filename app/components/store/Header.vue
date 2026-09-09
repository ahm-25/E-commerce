<template>
  <header class="store-header">
    <div class="container store-header__inner">
      <NuxtLink to="/" class="store-header__brand">
        <!-- Mock Logo Image or Store Name -->
        <h1 class="text-h3 font-bold">{{ storeName }}</h1>
      </NuxtLink>

      <nav class="store-header__nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Catalog</NuxtLink>
        <NuxtLink to="/categories" class="nav-link">Categories</NuxtLink>
      </nav>

      <div class="store-header__actions">
        <!-- Theme Toggle -->
        <button v-if="themeConfig" class="icon-button" @click="themeConfig.toggleTheme()" :aria-label="themeConfig.currentTheme.value === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <UiIcon :name="themeConfig.currentTheme.value === 'dark' ? 'sun' : 'moon'" :size="20" />
        </button>
        
        <!-- Search -->
        <button class="icon-button" aria-label="Search">
          <UiIcon name="search" :size="20" />
        </button>
        
        <!-- Account -->
        <button class="icon-button" aria-label="Account">
          <UiIcon name="user" :size="20" />
        </button>
        
        <!-- Wishlist -->
        <button class="icon-button" aria-label="Wishlist">
          <UiIcon name="heart" :size="20" />
          <span class="action-badge">1</span>
        </button>

        <!-- Cart -->
        <button class="icon-button" aria-label="Cart">
          <UiIcon name="shopping-bag" :size="20" />
          <span class="action-badge">3</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'

const storeName = ref('Lumina Boutique') // Mock tenant data
const themeConfig = inject('themeConfig', null) as any
</script>

<style scoped>
.store-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;
}

.store-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
}

.store-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-primary);
}

.store-header__nav {
  display: none;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .store-header__nav {
    display: flex;
  }
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
}

.store-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

@media (min-width: 640px) {
  .store-header__actions {
    gap: var(--space-4);
  }
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  color: var(--text-primary);
  transition: background-color 0.2s;
}

.icon-button:hover {
  background-color: var(--bg-tertiary);
}

.action-badge {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  background-color: var(--accent-color);
  color: #fff;
  font-size: 0.625rem;
  font-weight: bold;
  border-radius: var(--radius-full);
  transform: translate(10%, -10%);
}
</style>
