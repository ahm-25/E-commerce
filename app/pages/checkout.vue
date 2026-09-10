<template>
  <div class="checkout-page section-padding bg-secondary-section min-h-screen">
    <div class="container max-w-6xl">
      <div class="checkout-header mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 class="text-h1 font-semibold">{{ t('checkout.title') }}</h1>
        <NuxtLinkLocale to="/cart" class="back-link flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors">
          <UiIcon name="arrow-left" :size="16" />
          {{ t('checkout.returnToCart') }}
        </NuxtLinkLocale>
      </div>

      <div class="checkout-layout">
        
        <!-- Left: Checkout Steps -->
        <div class="checkout-main">
          <StoreCheckoutProgress :steps="progressSteps" :current-step="currentStep" class="mb-10 hidden sm:flex" />

          <!-- Global Error Alert -->
          <UiAlert v-if="globalError" variant="danger" :title="t('checkout.errorTitle')" :message="globalError" class="mb-6" />

          <div class="checkout-steps-container">
            <!-- Step 1: Customer Information -->
            <div class="checkout-step" :class="{'checkout-step--active': currentStep === 1, 'checkout-step--completed': currentStep > 1}">
              <div class="step-header" @click="currentStep > 1 ? currentStep = 1 : null" :class="{'cursor-pointer': currentStep > 1}">
                <div class="flex items-center gap-4">
                  <div class="step-number" :class="{'active': currentStep === 1, 'completed': currentStep > 1}">
                    <UiIcon v-if="currentStep > 1" name="check" :size="16" />
                    <span v-else>1</span>
                  </div>
                  <h2 class="text-h3 font-medium" :class="{'text-secondary': currentStep !== 1}">{{ t('checkout.customerInformation') }}</h2>
                </div>
                <button v-if="currentStep > 1" @click.stop="currentStep = 1" class="text-sm font-medium text-accent hover:underline">{{ t('common.edit') }}</button>
              </div>
              
              <div v-show="currentStep === 1" class="step-body">
                <UiAlert v-if="errors.email" variant="danger" :message="errors.email" class="mb-4" />
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-2">{{ t('checkout.emailLabel') }}</label>
                  <UiInput v-model="form.email" type="email" :placeholder="t('checkout.emailPlaceholder')" size="lg" />
                </div>
                <UiCheckbox v-model="form.subscribe" class="mt-4">{{ t('checkout.subscribe') }}</UiCheckbox>
                <div class="mt-8 flex justify-end border-t border-light pt-6">
                  <UiButton variant="primary" size="lg" @click="validateStep1">{{ t('checkout.continueToAddress') }}</UiButton>
                </div>
              </div>
              
              <div v-show="currentStep > 1" class="step-summary">
                <p class="text-secondary">{{ form.email }}</p>
              </div>
            </div>

            <!-- Step 2: Shipping Address -->
            <div class="checkout-step" :class="{'checkout-step--active': currentStep === 2, 'checkout-step--completed': currentStep > 2}">
              <div class="step-header" @click="currentStep > 2 ? currentStep = 2 : null" :class="{'cursor-pointer': currentStep > 2}">
                <div class="flex items-center gap-4">
                  <div class="step-number" :class="{'active': currentStep === 2, 'completed': currentStep > 2}">
                    <UiIcon v-if="currentStep > 2" name="check" :size="16" />
                    <span v-else>2</span>
                  </div>
                  <h2 class="text-h3 font-medium" :class="{'text-secondary': currentStep !== 2}">{{ t('checkout.shippingAddress') }}</h2>
                </div>
                <button v-if="currentStep > 2" @click.stop="currentStep = 2" class="text-sm font-medium text-accent hover:underline">{{ t('common.edit') }}</button>
              </div>
              
              <div v-show="currentStep === 2" class="step-body">
                <UiAlert v-if="errors.address" variant="danger" :message="errors.address" class="mb-4" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">{{ t('checkout.firstName') }}</label>
                    <UiInput v-model="form.firstName" size="lg" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">{{ t('checkout.lastName') }}</label>
                    <UiInput v-model="form.lastName" size="lg" />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-2">{{ t('checkout.address') }}</label>
                  <UiInput v-model="form.address" :placeholder="t('checkout.streetAddress')" size="lg" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">{{ t('checkout.city') }}</label>
                    <UiInput v-model="form.city" size="lg" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">{{ t('checkout.postalCode') }}</label>
                    <UiInput v-model="form.zip" size="lg" />
                  </div>
                </div>
                <div class="mt-8 flex justify-between items-center border-t border-light pt-6">
                  <button class="text-sm font-medium text-secondary hover:text-primary flex items-center gap-2 transition-colors" @click="currentStep = 1">
                    <UiIcon name="chevron-left" :size="16" /> {{ t('common.back') }}
                  </button>
                  <UiButton variant="primary" size="lg" @click="validateStep2">{{ t('checkout.continueToShipping') }}</UiButton>
                </div>
              </div>
              
              <div v-show="currentStep > 2" class="step-summary">
                <p class="text-secondary">{{ form.firstName }} {{ form.lastName }}</p>
                <p class="text-secondary mt-1">{{ form.address }}, {{ form.city }} {{ form.zip }}</p>
              </div>
            </div>

            <!-- Step 3: Shipping Method -->
            <div class="checkout-step" :class="{'checkout-step--active': currentStep === 3, 'checkout-step--completed': currentStep > 3}">
              <div class="step-header" @click="currentStep > 3 ? currentStep = 3 : null" :class="{'cursor-pointer': currentStep > 3}">
                <div class="flex items-center gap-4">
                  <div class="step-number" :class="{'active': currentStep === 3, 'completed': currentStep > 3}">
                    <UiIcon v-if="currentStep > 3" name="check" :size="16" />
                    <span v-else>3</span>
                  </div>
                  <h2 class="text-h3 font-medium" :class="{'text-secondary': currentStep !== 3}">{{ t('checkout.shippingMethod') }}</h2>
                </div>
                <button v-if="currentStep > 3" @click.stop="currentStep = 3" class="text-sm font-medium text-accent hover:underline">{{ t('common.edit') }}</button>
              </div>
              
              <div v-show="currentStep === 3" class="step-body">
                <UiRadioGroup 
                  v-model="form.shippingMethod" 
                  name="shipping" 
                  :options="shippingOptions" 
                  class="shipping-options"
                />
                <div class="mt-8 flex justify-between items-center border-t border-light pt-6">
                  <button class="text-sm font-medium text-secondary hover:text-primary flex items-center gap-2 transition-colors" @click="currentStep = 2">
                    <UiIcon name="chevron-left" :size="16" /> {{ t('common.back') }}
                  </button>
                  <UiButton variant="primary" size="lg" @click="currentStep = 4">{{ t('checkout.continueToPayment') }}</UiButton>
                </div>
              </div>
              
              <div v-show="currentStep > 3" class="step-summary">
                <p class="text-secondary flex justify-between">
                  <span>{{ selectedShippingLabel }}</span>
                  <span class="font-medium text-primary">{{ formattedShippingPrice }}</span>
                </p>
              </div>
            </div>

            <!-- Step 4: Payment Method -->
            <div class="checkout-step" :class="{'checkout-step--active': currentStep === 4, 'checkout-step--completed': currentStep > 4}">
              <div class="step-header" @click="currentStep > 4 ? currentStep = 4 : null" :class="{'cursor-pointer': currentStep > 4}">
                <div class="flex items-center gap-4">
                  <div class="step-number" :class="{'active': currentStep === 4, 'completed': currentStep > 4}">
                    <UiIcon v-if="currentStep > 4" name="check" :size="16" />
                    <span v-else>4</span>
                  </div>
                  <h2 class="text-h3 font-medium" :class="{'text-secondary': currentStep !== 4}">{{ t('checkout.payment') }}</h2>
                </div>
                <button v-if="currentStep > 4" @click.stop="currentStep = 4" class="text-sm font-medium text-accent hover:underline">{{ t('common.edit') }}</button>
              </div>
              
              <div v-show="currentStep === 4" class="step-body">
                <UiAlert v-if="errors.payment" variant="danger" :message="errors.payment" class="mb-4" />
                <p class="text-sm text-secondary mb-6 flex items-center gap-2">
                  <UiIcon name="lock" :size="14" />
                  {{ t('checkout.secureNote') }}
                </p>
                
                <UiRadioGroup 
                  v-model="form.paymentMethod" 
                  name="payment" 
                  :options="paymentOptions" 
                  class="mb-6"
                />
                
                <div v-if="form.paymentMethod === 'credit_card'" class="payment-box">
                  <StorePaymentMethod @update:valid="isPaymentValid = $event" />
                </div>
                <div v-else-if="form.paymentMethod === 'paypal'" class="payment-box paypal-box">
                  <UiIcon name="credit-card" :size="32" class="mb-3 text-secondary" />
                  <p class="text-body text-secondary">{{ t('checkout.paypalNote') }}</p>
                </div>

                <div class="mt-8 flex justify-between items-center border-t border-light pt-6">
                  <button class="text-sm font-medium text-secondary hover:text-primary flex items-center gap-2 transition-colors" @click="currentStep = 3">
                    <UiIcon name="chevron-left" :size="16" /> {{ t('common.back') }}
                  </button>
                  <UiButton variant="primary" size="lg" @click="validateStep4">{{ t('checkout.reviewOrder') }}</UiButton>
                </div>
              </div>
              
              <div v-show="currentStep > 4" class="step-summary">
                <p class="text-secondary flex items-center gap-2">
                  <UiIcon :name="form.paymentMethod === 'credit_card' ? 'credit-card' : 'external-link'" :size="16" />
                  {{ form.paymentMethod === 'credit_card' ? t('checkout.creditCardMasked') : t('checkout.paypal') }}
                </p>
              </div>
            </div>

            <!-- Step 5: Order Review -->
            <div class="checkout-step" :class="{'checkout-step--active': currentStep === 5}">
              <div class="step-header">
                <div class="flex items-center gap-4">
                  <div class="step-number" :class="{'active': currentStep === 5}">5</div>
                  <h2 class="text-h3 font-medium">{{ t('checkout.reviewAndConfirm') }}</h2>
                </div>
              </div>
              
              <div v-show="currentStep === 5" class="step-body">
                <div class="review-box mb-8">
                  <p class="text-body text-secondary">
                    <i18n-t keypath="checkout.reviewNote" scope="global">
                      <template #terms><a href="#" class="text-accent hover:underline">{{ t('checkout.termsOfService') }}</a></template>
                      <template #privacy><a href="#" class="text-accent hover:underline">{{ t('checkout.privacyPolicy') }}</a></template>
                    </i18n-t>
                  </p>
                </div>
                <div class="flex justify-between items-center border-t border-light pt-6">
                  <button class="text-sm font-medium text-secondary hover:text-primary flex items-center gap-2 transition-colors" @click="currentStep = 4">
                    <UiIcon name="chevron-left" :size="16" /> {{ t('common.back') }}
                  </button>
                  <UiButton variant="primary" size="lg" :loading="isProcessing" class="place-order-btn" @click="placeOrder">
                    <UiIcon name="lock" :size="16" class="mr-2" />
                    {{ t('checkout.placeOrder', { total: finalTotal }) }}
                  </UiButton>
                </div>
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
              <div class="mt-8 border-t border-light pt-6">
                <h4 class="text-base font-semibold mb-4">{{ t('checkout.itemsInOrder') }}</h4>
                <div class="mini-cart-items">
                  <div class="mini-cart-item">
                    <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=200" class="mini-cart-img" alt="">
                    <div class="mini-cart-details">
                      <p class="text-sm font-semibold text-primary">Minimalist Wool Coat</p>
                      <p class="text-xs text-secondary mt-1">{{ t('product.demo.charcoal') }}, M <span class="mx-1 text-border">•</span> {{ t('checkout.qty', { count: 1 }) }}</p>
                    </div>
                    <span class="text-sm font-semibold">{{ formatPrice(299) }}</span>
                  </div>
                  
                  <div class="mini-cart-item">
                    <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200" class="mini-cart-img" alt="">
                    <div class="mini-cart-details">
                      <p class="text-sm font-semibold text-primary">Slim Fit Chinos</p>
                      <p class="text-xs text-secondary mt-1">{{ t('product.demo.navy') }}, 32x32 <span class="mx-1 text-border">•</span> {{ t('checkout.qty', { count: 2 }) }}</p>
                    </div>
                    <span class="text-sm font-semibold">{{ formatPrice(150) }}</span>
                  </div>
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
import { definePageMeta, navigateTo, useI18n, useLocalePath } from '#imports'
import { usePrice } from '~/composables/usePrice'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()
const localePath = useLocalePath()
const { formatPrice } = usePrice()

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

