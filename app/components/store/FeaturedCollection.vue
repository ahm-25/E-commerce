<template>
  <div class="featured-collection">
    <div class="featured-collection__header">
      <h2 class="text-h2 font-semibold tracking-tight">{{ title || $t('home.curatedSelection') }}</h2>
      <NuxtLinkLocale v-if="linkUrl" :to="linkUrl" class="editorial-link">
        {{ linkText || $t('common.viewAll') }}
        <UiIcon name="arrow-right" :size="16" class="ml-2 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </NuxtLinkLocale>
    </div>

    <div v-if="loading" class="bento-grid">
      <UiSkeleton type="rect" class="bento-item item-main" />
      <UiSkeleton type="rect" class="bento-item item-secondary-1" />
      <UiSkeleton type="rect" class="bento-item item-secondary-2" />
    </div>

    <div v-else-if="products && products.length >= 3" class="bento-grid">
      <!-- Primary large product -->
      <NuxtLinkLocale :to="`/products/${products[0].id}`" class="bento-item item-main group">
        <div class="bento-image-wrapper">
          <img :src="products[0].image" :alt="products[0].title" class="bento-image">
          <div class="bento-overlay"></div>
        </div>
        <div class="bento-content">
          <div class="bento-badge" v-if="products[0].badge">{{ products[0].badge }}</div>
          <div class="mt-auto">
            <h3 class="text-h3 font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">{{ products[0].title }}</h3>
            <p class="text-white/80 font-medium opacity-0 transform transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">{{ formatPrice(products[0].price) }}</p>
          </div>
          <div class="bento-action">
            <UiIcon name="arrow-up-right" :size="24" class="text-white rtl:-scale-x-100" />
          </div>
        </div>
      </NuxtLinkLocale>

      <!-- Secondary product 1 -->
      <NuxtLinkLocale :to="`/products/${products[1].id}`" class="bento-item item-secondary-1 group">
        <div class="bento-image-wrapper">
          <img :src="products[1].image" :alt="products[1].title" class="bento-image">
          <div class="bento-overlay"></div>
        </div>
        <div class="bento-content">
          <div class="mt-auto">
            <h3 class="text-h4 font-bold text-white mb-1 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">{{ products[1].title }}</h3>
            <p class="text-white/80 text-sm font-medium opacity-0 transform transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">{{ formatPrice(products[1].price) }}</p>
          </div>
          <div class="bento-action-small">
            <UiIcon name="arrow-up-right" :size="20" class="text-white rtl:-scale-x-100" />
          </div>
        </div>
      </NuxtLinkLocale>

      <!-- Secondary product 2 -->
      <NuxtLinkLocale :to="`/products/${products[2].id}`" class="bento-item item-secondary-2 group">
        <div class="bento-image-wrapper">
          <img :src="products[2].image" :alt="products[2].title" class="bento-image">
          <div class="bento-overlay"></div>
        </div>
        <div class="bento-content">
          <div class="mt-auto">
            <h3 class="text-h4 font-bold text-white mb-1 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">{{ products[2].title }}</h3>
            <p class="text-white/80 text-sm font-medium opacity-0 transform transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">{{ formatPrice(products[2].price) }}</p>
          </div>
          <div class="bento-action-small">
            <UiIcon name="arrow-up-right" :size="20" class="text-white rtl:-scale-x-100" />
          </div>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrice } from '~/composables/usePrice'

const { formatPrice } = usePrice()

defineProps({
  title: { type: String, default: '' },
  linkText: { type: String, default: '' },
  linkUrl: { type: String, default: '/products' },
  products: { type: Array as any, default: () => [] },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
.featured-collection {
  padding-block: var(--space-16);
}

.featured-collection__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.featured-collection__header h2 {
  margin: 0;
  line-height: 1;
}

.editorial-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.editorial-link:hover {
  color: var(--color-primary);
}

/* Bento Grid System */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  grid-auto-rows: 350px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 320px);
    gap: var(--space-6);
  }

  .item-main {
    grid-column: span 8;
    grid-row: span 2;
  }

  .item-secondary-1 {
    grid-column: span 4;
    grid-row: span 1;
  }

  .item-secondary-2 {
    grid-column: span 4;
    grid-row: span 1;
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-rows: repeat(2, 380px);
    gap: var(--space-8);
  }
}

.bento-item {
  position: relative;
  display: block;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  text-decoration: none;
  background-color: var(--bg-secondary);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.4s ease, transform 0.4s ease;
}

.bento-item:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.bento-image-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bento-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.bento-item:hover .bento-image {
  transform: scale(1.05);
}

.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  opacity: 0.8;
  transition: opacity 0.4s ease;
}

.bento-item:hover .bento-overlay {
  opacity: 0.9;
}

.bento-content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--space-8);
  z-index: 10;
}

.bento-badge {
  align-self: flex-start;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.bento-action {
  position: absolute;
  top: var(--space-8);
  right: var(--space-8);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

[dir="rtl"] .bento-action {
  right: auto;
  left: var(--space-8);
  transform: scale(0.8) rotate(45deg);
}

.bento-item:hover .bento-action {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.bento-action-small {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

[dir="rtl"] .bento-action-small {
  right: auto;
  left: var(--space-6);
  transform: scale(0.8) rotate(45deg);
}

.bento-item:hover .bento-action-small {
  opacity: 1;
  transform: scale(1) rotate(0);
}
</style>
