<template>
  <div class="success-page section-padding min-h-screen flex items-center justify-center">
    <div class="success-card reveal-animation">
      <div class="success-icon-wrapper mb-8">
        <div class="icon-pulse-ring"></div>
        <UiIcon name="check" :size="40" class="text-white relative z-10 check-icon" stroke-width="3" />
      </div>
      
      <h1 class="text-h1 mb-3 font-semibold text-primary">{{ t('success.title') }}</h1>
      <p class="text-secondary text-body mb-10 text-center px-4">
        <i18n-t keypath="success.message" scope="global">
          <template #orderNumber>
            <span class="font-bold text-primary tracking-wide">#ORD-{{ orderNumber }}</span>
          </template>
        </i18n-t>
      </p>

      <div class="order-receipt mb-10">
        <h3 class="text-sm font-semibold mb-4 uppercase tracking-wider text-primary border-b border-light pb-3">{{ t('success.shippingDetails') }}</h3>
        
        <div class="receipt-content">
          <div class="receipt-row">
            <span class="text-sm text-secondary">{{ t('success.customer') }}</span>
            <span class="text-sm font-medium text-primary">{{ t('success.customerName') }}</span>
          </div>
          <div class="receipt-row">
            <span class="text-sm text-secondary">{{ t('success.address') }}</span>
            <span class="text-sm font-medium text-primary text-right">123 Main Street<br>New York, NY 10001</span>
          </div>
          <div class="receipt-row">
            <span class="text-sm text-secondary">{{ t('success.shippingMethod') }}</span>
            <span class="text-sm font-medium text-primary">{{ t('success.standardDelivery') }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UiButton variant="outline" size="lg" class="w-full sm:w-auto" @click="navigateTo(localePath('/account/orders'))">{{ t('success.viewOrder') }}</UiButton>
        <UiButton variant="primary" size="lg" class="w-full sm:w-auto" @click="navigateTo(localePath('/'))">{{ t('common.continueShopping') }}</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo, useI18n, useLocalePath } from '#imports'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()
const localePath = useLocalePath()

// Generate random order number for simulation
const orderNumber = Math.floor(100000 + Math.random() * 900000)
</script>

<style scoped>
.success-page {
  background-color: var(--bg-secondary);
  text-align: center;
}

.min-h-screen { min-height: 100vh; }

.success-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-8);
  max-width: 36rem;
  width: 100%;
  margin-inline: auto;
  box-shadow: var(--shadow-float);
  position: relative;
  overflow: hidden;
}

/* Entrance Animation */
.reveal-animation {
  animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(20px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Icon Styling */
.success-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background-color: var(--color-success);
  border-radius: 50%;
  margin-inline: auto;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.icon-pulse-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 2px solid var(--color-success);
  animation: pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  opacity: 0;
}

@keyframes pulseRing {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

.check-icon {
  animation: checkDraw 0.6s ease-out 0.3s both;
}

@keyframes checkDraw {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Receipt Styling */
.order-receipt {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  text-align: left;
}

[dir="rtl"] .order-receipt { text-align: right; }

.receipt-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Utilities */
.text-white { color: #ffffff; }
.text-success { color: var(--color-success); }
.border-b { border-bottom: 1px solid var(--border-color); }
.text-right { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
</style>
