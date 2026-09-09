<template>
  <div class="ui-accordion">
    <button 
      class="ui-accordion__trigger" 
      @click="isOpen = !isOpen" 
      :aria-expanded="isOpen"
    >
      <span class="ui-accordion__title font-semibold">{{ title }}</span>
      <UiIcon 
        name="chevron-down" 
        :size="20" 
        class="ui-accordion__icon" 
        :class="{ 'ui-accordion__icon--open': isOpen }" 
      />
    </button>
    <div 
      class="ui-accordion__content-wrapper" 
      :style="{ maxHeight: isOpen ? '2000px' : '0', opacity: isOpen ? '1' : '0' }"
    >
      <div class="ui-accordion__content text-body text-secondary">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  defaultOpen: { type: Boolean, default: false }
})

const isOpen = ref(false)

// Use mounted hook to respect defaultOpen without causing hydration mismatch if rendered dynamically
onMounted(() => {
  if (props.defaultOpen) isOpen.value = true
})
</script>

<style scoped>
.ui-accordion {
  border-bottom: 1px solid var(--border-light);
}

.ui-accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-block: var(--space-4);
  background: transparent;
  color: var(--text-primary);
  text-align: start;
}

.ui-accordion__trigger:hover .ui-accordion__title {
  color: var(--accent-color);
}

.ui-accordion__title {
  transition: color 0.2s ease;
}

.ui-accordion__icon {
  color: var(--text-muted);
  transition: transform 0.3s ease;
}

.ui-accordion__icon--open {
  transform: rotate(180deg);
}

.ui-accordion__content-wrapper {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.ui-accordion__content {
  padding-bottom: var(--space-4);
}
</style>
