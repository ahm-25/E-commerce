<template>
  <div class="ui-quantity">
    <button 
      class="ui-quantity__btn" 
      @click="decrement" 
      :disabled="modelValue <= min" 
      aria-label="Decrease quantity"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
    <input 
      type="number" 
      class="ui-quantity__input" 
      :value="modelValue" 
      @input="onInput" 
      :min="min" 
      :max="max"
      aria-label="Quantity"
    >
    <button 
      class="ui-quantity__btn" 
      @click="increment" 
      :disabled="modelValue >= max" 
      aria-label="Increase quantity"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 }
})

const emit = defineEmits(['update:modelValue'])

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const onInput = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value, 10)
  if (!isNaN(value)) {
    if (value < props.min) emit('update:modelValue', props.min)
    else if (value > props.max) emit('update:modelValue', props.max)
    else emit('update:modelValue', value)
  } else {
    emit('update:modelValue', props.min)
  }
}
</script>

<style scoped>
.ui-quantity {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  height: 2.75rem;
}

.ui-quantity__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 100%;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.ui-quantity__btn:hover:not(:disabled) {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.ui-quantity__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-quantity__input {
  width: 3rem;
  height: 100%;
  text-align: center;
  border: none;
  border-inline: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  font-weight: 500;
  -moz-appearance: textfield;
}

.ui-quantity__input::-webkit-outer-spin-button,
.ui-quantity__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ui-quantity__input:focus {
  outline: none;
}
</style>
