<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <h2 class="text-h2 uppercase tracking-wide">{{ title }}</h2>
      <div class="product-carousel__nav" v-if="!loading && products.length > 0">
        <button class="carousel-nav-btn" @click="scrollLeft" aria-label="Scroll left">
          <UiIcon name="chevron-left" :size="24" stroke-width="1.5" />
        </button>
        <button class="carousel-nav-btn" @click="scrollRight" aria-label="Scroll right">
          <UiIcon name="chevron-right" :size="24" stroke-width="1.5" />
        </button>
      </div>
    </div>

    <div class="product-carousel__track-wrapper" ref="trackWrapper">
      <div v-if="loading" class="product-carousel__track">
        <div v-for="i in 4" :key="i" class="product-carousel__item">
          <StoreProductCard :id="i" loading />
        </div>
      </div>
      
      <div v-else class="product-carousel__track" ref="track">
        <div v-for="product in products" :key="product.id" class="product-carousel__item">
          <StoreProductCard v-bind="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: { type: String, default: 'Best Sellers' },
  products: { type: Array as any, default: () => [] },
  loading: { type: Boolean, default: false }
})

const trackWrapper = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (trackWrapper.value) {
    trackWrapper.value.scrollBy({ left: -400, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (trackWrapper.value) {
    trackWrapper.value.scrollBy({ left: 400, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.product-carousel {
  padding-block: var(--space-12);
}

.product-carousel__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-4);
}

.product-carousel__nav {
  display: flex;
  gap: var(--space-2);
}

.carousel-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-nav-btn:hover {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

.product-carousel__track-wrapper {
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  /* Hide scrollbar for a cleaner look */
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-inline: calc(var(--space-4) * -1);
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .product-carousel__track-wrapper {
    margin-inline: calc(var(--space-8) * -1);
    padding-inline: var(--space-8);
  }
}

.product-carousel__track-wrapper::-webkit-scrollbar {
  display: none;
}

.product-carousel__track {
  display: flex;
  gap: var(--space-6);
  width: max-content;
  padding-bottom: var(--space-4); /* Space for hover effects */
}

.product-carousel__item {
  width: 280px;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .product-carousel__item {
    width: 320px;
  }
}

@media (min-width: 1024px) {
  .product-carousel__item {
    width: 360px;
  }
}
</style>
