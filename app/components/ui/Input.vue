<template>
  <div class="ui-input-wrapper">
    <label v-if="label" class="ui-input-label" :for="id">{{ label }}</label>
    <div class="ui-input-container">
      <span v-if="$slots.prefix" class="ui-input-prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        class="ui-input"
        :class="{ 'ui-input--with-prefix': $slots.prefix, 'ui-input--with-suffix': $slots.suffix }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <span v-if="$slots.suffix" class="ui-input-suffix">
        <slot name="suffix" />
      </span>
    </div>
    <span v-if="error" class="ui-input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from '#imports'

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const id = useId()
</script>

<style scoped>
.ui-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ui-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.ui-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.ui-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
  font-size: 1rem;
}

.ui-input::placeholder {
  color: var(--text-muted);
}

.ui-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.ui-input--with-prefix {
  padding-inline-start: 2.5rem;
}

.ui-input--with-suffix {
  padding-inline-end: 2.5rem;
}

.ui-input-prefix,
.ui-input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.ui-input-prefix {
  inset-inline-start: 0.75rem;
}

.ui-input-suffix {
  inset-inline-end: 0.75rem;
}

.ui-input-error {
  font-size: 0.75rem;
  color: var(--color-danger);
  margin-top: 0.25rem;
}
</style>
