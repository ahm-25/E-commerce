<template>
  <div class="order-summary">
    <h3 class="text-h3 font-semibold mb-6">{{ $t('orderSummary.title') }}</h3>

    <div v-if="loading" class="order-summary-skeleton">
      <UiSkeleton type="text" width="100%" class="mb-4" />
      <UiSkeleton type="text" width="100%" class="mb-4" />
      <UiSkeleton type="text" width="100%" class="mb-6" />
      <UiSkeleton type="rect" width="100%" height="2px" class="mb-6" />
      <UiSkeleton type="text" width="100%" height="2rem" />
    </div>

    <div v-else>
      <div class="summary-row text-body text-secondary mb-4">
        <span>{{ $t('orderSummary.subtotal') }}</span>
        <span class="font-medium text-primary">{{ formattedSubtotal }}</span>
      </div>
      
      <div v-if="discount > 0" class="summary-row text-body text-success mb-4">
        <span>{{ $t('orderSummary.discount') }}</span>
        <span class="font-medium">-{{ formattedDiscount }}</span>
      </div>

      <div class="summary-row text-body text-secondary mb-6">
        <span>{{ $t('orderSummary.shipping') }}</span>
        <span class="font-medium text-primary">{{ shipping === 0 ? $t('common.free') : formattedShipping }}</span>
      </div>

      <div class="border-t border-light pt-6 mb-8">
        <div class="summary-row">
          <span class="text-h2 font-semibold">{{ $t('orderSummary.total') }}</span>
          <span class="text-h2 font-semibold">{{ formattedTotal }}</span>
        </div>
        <p class="text-xs text-muted mt-1 text-right">{{ $t('orderSummary.includingVat') }}</p>
      </div>

      <div v-if="showCoupon" class="coupon-section mb-8">
        <p class="text-sm font-medium mb-3">{{ $t('orderSummary.couponLabel') }}</p>
        <div class="coupon-input-group">
          <UiInput v-model="couponCode" :placeholder="$t('orderSummary.couponPlaceholder')" class="flex-grow" />
          <UiButton variant="outline" @click="applyCoupon" :disabled="!couponCode" class="coupon-btn">{{ $t('common.apply') }}</UiButton>
        </div>
      </div>

      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePrice } from '~/composables/usePrice'

const props = defineProps({
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  showCoupon: { type: Boolean, default: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['apply-coupon'])

const couponCode = ref('')

const { formatPrice } = usePrice()
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
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-float);
  border: 1px solid var(--border-light);
  transition: box-shadow 0.3s ease;
}

.order-summary:hover {
  box-shadow: 0 20px 40px -10px rgb(0 0 0 / 0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coupon-input-group {
  display: flex;
  gap: var(--space-2);
}

.coupon-btn {
  white-space: nowrap;
}

.text-success { color: var(--color-success); }
.text-primary { color: var(--text-primary); }
.border-t { border-top: 1px solid var(--border-color); }
.border-light { border-color: var(--border-light); }
.pt-6 { padding-top: var(--space-6); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-8 { margin-bottom: var(--space-8); }
.flex-grow { flex-grow: 1; }
.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
</style>
