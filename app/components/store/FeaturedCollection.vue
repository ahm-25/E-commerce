<template>
  <div class="featured-collection">
    <div class="featured-collection__header">
      <h2 class="text-h2 uppercase tracking-wide">{{ title }}</h2>
      <NuxtLink v-if="linkUrl" :to="linkUrl" class="editorial-link">{{ linkText }}</NuxtLink>
    </div>

    <div v-if="loading" class="featured-collection__grid">
      <UiSkeleton type="rect" class="featured-collection__primary-skel" />
      <div class="featured-collection__secondary-col">
        <UiSkeleton type="rect" class="featured-collection__secondary-skel" />
        <UiSkeleton type="rect" class="featured-collection__secondary-skel" />
      </div>
    </div>

    <div v-else-if="products && products.length >= 3" class="featured-collection__grid">
      <!-- Primary large product -->
      <NuxtLink :to="`/products/${products[0].id}`" class="editorial-card editorial-card--large group">
        <div class="editorial-card__image-wrapper">
          <img :src="products[0].image" :alt="products[0].title" class="editorial-card__image group-hover:scale">
        </div>
        <div class="editorial-card__info">
          <h3 class="text-h4 font-medium">{{ products[0].title }}</h3>
          <p class="text-body text-secondary mt-2">${{ products[0].price.toFixed(2) }}</p>
        </div>
      </NuxtLink>

      <!-- Secondary column with 2 smaller products -->
      <div class="featured-collection__secondary-col">
        <NuxtLink :to="`/products/${products[1].id}`" class="editorial-card group">
          <div class="editorial-card__image-wrapper">
            <img :src="products[1].image" :alt="products[1].title" class="editorial-card__image group-hover:scale">
          </div>
          <div class="editorial-card__info">
            <h3 class="text-body-lg font-medium">{{ products[1].title }}</h3>
            <p class="text-sm text-secondary mt-1">${{ products[1].price.toFixed(2) }}</p>
          </div>
        </NuxtLink>

        <NuxtLink :to="`/products/${products[2].id}`" class="editorial-card group mt-8 md:mt-16">
          <div class="editorial-card__image-wrapper">
            <img :src="products[2].image" :alt="products[2].title" class="editorial-card__image group-hover:scale">
          </div>
          <div class="editorial-card__info">
            <h3 class="text-body-lg font-medium">{{ products[2].title }}</h3>
            <p class="text-sm text-secondary mt-1">${{ products[2].price.toFixed(2) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Curated Selection' },
  linkText: { type: String, default: 'View All' },
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-6);
}

.featured-collection__header h2 {
  margin: 0;
  line-height: 1; /* Tighter line height for better alignment */
}

.editorial-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, opacity 0.3s ease;
  padding-bottom: 2px;
}

.editorial-link:hover {
  border-color: var(--text-primary);
  opacity: 0.8;
}

.featured-collection__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .featured-collection__grid {
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-12);
    align-items: start;
  }
}

@media (min-width: 1024px) {
  .featured-collection__grid {
    grid-template-columns: 2fr 1fr;
    gap: var(--space-16);
  }
}

.featured-collection__secondary-col {
  display: flex;
  flex-direction: column;
}

.editorial-card {
  display: block;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.editorial-card__image-wrapper {
  overflow: hidden;
  background-color: var(--bg-tertiary);
  margin-bottom: var(--space-4);
  /* Aspect ratios for editorial feel */
  aspect-ratio: 3 / 4; 
}

.editorial-card--large .editorial-card__image-wrapper {
  aspect-ratio: 4 / 5;
}

.editorial-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

.group:hover .group-hover\:scale {
  transform: scale(1.03);
}

.editorial-card__info {
  display: flex;
  flex-direction: column;
}

.featured-collection__primary-skel {
  width: 100%;
  aspect-ratio: 4 / 5;
}

.featured-collection__secondary-skel {
  width: 100%;
  aspect-ratio: 3 / 4;
  margin-bottom: var(--space-8);
}
</style>
