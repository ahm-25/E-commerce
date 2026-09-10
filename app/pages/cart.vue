<template>
  <div class="cart-page section-padding">
    <div class="container">
      <div class="cart-page-header">
        <h1 class="text-h1">{{ t('cart.pageTitle') }}</h1>
        <p class="text-secondary mt-2">{{ t('cart.pageSubtitle') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="cart-layout mt-10">
        <div class="cart-main">
          <StoreCartItem v-for="i in 3" :key="i" :id="i" title="" image="" :price="0" loading />
        </div>
        <div class="cart-sidebar">
          <StoreOrderSummary :subtotal="0" loading />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="cartItems.length === 0" class="cart-empty-state mt-10">
        <StoreEmptyState 
          icon="shopping-bag"
          :title="t('cart.emptyTitle')"
          :description="t('cart.emptyDescription')"
          :action-text="t('common.continueShopping')"
          @action-click="navigateTo(localePath('/products'))"
        />
      </div>

      <!-- Populated Cart -->
      <div v-else class="cart-layout mt-10">
        
        <!-- Items List -->
        <div class="cart-main">
          <div class="cart-items-header hidden md:grid">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">{{ t('cart.columnProduct') }}</span>
            <span class="text-xs font-semibold text-secondary text-right uppercase tracking-wider">{{ t('cart.columnTotal') }}</span>
          </div>
          
          <div class="cart-items-list">
            <StoreCartItem 
              v-for="(item, index) in cartItems" 
              :key="item.id"
              v-bind="item"
              v-model:quantity="item.quantity"
              @remove="removeItem(index)"
              @save-for-later="saveForLater(index)"
            />
          </div>
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
              <UiButton variant="primary" size="lg" full-width class="checkout-btn" @click="navigateTo(localePath('/checkout'))">
                {{ t('cart.proceedToCheckout') }}
              </UiButton>
              <div class="mt-4 flex items-center justify-center gap-2 text-xs text-secondary font-medium">
                <UiIcon name="check-circle" :size="16" class="text-success" />
                {{ t('cart.secureCheckout') }}
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
import { definePageMeta, navigateTo, useI18n, useLocalePath } from '#imports'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()
const localePath = useLocalePath()
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
  alert(t('cart.savedForLater', { title: cartItems.value[index].title }))
  removeItem(index)
}

const handleCoupon = (code: string) => {
  if (code.toLowerCase() === 'welcome10') {
    discountAmount.value = cartSubtotal.value * 0.1
    alert(t('cart.couponApplied'))
  } else {
    alert(t('cart.couponInvalid'))
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
    padding-block: var(--space-16);
  }
}

.cart-page-header {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--space-6);
  margin-bottom: var(--space-8);
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
    gap: var(--space-12);
  }
}

.cart-main {
  flex-grow: 1;
}

.cart-sidebar {
  width: 100%;
  position: sticky;
  top: 8rem;
  z-index: 10;
}

@media (min-width: 1024px) {
  .cart-sidebar {
    width: 400px;
    flex-shrink: 0;
  }
}

.cart-items-header {
  grid-template-columns: 1fr auto;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--space-2);
}

.cart-items-list {
  display: flex;
  flex-direction: column;
}

.hidden { display: none; }
@media (min-width: 768px) {
  .md\:grid { display: grid; }
}

.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
.mt-2 { margin-top: var(--space-2); }
.mt-10 { margin-top: var(--space-10, 2.5rem); }
.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.05em; }
.font-semibold { font-weight: 600; }
.text-success { color: var(--color-success); }
.checkout-btn {
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-float);
}
</style>