const progressSteps = computed(() => [
  t('checkout.steps.customer'),
  t('checkout.steps.address'),
  t('checkout.steps.shipping'),
  t('checkout.steps.payment'),
  t('checkout.steps.review')
])

const shippingOptions = computed(() => [
  { label: t('checkout.standardShipping'), value: 'standard', rightContent: formatPrice(15) },
  { label: t('checkout.expressShipping'), value: 'express', rightContent: formatPrice(35) }
])

const paymentOptions = computed(() => [
  { label: t('checkout.creditCard'), value: 'credit_card' },
  { label: t('checkout.paypal'), value: 'paypal' }
])

const shippingCost = computed(() => form.shippingMethod === 'standard' ? 15.00 : 35.00)
const selectedShippingLabel = computed(() => shippingOptions.value.find(o => o.value === form.shippingMethod)?.label)
const formattedShippingPrice = computed(() => formatPrice(shippingCost.value))
const finalTotal = computed(() => formatPrice(cartSubtotal + shippingCost.value))

// Validation Logic
const validateStep1 = () => {
  errors.email = ''
  if (!form.email || !form.email.includes('@')) {
    errors.email = t('checkout.errors.email')
    return
  }
  currentStep.value = 2
}

const validateStep2 = () => {
  errors.address = ''
  if (!form.firstName || !form.lastName || !form.address || !form.city || !form.zip) {
    errors.address = t('checkout.errors.address')
    return
  }
  currentStep.value = 3
}

