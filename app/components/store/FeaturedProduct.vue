<template>
  <section class="featured-product">
    <div v-if="loading" class="featured-product__inner">
      <UiSkeleton type="rect" width="100%" height="100%" class="featured-product__bg-skel" />
    </div>

    <div v-else class="featured-product__inner">
      <div class="featured-product__bg">
        <img v-if="product.image" :src="product.image" :alt="product.title" class="featured-product__image">
      </div>
      
      <div class="container featured-product__content-wrapper">
        <div class="featured-product__content">
          <p class="featured-product__label text-xs uppercase tracking-widest font-medium mb-4">{{ $t('product.featuredPiece') }}</p>
          <h2 class="featured-product__title text-h1 font-medium mb-4">{{ product.title }}</h2>
          <p class="featured-product__description text-body-lg mb-8">{{ product.description || $t('product.defaultDescription') }}</p>
          <div class="featured-product__price text-h3 mb-8">{{ formatPrice(product.price) }}</div>
          
          <NuxtLinkLocale :to="`/products/${product.id}`" class="editorial-btn">
            {{ $t('product.viewDetails') }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePrice } from '~/composables/usePrice'

const { formatPrice } = usePrice()

defineProps({
  product: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.featured-product {
  position: relative;
  width: 100%;
}

.featured-product__inner {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--bg-secondary);
}

.featured-product__bg-skel {
  position: absolute;
  inset: 0;
}

.featured-product__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.featured-product__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.featured-product__content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: flex-end; /* Align to the right for asymmetrical balance */
  width: 100%;
}

[dir="rtl"] .featured-product__content-wrapper {
  justify-content: flex-start; /* Align to left in RTL */
}

.featured-product__content {
  background-color: var(--bg-primary);
  padding: var(--space-8) var(--space-6);
  max-width: 500px;
  width: 100%;
  margin-top: var(--space-16);
  margin-bottom: var(--space-16);
}

@media (min-width: 768px) {
  .featured-product__content {
    padding: var(--space-12) var(--space-12);
    margin-right: var(--space-12);
  }
  
  [dir="rtl"] .featured-product__content {
    margin-right: 0;
    margin-left: var(--space-12);
  }
}

.featured-product__label {
  color: var(--text-muted);
}

.featured-product__title {
  color: var(--text-primary);
}

.featured-product__description {
  color: var(--text-secondary);
}

.featured-product__price {
  color: var(--text-primary);
}

.editorial-btn {
  display: inline-block;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  padding: var(--space-4) var(--space-8);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.editorial-btn:hover {
  opacity: 0.8;
}

@media (max-width: 767px) {
  .featured-product__inner {
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .featured-product__content-wrapper {
    justify-content: center;
    padding: 0;
  }
  
  .featured-product__content {
    margin: 0;
    margin-top: 50vh; /* Push content down to show image */
    max-width: 100%;
  }
}
</style>
