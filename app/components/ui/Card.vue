<template>
  <div class="ui-card" :class="[ `ui-card--padding-${padding}` ]">
    <div v-if="$slots.header" class="ui-card-header">
      <slot name="header" />
    </div>
    <div class="ui-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value: string) => ['none', 'sm', 'md', 'lg'].includes(value)
  }
})
</script>

<style scoped>
.ui-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;
}

.ui-card:hover {
  box-shadow: var(--shadow-md);
}

.ui-card-header {
  padding: var(--card-padding);
  border-bottom: 1px solid var(--border-light);
}

.ui-card-body {
  padding: var(--card-padding);
}

.ui-card-footer {
  padding: var(--card-padding);
  border-top: 1px solid var(--border-light);
  background-color: var(--bg-secondary);
}

.ui-card--padding-none { --card-padding: 0; }
.ui-card--padding-sm { --card-padding: var(--space-3); }
.ui-card--padding-md { --card-padding: var(--space-4); }
.ui-card--padding-lg { --card-padding: var(--space-6); }
</style>