const validateStep4 = () => {
  errors.payment = ''
  if (form.paymentMethod === 'credit_card' && !isPaymentValid.value) {
    errors.payment = t('checkout.errors.payment')
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
      globalError.value = t('checkout.errors.declined')
      currentStep.value = 4
      isProcessing.value = false
    } else {
      navigateTo(localePath('/checkout/success'))
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
  margin: 0 auto;
}

.section-padding {
  padding-block: var(--space-8);
}

@media (min-width: 1024px) {
  .section-padding {
    padding-block: var(--space-12);
  }
}

.checkout-layout {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .checkout-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-12);
  }
}

.checkout-main {
  flex-grow: 1;
}

.checkout-steps-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.checkout-sidebar {
  width: 100%;
}

@media (min-width: 1024px) {
  .checkout-sidebar {
    width: 420px;
    flex-shrink: 0;
    position: sticky;
    top: 6rem;
    z-index: 10;
  }
}

/* Step Accordion Styling */
.checkout-step {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.checkout-step--active {
  border-color: var(--border-color);
  box-shadow: var(--shadow-lg);
}

.checkout-step--completed {
  background-color: var(--bg-primary);
}

.checkout-step--completed .step-header {
  background-color: transparent;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  background-color: var(--bg-primary);
  transition: background-color 0.2s ease;
}

.checkout-step--completed .step-header:hover {
  background-color: var(--bg-tertiary);
}

.step-body {
  padding: 0 var(--space-6) var(--space-8);
  border-top: 1px solid transparent;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.checkout-step--active .step-body {
  border-top-color: var(--border-light);
  padding-top: var(--space-6);
}

.step-summary {
  padding: 0 var(--space-6) var(--space-6);
  font-size: 0.875rem;
}

/* Step Numbers */
.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: var(--border-light);
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.step-number.active {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

.step-number.completed {
  background-color: var(--color-success);
  color: #fff;
}

/* Mini Cart */
.mini-cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.mini-cart-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-light);
}

.mini-cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.mini-cart-img {
  width: 4rem;
  height: 5rem;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.mini-cart-details {
  flex-grow: 1;
}

/* Payment Box */
.payment-box {
  padding: var(--space-6);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
}

.paypal-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--bg-secondary);
  padding: var(--space-8);
}

/* Review Box */
.review-box {
  padding: var(--space-6);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.place-order-btn {
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.place-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-float);
}

/* Utilities */
.block { display: block; }
.mb-2 { margin-bottom: var(--space-2); }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.gap-4 { gap: var(--space-4); }
.mt-8 { margin-top: var(--space-8); }
.border-t { border-top: 1px solid var(--border-light); }
.pt-6 { padding-top: var(--space-6); }
.cursor-pointer { cursor: pointer; }
.text-border { color: var(--border-color); }
</style>
