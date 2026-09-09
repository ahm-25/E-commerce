<template>
  <div class="product-variants">
    <div v-for="(group, index) in variantGroups" :key="index" class="variant-group">
      <div class="flex justify-between items-center mb-2">
        <span class="font-medium text-sm">{{ group.name }}</span>
        <span class="text-sm text-secondary">{{ selectedVariants[group.name]?.label || 'Select' }}</span>
      </div>
      
      <!-- Color Swatches -->
      <div v-if="group.type === 'color'" class="variant-options color-options">
        <button 
          v-for="option in group.options" 
          :key="option.id"
          class="color-swatch-btn"
          :class="{ 'color-swatch-btn--active': selectedVariants[group.name]?.id === option.id }"
          @click="selectVariant(group.name, option)"
          :aria-label="`Select color ${option.label}`"
        >
          <span 
            class="color-swatch" 
            :style="{ backgroundColor: option.value }"
            :title="option.label"
          ></span>
        </button>
      </div>

      <!-- Pill Buttons (Sizes, Material, etc.) -->
      <div v-else class="variant-options pill-options">
        <button 
          v-for="option in group.options" 
          :key="option.id"
          class="pill-btn"
          :class="{ 
            'pill-btn--active': selectedVariants[group.name]?.id === option.id,
            'pill-btn--disabled': option.disabled
          }"
          :disabled="option.disabled"
          @click="selectVariant(group.name, option)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  variantGroups: {
    type: Array as () => Array<{
      name: string,
      type: 'color' | 'pill',
      options: Array<{ id: string, label: string, value?: string, disabled?: boolean }>
    }>,
    required: true
  }
})

const emit = defineEmits(['update:selection'])

// Store selected variant for each group name
const selectedVariants = ref<Record<string, any>>({})

// Initialize with first available options
watch(() => props.variantGroups, (groups) => {
  if (!groups) return
  const initialSelection: Record<string, any> = {}
  groups.forEach(g => {
    const available = g.options.find(o => !o.disabled)
    if (available) {
      initialSelection[g.name] = available
    }
  })
  selectedVariants.value = initialSelection
  emit('update:selection', selectedVariants.value)
}, { immediate: true })

const selectVariant = (groupName: string, option: any) => {
  selectedVariants.value = {
    ...selectedVariants.value,
    [groupName]: option
  }
  emit('update:selection', selectedVariants.value)
}
</script>

<style scoped>
.product-variants {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.variant-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

/* Colors */
.color-swatch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  padding: 2px;
}

.color-swatch-btn--active {
  border-color: var(--accent-color);
}

.color-swatch {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid var(--border-color);
}

/* Pills */
.pill-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pill-btn:hover:not(:disabled) {
  border-color: var(--text-primary);
}

.pill-btn--active {
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
}

.pill-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
}
</style>
