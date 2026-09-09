<template>
  <div class="success-page section-padding min-h-screen flex items-center justify-center">
    <div class="success-card">
      <div class="success-icon-wrapper mb-6">
        <UiIcon name="check-circle" :size="48" class="text-success" />
      </div>
      
      <h1 class="text-h1 mb-2">Thank you for your order!</h1>
      <p class="text-secondary text-body mb-8">
        Order <span class="font-semibold text-primary">#ORD-{{ orderNumber }}</span> has been placed successfully. 
        We've sent a confirmation email to your inbox.
      </p>

      <div class="order-details text-left mb-8">
        <h3 class="font-medium mb-3 border-b border-light pb-2">Order Updates</h3>
        <p class="text-sm text-secondary mb-4">You will receive shipping and tracking updates via email as soon as your order ships.</p>
        
        <div class="bg-secondary p-4 rounded-lg">
          <p class="text-sm font-medium mb-1">Shipping to:</p>
          <p class="text-sm text-secondary">John Doe</p>
          <p class="text-sm text-secondary">123 Main Street</p>
          <p class="text-sm text-secondary">New York, 10001</p>
        </div>
      </div>

      <UiButton variant="primary" size="lg" full-width @click="navigateTo('/')">Continue Shopping</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo } from '#imports'

definePageMeta({
  layout: 'store'
})

// Generate random order number for simulation
const orderNumber = Math.floor(100000 + Math.random() * 900000)
</script>

<style scoped>
.success-page {
  background-color: var(--bg-secondary);
  text-align: center;
}

.min-h-screen { min-height: calc(100vh - 80px); }

.success-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  max-width: 32rem;
  width: 100%;
  margin-inline: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.success-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: 50%;
  margin-inline: auto;
}

.text-success { color: var(--color-success); }
.border-b { border-bottom: 1px solid var(--border-light); }
.p-4 { padding: var(--space-4); }
.rounded-lg { border-radius: var(--radius-lg); }
.text-left { text-align: left; }
[dir="rtl"] .text-left { text-align: right; }
</style>
