<template>
  <div class="order-summary">
    <h3 class="text-h3 font-semibold mb-6">Order Summary</h3>

    <div v-if="loading" class="order-summary-skeleton">
      <UiSkeleton type="text" width="100%" class="mb-4" />
      <UiSkeleton type="text" width="100%" class="mb-4" />
      <UiSkeleton type="text" width="100%" class="mb-6" />
      <UiSkeleton type="rect" width="100%" height="2px" class="mb-6" />
      <UiSkeleton type="text" width="100%" height="2rem" />
    </div>

    <div v-else>
      <div class="summary-row text-body text-secondary mb-3">
        <span>Subtotal</span>
        <span class="font-medium text-primary">{{ formattedSubtotal }}</span>
      </div>
      
      <div v-if="discount > 0" class="summary-row text-body text-success mb-3">
        <span>Discount</span>
        <span class="font-medium">-{{ formattedDiscount }}</span>
      </div>

      <div class="summary-row text-body text-secondary mb-6">
        <span>Shipping</span>
        <span class="font-medium text-primary">{{ shipping === 0 ? 'Free' : formattedShipping }}</span>
      </div>

      <div class="border-t border-light pt-4 mb-6">
        <div class="summary-row">
          <span class="text-h3 font-semibold">Total</span>
          <span class="text-h3 font-semibold">{{ formattedTotal }}</span>
        </div>
      </div>

      <div v-if="showCoupon" class="coupon-section mb-6">
        <p class="text-sm font-medium mb-2">Gift card or discount code</p>
        <div class="flex gap-2">
          <UiInput v-model="couponCode" placeholder="Enter code" class="flex-grow" />
          <UiButton variant="outline" @click="applyCoupon" :disabled="!couponCode">Apply</UiButton>
        </div>
      </div>

      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  showCoupon: { type: Boolean, default: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['apply-coupon'])

const couponCode = ref('')

const formatPrice = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
const formattedSubtotal = computed(() => formatPrice(props.subtotal))
const formattedDiscount = computed(() => formatPrice(props.discount))
const formattedShipping = computed(() => formatPrice(props.shipping))
const formattedTotal = computed(() => formatPrice(props.subtotal - props.discount + props.shipping))

const applyCoupon = () => {
  emit('apply-coupon', couponCode.value)
  couponCode.value = ''
}
</script>

<style scoped>
.order-summary {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--border-light);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-success { color: var(--color-success); }
.text-primary { color: var(--text-primary); }
.border-t { border-top: 1px solid var(--border-color); }
.border-light { border-color: var(--border-light); }
.pt-4 { padding-top: var(--space-4); }
.flex-grow { flex-grow: 1; }
</style>
