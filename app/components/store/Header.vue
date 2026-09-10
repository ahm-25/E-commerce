<template>
  <header class="store-header">
    <div class="container store-header__inner">
      
      <!-- Left: Utilities (Search, Wishlist, Cart) -->
      <div class="store-header__left">
        <button class="icon-button" aria-label="Search">
          <UiIcon name="search" :size="20" stroke-width="1.5" />
        </button>
        <button class="icon-button" aria-label="Wishlist">
          <UiIcon name="heart" :size="20" stroke-width="1.5" />
          <span class="action-badge">1</span>
        </button>
        <NuxtLink to="/cart" class="icon-button" aria-label="Cart">
          <UiIcon name="shopping-bag" :size="20" stroke-width="1.5" />
          <span class="action-badge">3</span>
        </NuxtLink>
      </div>

      <!-- Center: Brand/Logo -->
      <NuxtLink to="/" class="store-header__center">
        <h1 class="text-h4 font-medium tracking-wide uppercase">{{ storeName }}</h1>
      </NuxtLink>

      <!-- Right: Navigation, Theme, Language, Account -->
      <div class="store-header__right">
        <nav class="store-header__nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link">Catalog</NuxtLink>
          <NuxtLink to="/categories" class="nav-link">Categories</NuxtLink>
        </nav>
        
        <div class="header-divider"></div>

        <button class="text-xs uppercase font-medium tracking-widest nav-link">En</button>

        <button v-if="themeConfig" class="icon-button" @click="themeConfig.toggleTheme()" :aria-label="themeConfig.currentTheme.value === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <UiIcon :name="themeConfig.currentTheme.value === 'dark' ? 'sun' : 'moon'" :size="18" stroke-width="1.5" />
        </button>
        
        <button class="icon-button" aria-label="Account">
          <UiIcon name="user" :size="20" stroke-width="1.5" />
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
  background-color: rgba(var(--bg-primary-rgb), 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

/* Fallback for bg-primary-rgb if not defined */
[data-theme="light"] .store-header, :root .store-header {
  background-color: rgba(250, 249, 248, 0.85); /* #faf9f8 */
}
[data-theme="dark"] .store-header {
  background-color: rgba(18, 18, 18, 0.85); /* #121212 */
}

.store-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
}

.store-header__left,
.store-header__right {
  display: flex;
  align-items: center;
  flex: 1;
}

.store-header__left {
  justify-content: flex-start;
  gap: var(--space-2);
}

.store-header__right {
  justify-content: flex-end;
  gap: var(--space-4);
}

.store-header__center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: var(--text-primary);
  white-space: nowrap;
}

.store-header__nav {
  display: none;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .store-header__nav {
    display: flex;
  }
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-link:hover {
  color: var(--text-primary);
}

.header-divider {
  width: 1px;
  height: 1rem;
  background-color: var(--border-color);
  margin-inline: var(--space-2);
  display: none;
}

@media (min-width: 1024px) {
  .header-divider {
    display: block;
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
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.icon-button:hover {
  opacity: 0.7;
}

.action-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.6rem;
  font-weight: 500;
  border-radius: var(--radius-full);
}
</style>
