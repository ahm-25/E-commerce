<template>
  <button
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--disabled': disabled, 'ui-button--full': fullWidth }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})
defineEmits(['click'])
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ui-button--full {
  width: 100%;
}

.ui-button:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Sizes */
.ui-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
.ui-button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.ui-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Variants */
.ui-button--primary {
  background-color: var(--accent-color);
  color: #ffffff;
}
.ui-button--primary:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

.ui-button--secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}
.ui-button--secondary:hover:not(:disabled) {
  background-color: var(--border-color);
}

.ui-button--outline {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
.ui-button--outline:hover:not(:disabled) {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.ui-button--ghost {
  background-color: transparent;
  color: var(--text-primary);
}
.ui-button--ghost:hover:not(:disabled) {
  background-color: var(--bg-tertiary);
}

.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
