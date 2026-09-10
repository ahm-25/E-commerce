<template>
  <div class="cart-item group">
    <!-- Loading State -->
    <template v-if="loading">
      <div class="cart-item-image-skeleton">
        <UiSkeleton type="rect" width="100%" height="100%" />
      </div>
      <div class="cart-item-content">
        <div class="flex justify-between mb-2">
          <UiSkeleton type="text" width="60%" />
          <UiSkeleton type="text" width="20%" />
        </div>
        <UiSkeleton type="text" width="40%" class="mb-4" />
        <div class="flex justify-between items-end">
          <UiSkeleton type="rect" width="100px" height="36px" />
          <UiSkeleton type="text" width="60px" />
        </div>
      </div>
    </template>

    <!-- Content State -->
    <template v-else>
      <div class="cart-item-image-wrapper">
        <img :src="image" :alt="title" class="cart-item-image">
      </div>
      
      <div class="cart-item-content">
        <div class="cart-item-header">
          <div>
            <h3 class="text-h3 text-base font-semibold mb-1">
              <NuxtLinkLocale :to="`/products/${id}`" class="item-title">{{ title }}</NuxtLinkLocale>
            </h3>
            <p v-if="variant" class="text-sm text-secondary">{{ variant }}</p>
          </div>
          <div class="cart-item-price text-right">
            <span class="font-semibold text-lg">{{ formattedPrice }}</span>
            <div v-if="originalPrice" class="text-xs text-muted line-through mt-1">{{ formattedOriginalPrice }}</div>
          </div>
        </div>
        
        <div class="cart-item-actions">
          <UiQuantitySelector 
            :model-value="quantity" 
            @update:model-value="$emit('update:quantity', $event)" 
            :max="10" 
            class="quantity-selector"
          />
          
          <div class="cart-item-links">
            <button class="cart-item-btn text-accent" @click="$emit('save-for-later')">
              <UiIcon name="heart" :size="16" class="btn-icon" />
              <span>{{ $t('cart.save') }}</span>
            </button>
            <span class="text-border mx-3">|</span>
            <button class="cart-item-btn text-danger" @click="$emit('remove')">
              <UiIcon name="trash-2" :size="16" class="btn-icon" />
              <span>{{ $t('cart.remove') }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePrice } from '~/composables/usePrice'

const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  variant: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  loading: { type: Boolean, default: false }
})

defineEmits(['update:quantity', 'remove', 'save-for-later'])

const { formatPrice } = usePrice()
const formattedPrice = computed(() => formatPrice(props.price))
const formattedOriginalPrice = computed(() => props.originalPrice ? formatPrice(props.originalPrice) : null)
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: var(--space-6);
  padding-block: var(--space-8);
  border-bottom: 1px solid var(--border-light);
  transition: background-color 0.3s ease;
}

.cart-item:hover {
  background-color: var(--bg-primary);
}

.cart-item-image-wrapper, .cart-item-image-skeleton {
  width: 120px;
  height: 140px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background-color: var(--bg-tertiary);
  overflow: hidden;
  position: relative;
}

@media (min-width: 640px) {
  .cart-item-image-wrapper, .cart-item-image-skeleton {
    width: 140px;
    height: 180px;
  }
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.cart-item:hover .cart-item-image {
  transform: scale(1.05);
}

.cart-item-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.item-title {
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.item-title:hover {
  color: var(--accent-color);
}

.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
.text-lg { font-size: 1.125rem; }

.cart-item-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

@media (min-width: 640px) {
  .cart-item-actions {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.cart-item-links {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.cart-item-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  transition: opacity 0.2s, transform 0.2s ease;
}

.cart-item-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.btn-icon {
  margin-bottom: 1px;
}

.text-danger { color: var(--color-danger); }
.text-accent { color: var(--text-secondary); }
.text-accent:hover { color: var(--text-primary); }
.text-border { color: var(--border-light); }
.mx-3 { margin-inline: 0.75rem; }
.mt-1 { margin-top: 0.25rem; }
</style>
