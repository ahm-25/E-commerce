<template>
  <div v-if="loading" class="product-card">
    <div class="product-card__image-container">
      <UiSkeleton type="rect" />
    </div>
    <div class="product-card__info mt-3">
      <UiSkeleton type="text" width="60%" />
      <UiSkeleton type="text" width="80%" />
      <UiSkeleton type="text" width="40%" />
    </div>
  </div>
  
  <div v-else class="product-card group">
    <div class="product-card__image-container">
      <UiBadge v-if="badge" :variant="badgeVariant" class="product-card__badge">{{ badge }}</UiBadge>
      <UiBadge v-else-if="discountPercentage > 0" variant="danger" class="product-card__badge">-{{ discountPercentage }}%</UiBadge>
      
      <img :src="image" :alt="title" class="product-card__image" loading="lazy">
      
      <button class="wishlist-btn" :class="{ 'wishlist-btn--active': isWishlisted }" @click.prevent="toggleWishlist" aria-label="Add to Wishlist">
        <UiIcon name="heart" :size="20" :filled="isWishlisted" />
      </button>

      <div class="product-card__overlay">
        <UiButton variant="primary" class="add-to-cart-btn" full-width>Quick Add</UiButton>
      </div>
    </div>
    <div class="product-card__info">
      <div class="flex items-center justify-between mb-1">
        <p class="product-card__category text-muted text-sm">{{ category }}</p>
        <div class="product-card__rating" v-if="rating > 0">
          <UiIcon name="star" :size="14" color="var(--color-warning)" filled />
          <span class="text-sm ml-1 font-medium">{{ rating.toFixed(1) }}</span>
          <span class="text-xs text-muted ml-1">({{ reviewCount }})</span>
        </div>
      </div>
      <NuxtLink :to="`/products/${id}`">
        <h3 class="product-card__title font-medium">{{ title }}</h3>
      </NuxtLink>
      <div class="product-card__price-wrapper">
        <span class="product-card__price font-semibold" :class="{ 'text-danger': discountPercentage > 0 }">{{ formattedPrice }}</span>
        <span v-if="originalPrice" class="product-card__price--original text-muted text-sm">{{ formattedOriginalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: null },
  image: { type: String, default: '' },
  badge: { type: String, default: '' },
  badgeVariant: { type: String, default: 'neutral' },
  currency: { type: String, default: 'USD' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  loading: { type: Boolean, default: false }
})

const isWishlisted = ref(false)
const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: props.currency }).format(value)
}

const formattedPrice = computed(() => formatPrice(props.price))
const formattedOriginalPrice = computed(() => props.originalPrice ? formatPrice(props.originalPrice) : null)

const discountPercentage = computed(() => {
  if (props.originalPrice && props.originalPrice > props.price) {
    return Math.round(((props.originalPrice - props.price) / props.originalPrice) * 100)
  }
  return 0
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card__image-container {
  position: relative;
  aspect-ratio: 4/5;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__badge {
  position: absolute;
  top: var(--space-3);
  inset-inline-start: var(--space-3);
  z-index: 10;
}

.wishlist-btn {
  position: absolute;
  top: var(--space-3);
  inset-inline-end: var(--space-3);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.product-card:hover .wishlist-btn {
  opacity: 1;
  transform: translateY(0);
}

.wishlist-btn:hover {
  color: var(--color-danger);
}

.wishlist-btn--active {
  color: var(--color-danger);
  opacity: 1;
  transform: translateY(0);
}

@media (hover: none) {
  .wishlist-btn {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-card__overlay {
  opacity: 1;
}

.add-to-cart-btn {
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .add-to-cart-btn {
  transform: translateY(0);
  opacity: 1;
}

@media (hover: none) {
  .product-card__overlay {
    opacity: 1;
    background: none;
  }
  .add-to-cart-btn {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.product-card__rating {
  display: flex;
  align-items: center;
}

.ml-1 { margin-left: 0.25rem; }

[dir="rtl"] .ml-1 {
  margin-left: 0;
  margin-right: 0.25rem;
}

.product-card__title {
  color: var(--text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.product-card__title:hover {
  color: var(--accent-color);
}

.product-card__price-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.text-danger { color: var(--color-danger); }

.product-card__price--original {
  text-decoration: line-through;
}
</style>
