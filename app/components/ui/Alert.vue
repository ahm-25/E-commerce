<template>
  <div class="ui-alert" :class="`ui-alert--${variant}`" role="alert">
    <div class="ui-alert-icon">
      <UiIcon v-if="variant === 'danger'" name="alert-circle" :size="20" />
      <UiIcon v-else-if="variant === 'success'" name="check-circle" :size="20" />
      <UiIcon v-else name="info" :size="20" />
    </div>
    <div class="ui-alert-content">
      <h4 v-if="title" class="ui-alert-title">{{ title }}</h4>
      <p class="ui-alert-message"><slot>{{ message }}</slot></p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String as () => 'info' | 'danger' | 'success' | 'warning', default: 'danger' },
  title: { type: String, default: '' },
  message: { type: String, default: '' }
})
</script>

<style scoped>
.ui-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  margin-bottom: var(--space-4);
}

[dir="rtl"] .ui-alert {
  border-left: none;
  border-right: 4px solid;
}

.ui-alert-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.ui-alert-content {
  flex-grow: 1;
}

.ui-alert-title {
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.ui-alert-message {
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Variants */
.ui-alert--danger {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.ui-alert--success {
  background-color: rgba(34, 197, 94, 0.1);
  border-color: var(--color-success);
  color: var(--color-success);
}

.ui-alert--info {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: var(--accent-color);
  color: var(--accent-color);
}
</style>
