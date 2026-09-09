<template>
  <div class="payment-method-ui">
    <div class="bg-secondary rounded-lg p-4 border border-light">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Card Number</label>
        <div class="relative">
          <UiInput 
            v-model="cardData.number" 
            placeholder="0000 0000 0000 0000" 
            maxlength="19"
            class="pl-10"
          />
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Expiration Date (MM/YY)</label>
          <UiInput v-model="cardData.expiry" placeholder="MM/YY" maxlength="5" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Security Code (CVV)</label>
          <div class="relative">
            <UiInput v-model="cardData.cvv" placeholder="123" maxlength="4" type="password" />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted cursor-help" title="3 digits on back of card">
              <UiIcon name="info" :size="16" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Name on Card</label>
        <UiInput v-model="cardData.name" placeholder="John Doe" />
      </div>
    </div>

    <!-- Trust indicators -->
    <div class="flex items-center justify-center gap-2 mt-4 text-xs text-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      Payments are secure and encrypted.
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const emit = defineEmits(['update:valid'])

const cardData = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Simple mock validation
watch(cardData, (newVal) => {
  const isValid = 
    newVal.number.length >= 15 &&
    newVal.expiry.length >= 4 &&
    newVal.cvv.length >= 3 &&
    newVal.name.length > 3
    
  emit('update:valid', isValid)
}, { deep: true })
</script>

<style scoped>
.rounded-lg { border-radius: var(--radius-lg); }
.p-4 { padding: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-1 { margin-bottom: var(--space-1); }
.mt-4 { margin-top: var(--space-4); }
.block { display: block; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.font-medium { font-weight: 500; }
.relative { position: relative; }
.absolute { position: absolute; }
.left-3 { left: 0.75rem; }
[dir="rtl"] .left-3 { left: auto; right: 0.75rem; }
.right-3 { right: 0.75rem; }
[dir="rtl"] .right-3 { right: auto; left: 0.75rem; }
.top-1\/2 { top: 50%; }
.transform { transform: translateY(-50%); }
.text-muted { color: var(--text-muted); }
.cursor-help { cursor: help; }

/* In a real scenario we'd use global utilities, using scoped for self-contained component */
::v-deep(.pl-10) {
  padding-left: 2.5rem;
}
[dir="rtl"] ::v-deep(.pl-10) {
  padding-left: 1rem;
  padding-right: 2.5rem;
}
</style>
