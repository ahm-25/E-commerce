<template>
  <div class="checkout-page section-padding bg-secondary-section min-h-screen">
    <div class="container max-w-6xl">
      <div class="checkout-header mb-8 text-center md:text-left flex justify-between items-center">
        <h1 class="text-h2 font-semibold">Secure Checkout</h1>
        <NuxtLink to="/cart" class="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Cart
        </NuxtLink>
      </div>

      <div class="checkout-layout">
        
        <!-- Left: Checkout Steps -->
        <div class="checkout-main">
          <StoreCheckoutProgress :steps="['Customer', 'Address', 'Shipping', 'Payment', 'Review']" :current-step="currentStep" class="mb-8 hidden sm:flex" />

          <!-- Global Error Alert -->
          <UiAlert v-if="globalError" variant="danger" title="Checkout Error" :message="globalError" class="mb-6" />

          <!-- Step 1: Customer Information -->
          <div class="checkout-step" :class="{'checkout-step--active': currentStep === 1}">
            <div class="step-header">
              <h2 class="text-h3 font-medium">1. Customer Information</h2>
              <button v-if="currentStep > 1" @click="currentStep = 1" class="text-sm text-accent">Edit</button>
            </div>
            
            <div v-show="currentStep === 1" class="step-body">
              <UiAlert v-if="errors.email" variant="danger" :message="errors.email" />
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <UiInput v-model="form.email" type="email" placeholder="you@example.com" />
              </div>
              <UiCheckbox v-model="form.subscribe">Email me with news and offers</UiCheckbox>
              <div class="mt-6 flex justify-end">
                <UiButton variant="primary" @click="validateStep1">Continue to Address</UiButton>
              </div>
            </div>
            
            <div v-show="currentStep > 1" class="step-summary">
              <p class="text-secondary">{{ form.email }}</p>
            </div>
          </div>

          <!-- Step 2: Shipping Address -->
          <div class="checkout-step" :class="{'checkout-step--active': currentStep === 2}">
            <div class="step-header">
              <h2 class="text-h3 font-medium">2. Shipping Address</h2>
              <button v-if="currentStep > 2" @click="currentStep = 2" class="text-sm text-accent">Edit</button>
            </div>
            
            <div v-show="currentStep === 2" class="step-body">
              <UiAlert v-if="errors.address" variant="danger" :message="errors.address" />
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium mb-1">First Name</label>
                  <UiInput v-model="form.firstName" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Last Name</label>
                  <UiInput v-model="form.lastName" />
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Address</label>
                <UiInput v-model="form.address" placeholder="Street address" />
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium mb-1">City</label>
                  <UiInput v-model="form.city" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Postal Code</label>
                  <UiInput v-model="form.zip" />
                </div>
              </div>
              <div class="mt-6 flex justify-between items-center">
                <button class="text-sm text-secondary hover:text-primary" @click="currentStep = 1">Back</button>
                <UiButton variant="primary" @click="validateStep2">Continue to Shipping</UiButton>
              </div>
            </div>
            
            <div v-show="currentStep > 2" class="step-summary">
              <p class="text-secondary">{{ form.firstName }} {{ form.lastName }}</p>
              <p class="text-secondary">{{ form.address }}, {{ form.city }} {{ form.zip }}</p>
            </div>
          </div>

          <!-- Step 3: Shipping Method -->
          <div class="checkout-step" :class="{'checkout-step--active': currentStep === 3}">
            <div class="step-header">
              <h2 class="text-h3 font-medium">3. Shipping Method</h2>
              <button v-if="currentStep > 3" @click="currentStep = 3" class="text-sm text-accent">Edit</button>
            </div>
            
            <div v-show="currentStep === 3" class="step-body">
              <UiRadioGroup 
                v-model="form.shippingMethod" 
                name="shipping" 
                :options="shippingOptions" 
              />
              <div class="mt-6 flex justify-between items-center">
                <button class="text-sm text-secondary hover:text-primary" @click="currentStep = 2">Back</button>
                <UiButton variant="primary" @click="currentStep = 4">Continue to Payment</UiButton>
              </div>
            </div>
            
            <div v-show="currentStep > 3" class="step-summary">
              <p class="text-secondary">{{ selectedShippingLabel }} - {{ formattedShippingPrice }}</p>
            </div>
          </div>

          <!-- Step 4: Payment Method -->
          <div class="checkout-step" :class="{'checkout-step--active': currentStep === 4}">
            <div class="step-header">
              <h2 class="text-h3 font-medium">4. Payment</h2>
              <button v-if="currentStep > 4" @click="currentStep = 4" class="text-sm text-accent">Edit</button>
            </div>
            
            <div v-show="currentStep === 4" class="step-body">
              <UiAlert v-if="errors.payment" variant="danger" :message="errors.payment" />
              <p class="text-sm text-secondary mb-4">All transactions are secure and encrypted.</p>
              
              <UiRadioGroup 
                v-model="form.paymentMethod" 
                name="payment" 
                :options="paymentOptions" 
                class="mb-6"
              />
              
              <div v-if="form.paymentMethod === 'credit_card'">
                <StorePaymentMethod @update:valid="isPaymentValid = $event" />
              </div>
              <div v-else-if="form.paymentMethod === 'paypal'" class="p-6 bg-secondary text-center rounded-lg border border-light">
                <p class="text-body mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
              </div>

              <div class="mt-6 flex justify-between items-center">
                <button class="text-sm text-secondary hover:text-primary" @click="currentStep = 3">Back</button>
                <UiButton variant="primary" @click="validateStep4">Review Order</UiButton>
              </div>
            </div>
            
            <div v-show="currentStep > 4" class="step-summary">
              <p class="text-secondary">
                {{ form.paymentMethod === 'credit_card' ? 'Credit Card (Ending in ****)' : 'PayPal' }}
              </p>
            </div>
          </div>

          <!-- Step 5: Order Review -->
          <div class="checkout-step" :class="{'checkout-step--active': currentStep === 5}">
            <div class="step-header">
              <h2 class="text-h3 font-medium">5. Review & Confirm</h2>
            </div>
            
            <div v-show="currentStep === 5" class="step-body">
              <p class="text-body mb-6">Please review your information above and your order details below. By clicking 'Place Order', you agree to our Terms of Service.</p>
              <div class="flex justify-between items-center">
                <button class="text-sm text-secondary hover:text-primary" @click="currentStep = 4">Back</button>
                <UiButton variant="primary" size="lg" :loading="isProcessing" @click="placeOrder">Place Order - {{ finalTotal }}</UiButton>
              </div>
            </div>
          </div>

        </div>

        <!-- Right: Order Summary (Sticky) -->
        <div class="checkout-sidebar">
          <StoreOrderSummary 
            :subtotal="cartSubtotal"
            :shipping="shippingCost"
            :discount="0"
            :show-coupon="false"
          >
            <template #actions>
              <div class="mt-6">
                <h4 class="text-sm font-medium mb-3">Items in your cart (2)</h4>
                <!-- Mini Cart Items -->
                <div class="flex items-center gap-3 mb-3 pb-3 border-b border-light">
                  <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=200" class="w-12 h-16 object-cover rounded" alt="">
                  <div class="flex-grow">
                    <p class="text-sm font-medium">Minimalist Wool Coat</p>
                    <p class="text-xs text-secondary">Charcoal, M x 1</p>
                  </div>
                  <span class="text-sm font-medium">$299.00</span>
                </div>
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200" class="w-12 h-16 object-cover rounded" alt="">
                  <div class="flex-grow">
                    <p class="text-sm font-medium">Slim Fit Chinos</p>
                    <p class="text-xs text-secondary">Navy, 32x32 x 2</p>
                  </div>
                  <span class="text-sm font-medium">$150.00</span>
                </div>
              </div>
            </template>
          </StoreOrderSummary>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { definePageMeta, navigateTo } from '#imports'

