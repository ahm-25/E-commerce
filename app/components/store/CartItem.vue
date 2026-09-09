<template>
  <div class="cart-item">
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
              <NuxtLink :to="`/products/${id}`" class="hover:text-accent">{{ title }}</NuxtLink>
            </h3>
            <p v-if="variant" class="text-sm text-secondary">{{ variant }}</p>
          </div>
          <div class="cart-item-price text-right">
            <span class="font-semibold">{{ formattedPrice }}</span>
            <div v-if="originalPrice" class="text-xs text-muted line-through">{{ formattedOriginalPrice }}</div>
          </div>
        </div>
        
        <div class="cart-item-actions">
          <UiQuantitySelector 
            :model-value="quantity" 
            @update:model-value="$emit('update:quantity', $event)" 
            :max="10" 
          />
          
          <div class="cart-item-links">
            <button class="cart-item-btn text-accent" @click="$emit('save-for-later')">Save for later</button>
            <span class="text-border mx-2">|</span>
            <button class="cart-item-btn text-danger" @click="$emit('remove')">Remove</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

const formatPrice = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
const formattedPrice = computed(() => formatPrice(props.price))
const formattedOriginalPrice = computed(() => props.originalPrice ? formatPrice(props.originalPrice) : null)
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: var(--space-4);
  padding-block: var(--space-6);
  border-bottom: 1px solid var(--border-light);
}

.cart-item-image-wrapper, .cart-item-image-skeleton {
  width: 100px;
  height: 120px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background-color: var(--bg-tertiary);
  overflow: hidden;
}

@media (min-width: 640px) {
  .cart-item-image-wrapper, .cart-item-image-skeleton {
    width: 120px;
    height: 150px;
  }
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.hover\:text-accent:hover {
  color: var(--accent-color);
}

.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }

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
  font-weight: 500;
  transition: opacity 0.2s;
}

.cart-item-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.text-danger { color: var(--color-danger); }
.text-accent { color: var(--accent-color); }
.text-border { color: var(--border-color); }
.mx-2 { margin-inline: 0.5rem; }
</style>
