<template>
  <div class="empty-state">
    <div class="empty-state__icon-wrapper mb-6">
      <UiIcon :name="icon" :size="48" class="empty-state__icon" />
    </div>
    <h3 class="text-h3 font-semibold mb-2">{{ title }}</h3>
    <p class="text-secondary text-body mb-8 max-w-md mx-auto">{{ description }}</p>
    <div class="empty-state__actions" v-if="$slots.action || actionText">
      <slot name="action">
        <UiButton variant="primary" @click="$emit('action-click')">{{ actionText }}</UiButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: { type: String, default: 'search' },
  title: { type: String, default: 'No results found' },
  description: { type: String, default: 'We couldn\'t find anything matching your current criteria. Try adjusting your filters or search terms.' },
  actionText: { type: String, default: 'Clear Filters' }
})

defineEmits(['action-click'])
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-16) var(--space-4);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--border-color);
  height: 100%;
  min-height: 400px;
}

.empty-state__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background-color: var(--bg-tertiary);
  border-radius: 50%;
  color: var(--text-muted);
}

.max-w-md {
  max-width: 28rem;
}

.mx-auto {
  margin-inline: auto;
}
</style>