definePageMeta({
  layout: 'store'
})

const currentStep = ref(1)
const globalError = ref('')
const isProcessing = ref(false)
const isPaymentValid = ref(false)

const cartSubtotal = 449.00 // Mock

const form = reactive({
  email: '',
  subscribe: true,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  shippingMethod: 'standard',
  paymentMethod: 'credit_card'
})

const errors = reactive({
  email: '',
  address: '',
  payment: ''
})

const shippingOptions = [
  { label: 'Standard Shipping (3-5 Business Days)', value: 'standard', rightContent: '$15.00' },
  { label: 'Express Shipping (1-2 Business Days)', value: 'express', rightContent: '$35.00' }
]

const paymentOptions = [
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'PayPal', value: 'paypal' }
]

const shippingCost = computed(() => form.shippingMethod === 'standard' ? 15.00 : 35.00)
const selectedShippingLabel = computed(() => shippingOptions.find(o => o.value === form.shippingMethod)?.label)
const formattedShippingPrice = computed(() => `$${shippingCost.value.toFixed(2)}`)
const finalTotal = computed(() => `$${(cartSubtotal + shippingCost.value).toFixed(2)}`)

// Validation Logic
const validateStep1 = () => {
  errors.email = ''
  if (!form.email || !form.email.includes('@')) {
    errors.email = 'Please enter a valid email address.'
    return
  }
  currentStep.value = 2
}

