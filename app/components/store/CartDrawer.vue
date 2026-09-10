<template>
  <div>
    <!-- Backdrop overlay -->
    <transition name="fade">
      <div 
        v-if="isCartOpen" 
        class="cart-backdrop" 
        @click="closeCart"
        aria-hidden="true"
      ></div>
    </transition>

    <!-- Slide-out Drawer -->
    <transition name="slide-cart">
      <div v-if="isCartOpen" class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        
        <div class="cart-drawer__header">
          <h2 id="cart-title" class="text-h3 font-medium uppercase tracking-wide">Your Cart</h2>
          <button @click="closeCart" class="cart-close-btn" aria-label="Close cart">
            <UiIcon name="x" :size="28" stroke-width="1.5" />
          </button>
        </div>

        <div class="cart-drawer__content">
          <div v-if="items.length === 0" class="cart-empty">
            <p class="text-secondary text-body-lg mb-8">Your cart is currently empty.</p>
            <button @click="closeCart" class="editorial-btn">Continue Shopping</button>
          </div>
          
          <ul v-else class="cart-items">
            <li v-for="(item, index) in items" :key="`${item.id}-${item.variant}`" class="cart-item">
              <div class="cart-item__image-wrap">
                <img :src="item.image" :alt="item.title" class="cart-item__image">
              </div>
              <div class="cart-item__details">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="text-body font-medium uppercase tracking-widest">{{ item.title }}</h3>
                    <p v-if="item.variant" class="text-sm text-secondary mt-1">{{ item.variant }}</p>
                  </div>
                  <button @click="removeFromCart(index)" class="cart-item__remove" aria-label="Remove item">
                    <UiIcon name="trash-2" :size="18" stroke-width="1.5" />
                  </button>
                </div>
                
                <div class="flex justify-between items-end mt-4">
                  <div class="cart-item__quantity">
                    <button @click="updateQuantity(index, item.quantity - 1)" class="quantity-btn">-</button>
                    <span class="quantity-value">{{ item.quantity }}</span>
                    <button @click="updateQuantity(index, item.quantity + 1)" class="quantity-btn">+</button>
                  </div>
                  <span class="text-body font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="items.length > 0" class="cart-drawer__footer">
          <div class="flex justify-between items-center mb-6">
            <span class="text-body uppercase tracking-widest">Subtotal</span>
            <span class="text-h4 font-medium">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <p class="text-sm text-secondary mb-6">Shipping & taxes calculated at checkout.</p>
          <NuxtLink to="/checkout" class="checkout-btn w-full text-center" @click="closeCart">
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { isCartOpen, closeCart, items, cartTotal, removeFromCart, updateQuantity } = useCart()
</script>

<style scoped>
.cart-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.cart-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  background-color: var(--bg-primary);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
}

[dir="rtl"] .cart-drawer {
  right: auto;
  left: 0;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--border-color);
}

.cart-close-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cart-close-btn:hover {
  transform: scale(1.1);
}

.cart-drawer__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-8);
}

.cart-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.cart-item {
  display: flex;
  gap: var(--space-6);
}

.cart-item__image-wrap {
  width: 100px;
  aspect-ratio: 3/4;
  background-color: var(--bg-tertiary);
  flex-shrink: 0;
}

.cart-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-item__remove {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--space-2);
  margin-right: calc(var(--space-2) * -1);
  transition: color 0.2s ease;
}

[dir="rtl"] .cart-item__remove {
  margin-right: 0;
  margin-left: calc(var(--space-2) * -1);
}

.cart-item__remove:hover {
  color: var(--color-danger);
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
}

.quantity-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 300;
}

.quantity-value {
  width: 2rem;
  text-align: center;
  font-size: 0.875rem;
}

.cart-drawer__footer {
  padding: var(--space-8);
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.checkout-btn {
  display: block;
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

.checkout-btn:hover {
  opacity: 0.8;
}

.editorial-btn {
  display: inline-block;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--text-primary);
  color: var(--text-primary);
  padding: 0 0 var(--space-2) 0;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: opacity 0.3s ease, padding-bottom 0.3s ease;
  cursor: pointer;
}

.editorial-btn:hover {
  opacity: 0.7;
  padding-bottom: var(--space-3);
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-cart-enter-active, .slide-cart-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-cart-enter-from, .slide-cart-leave-to {
  transform: translateX(100%);
}
[dir="rtl"] .slide-cart-enter-from, [dir="rtl"] .slide-cart-leave-to {
  transform: translateX(-100%);
}
</style>
