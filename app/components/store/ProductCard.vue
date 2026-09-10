<template>
  <div v-if="loading" class="product-card">
    <div class="product-card__image-container">
      <UiSkeleton type="rect" class="w-full h-full" />
    </div>
    <div class="product-card__info mt-4">
      <UiSkeleton type="text" width="60%" />
      <UiSkeleton type="text" width="40%" class="mt-2" />
    </div>
  </div>
  
  <div v-else class="product-card group">
    <div class="product-card__image-container">
      <!-- Minimal status indicator -->
      <div v-if="badge" class="product-card__badge uppercase tracking-widest text-xs">
        {{ badge }}
      </div>
      <div v-else-if="discountPercentage > 0" class="product-card__badge product-card__badge--sale uppercase tracking-widest text-xs">
        {{ $t('product.sale') }}
      </div>
      
      <NuxtLinkLocale :to="`/products/${id}`" class="block w-full h-full">
        <img :src="image" :alt="title" class="product-card__image" loading="lazy">
        <!-- Optional: secondary image for hover could go here if available -->
      </NuxtLinkLocale>
      
      <!-- Elegant wishlist -->
      <button class="wishlist-btn" :class="{ 'wishlist-btn--active': isWishlisted }" @click.prevent="toggleWishlist" :aria-label="$t('product.addToWishlist')">
        <UiIcon name="heart" :size="20" stroke-width="1.5" :filled="isWishlisted" />
      </button>

      <!-- Quick Add Overlay -->
      <div class="product-card__quick-add">
        <button class="quick-add-btn text-xs uppercase tracking-widest">{{ $t('product.quickAdd') }}</button>
      </div>
    </div>
    
    <div class="product-card__info mt-4">
      <NuxtLinkLocale :to="`/products/${id}`" class="block">
        <h3 class="product-card__title text-body font-medium">{{ title }}</h3>
      </NuxtLinkLocale>
      
      <!-- Tech Specs (if provided) -->
      <div v-if="specs && specs.length" class="product-card__specs mt-2 flex flex-wrap gap-1">
        <span v-for="(spec, index) in specs" :key="index" class="text-[10px] bg-bg-secondary px-2 py-0.5 rounded-full text-secondary">
          {{ spec }}
        </span>
      </div>
      
      <div class="product-card__price-wrapper mt-2">
        <span class="product-card__price text-sm text-secondary font-semibold" :class="{ 'text-danger': discountPercentage > 0 }">{{ formattedPrice }}</span>
        <span v-if="originalPrice" class="product-card__price--original text-xs text-muted line-through ml-2">{{ formattedOriginalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePrice } from '~/composables/usePrice'

const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, default: '' },
  category: { type: String, default: '' }, // Kept for logic if needed, but not displayed for minimal look
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: null },
  image: { type: String, default: '' },
  badge: { type: String, default: '' },
  badgeVariant: { type: String, default: 'neutral' },
  currency: { type: String, default: 'USD' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  specs: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const isWishlisted = ref(false)
const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}

const { formatPrice } = usePrice()

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
}

.product-card__image-container {
  position: relative;
  aspect-ratio: 1/1; /* Square for electronics/hardware */
  background-color: var(--bg-primary); /* White for better product contrast */
  border: 1px solid var(--border-light); /* Subtle border for definition */
  border-radius: var(--radius-md); /* Rounded corners */
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 10;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 4px 8px;
  font-weight: 500;
}

[dir="rtl"] .product-card__badge {
  left: auto;
  right: var(--space-4);
}

.product-card__badge--sale {
  color: var(--color-danger);
}

.wishlist-btn {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
}

[dir="rtl"] .wishlist-btn {
  right: auto;
  left: var(--space-4);
}

.product-card:hover .wishlist-btn {
  opacity: 1;
}

.wishlist-btn:hover {
  transform: scale(1.1);
}

.wishlist-btn--active {
  color: var(--color-danger);
  opacity: 1;
}

@media (hover: none) {
  .wishlist-btn {
    opacity: 1;
  }
}

.product-card__quick-add {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
}

.product-card:hover .product-card__quick-add {
  transform: translateY(0);
}

.quick-add-btn {
  width: 100%;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  padding: var(--space-3) 0;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.quick-add-btn:hover {
  background-color: var(--text-secondary);
}

@media (hover: none) {
  .product-card__quick-add {
    display: none;
  }
}

.product-card__info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

[dir="rtl"] .product-card__info {
  text-align: right;
}

.product-card__title {
  color: var(--text-primary);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.product-card__title:hover {
  opacity: 0.7;
}

.product-card__price-wrapper {
  display: flex;
  align-items: baseline;
}

.text-danger { color: var(--color-danger); }
.line-through { text-decoration: line-through; }
.ml-2 { margin-left: 0.5rem; }

[dir="rtl"] .ml-2 {
  margin-left: 0;
  margin-right: 0.5rem;
}
</style>