const validateStep2 = () => {
  errors.address = ''
  if (!form.firstName || !form.lastName || !form.address || !form.city || !form.zip) {
    errors.address = 'Please complete all required shipping fields.'
    return
  }
  currentStep.value = 3
}

const validateStep4 = () => {
  errors.payment = ''
  if (form.paymentMethod === 'credit_card' && !isPaymentValid.value) {
    errors.payment = 'Please enter valid credit card details.'
    return
  }
  currentStep.value = 5
}

const placeOrder = () => {
  isProcessing.value = true
  globalError.value = ''
  
  // Simulate network request and potential failure
  setTimeout(() => {
    // 10% chance to simulate a payment failure
    if (Math.random() > 0.9) {
      globalError.value = 'Your payment was declined by the bank. Please try another payment method.'
      currentStep.value = 4
      isProcessing.value = false
    } else {
      navigateTo('/checkout/success')
    }
  }, 2000)
}
</script>

<style scoped>
.bg-secondary-section {
  background-color: var(--bg-secondary);
}

.min-h-screen {
  min-height: 100vh;
}

.max-w-6xl {
  max-width: 72rem;
}

.section-padding {
  padding-block: var(--space-8);
}

.checkout-layout {
  display: flex;
  flex-direction: column-reverse; /* Mobile: steps on top, summary on bottom? Actually standard is summary on bottom or collapsible. Let's do normal column */
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .checkout-layout {
    flex-direction: row;
    align-items: flex-start;
  }
}

.checkout-main {
  flex-grow: 1;
}

.checkout-sidebar {
  width: 100%;
}

@media (min-width: 1024px) {
  .checkout-sidebar {
    width: 380px;
    flex-shrink: 0;
    position: sticky;
    top: 2rem;
  }
}

/* Step Accordion Styling */
.checkout-step {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  overflow: hidden;
  transition: all 0.3s ease;
}

.checkout-step--active {
  border-color: var(--border-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  background-color: var(--bg-primary);
}

.step-body {
  padding: 0 var(--space-6) var(--space-6);
  border-top: 1px solid transparent;
}

.checkout-step--active .step-body {
  border-top-color: var(--border-light);
  padding-top: var(--space-4);
}

.step-summary {
  padding: 0 var(--space-6) var(--space-4);
  font-size: 0.875rem;
}

/* Utilities */
.block { display: block; }
.mb-1 { margin-bottom: var(--space-1); }
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.gap-4 { gap: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.border-b { border-bottom: 1px solid var(--border-color); }
.w-12 { width: 3rem; }
.h-16 { height: 4rem; }
.object-cover { object-fit: cover; }
.rounded { border-radius: var(--radius-sm); }
</style>
