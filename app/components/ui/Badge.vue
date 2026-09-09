<template>
  <span :class="['ui-badge', `ui-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (value: string) => ['neutral', 'primary', 'success', 'warning', 'danger'].includes(value)
  }
})
</script>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ui-badge--neutral {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

.ui-badge--primary {
  background-color: var(--accent-color);
  color: #ffffff;
}

.ui-badge--success {
  background-color: var(--color-success);
  color: #ffffff;
}

.ui-badge--warning {
  background-color: var(--color-warning);
  color: #ffffff;
}

.ui-badge--danger {
  background-color: var(--color-danger);
  color: #ffffff;
}
</style>
