<template>
  <div class="cart-page section-padding">
    <div class="container">
      <h1 class="text-h1 mb-8">Shopping Cart</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="cart-layout">
        <div class="cart-main">
          <StoreCartItem v-for="i in 3" :key="i" :id="i" title="" image="" :price="0" loading />
        </div>
        <div class="cart-sidebar">
          <StoreOrderSummary :subtotal="0" loading />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="cartItems.length === 0" class="cart-empty-state">
        <StoreEmptyState 
          icon="shopping-bag"
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Discover our latest arrivals and premium collections."
          action-text="Continue Shopping"
          @action-click="navigateTo('/products')"
        />
      </div>

      <!-- Populated Cart -->
      <div v-else class="cart-layout">
        
        <!-- Items List -->
        <div class="cart-main">
          <div class="cart-items-header hidden md:grid">
            <span class="text-sm font-medium text-secondary">Product</span>
            <span class="text-sm font-medium text-secondary text-right">Total</span>
          </div>
          
          <StoreCartItem 
            v-for="(item, index) in cartItems" 
            :key="item.id"
            v-bind="item"
            v-model:quantity="item.quantity"
            @remove="removeItem(index)"
            @save-for-later="saveForLater(index)"
          />
        </div>

        <!-- Order Summary -->
        <div class="cart-sidebar">
          <StoreOrderSummary 
            :subtotal="cartSubtotal"
            :shipping="shippingCost"
            :discount="discountAmount"
            @apply-coupon="handleCoupon"
          >
            <template #actions>
              <UiButton variant="primary" size="lg" full-width @click="navigateTo('/checkout')">
                Proceed to Checkout
              </UiButton>
              <div class="mt-4 flex items-center justify-center gap-2 text-sm text-secondary">
                <UiIcon name="check-circle" :size="16" />
                Secure Checkout Guarantee
              </div>
            </template>
          </StoreOrderSummary>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { definePageMeta, navigateTo } from '#imports'

definePageMeta({
  layout: 'store'
})

const isLoading = ref(true)

// Mock Data
const cartItems = ref<any[]>([])
const shippingCost = ref(15.00)
const discountAmount = ref(0)

const cartSubtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const removeItem = (index: number) => {
  cartItems.value.splice(index, 1)
}

const saveForLater = (index: number) => {
  // Simulate saving for later
  alert(`Moved "${cartItems.value[index].title}" to saved items.`)
  removeItem(index)
}

const handleCoupon = (code: string) => {
  if (code.toLowerCase() === 'welcome10') {
    discountAmount.value = cartSubtotal.value * 0.1
    alert('Coupon applied successfully! 10% off.')
  } else {
    alert('Invalid coupon code.')
  }
}

onMounted(() => {
  setTimeout(() => {
    cartItems.value = [
      { id: 101, title: 'Minimalist Wool Coat', variant: 'Color: Charcoal, Size: M', price: 299.00, quantity: 1, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop' },
      { id: 202, title: 'Slim Fit Chinos', variant: 'Color: Navy, Size: 32x32', price: 75.00, originalPrice: 90.00, quantity: 2, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop' }
    ]
    
    // If subtotal over $200, free shipping
    if (cartSubtotal.value > 200) shippingCost.value = 0

    isLoading.value = false
  }, 800)
})
</script>

<style scoped>
.section-padding {
  padding-block: var(--space-8);
}

@media (min-width: 1024px) {
  .section-padding {
    padding-block: var(--space-12);
  }
}

.cart-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .cart-layout {
    flex-direction: row;
    align-items: flex-start;
  }
}

.cart-main {
  flex-grow: 1;
}

.cart-sidebar {
  width: 100%;
  position: sticky;
  top: 6rem;
}

@media (min-width: 1024px) {
  .cart-sidebar {
    width: 380px;
    flex-shrink: 0;
  }
}

.cart-items-header {
  grid-template-columns: 1fr auto;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: var(--space-2);
}

.hidden { display: none; }
@media (min-width: 768px) {
  .md\:grid { display: grid; }
}

.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
</style>
