<template>
  <label class="ui-checkbox-wrapper" :class="{ 'ui-checkbox-wrapper--disabled': disabled }">
    <div class="ui-checkbox-input-container">
      <input 
        type="checkbox" 
        class="ui-checkbox" 
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      >
      <div class="ui-checkbox-custom" :class="{ 'ui-checkbox-custom--checked': modelValue }">
        <svg v-if="modelValue" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
    <span class="ui-checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<style scoped>
.ui-checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}

.ui-checkbox-wrapper--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-checkbox-input-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.ui-checkbox {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
  margin: 0;
  z-index: 10;
}

.ui-checkbox-custom {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-primary);
  transition: all 0.2s ease;
  color: white;
}

.ui-checkbox:focus-visible + .ui-checkbox-custom {
  outline: 2px solid var(--accent-light);
  outline-offset: 2px;
}

.ui-checkbox-wrapper:hover:not(.ui-checkbox-wrapper--disabled) .ui-checkbox-custom:not(.ui-checkbox-custom--checked) {
  border-color: var(--text-secondary);
}

.ui-checkbox-custom--checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.ui-checkbox-label {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
}
</style>
