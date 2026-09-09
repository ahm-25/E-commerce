<template>
  <div class="ui-select-wrapper">
    <select 
      class="ui-select" 
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :aria-label="ariaLabel"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <div class="ui-select-icon">
      <UiIcon name="chevron-down" :size="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { 
    type: Array as () => Array<{ label: string, value: string | number }>, 
    required: true 
  },
  ariaLabel: { type: String, default: 'Select an option' }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.ui-select-wrapper {
  position: relative;
  display: inline-block;
  min-width: 180px;
}

.ui-select {
  width: 100%;
  appearance: none;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

[dir="rtl"] .ui-select {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
}

.ui-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.ui-select-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
  pointer-events: none;
  color: var(--text-secondary);
}

[dir="rtl"] .ui-select-icon {
  right: auto;
  left: 0.75rem;
}
</style>
