<template>
  <div class="ui-radio-group">
    <label 
      v-for="option in options" 
      :key="option.value"
      class="ui-radio-item"
      :class="{ 
        'ui-radio-item--active': modelValue === option.value,
        'ui-radio-item--disabled': option.disabled
      }"
    >
      <input 
        type="radio" 
        class="ui-radio-input"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="option.disabled"
        @change="$emit('update:modelValue', option.value)"
      >
      <div class="ui-radio-custom">
        <div class="ui-radio-custom-dot"></div>
      </div>
      <div class="ui-radio-content">
        <span class="ui-radio-label">{{ option.label }}</span>
        <span v-if="option.description" class="ui-radio-description">{{ option.description }}</span>
      </div>
      <div v-if="option.rightContent" class="ui-radio-right">
        {{ option.rightContent }}
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: [String, Number, Boolean], required: true },
  name: { type: String, required: true },
  options: {
    type: Array as () => Array<{
      label: string,
      value: string | number | boolean,
      description?: string,
      rightContent?: string,
      disabled?: boolean
    }>,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.ui-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ui-radio-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.ui-radio-item:hover:not(.ui-radio-item--disabled) {
  border-color: var(--text-secondary);
}

.ui-radio-item--active {
  border-color: var(--accent-color);
  background-color: var(--accent-light);
}

.ui-radio-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ui-radio-custom {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 1px solid var(--text-secondary);
  flex-shrink: 0;
  margin-top: 0.125rem;
  transition: all 0.2s ease;
}

.ui-radio-input:focus-visible + .ui-radio-custom {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.ui-radio-item--active .ui-radio-custom {
  border-color: var(--accent-color);
  border-width: 5px;
}

.ui-radio-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ui-radio-label {
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.5;
}

.ui-radio-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.ui-radio-right {
  font-weight: 500;
  color: var(--text-primary);
  flex-shrink: 0;
}
</style>
