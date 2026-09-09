<template>
  <div class="checkout-progress">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="progress-step"
      :class="{
        'progress-step--completed': currentStep > index + 1,
        'progress-step--active': currentStep === index + 1
      }"
    >
      <div class="step-indicator">
        <UiIcon v-if="currentStep > index + 1" name="check-circle" :size="16" />
        <span v-else>{{ index + 1 }}</span>
      </div>
      <span class="step-label">{{ step }}</span>
      <div v-if="index < steps.length - 1" class="step-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  steps: {
    type: Array as () => string[],
    default: () => ['Information', 'Address', 'Shipping', 'Payment', 'Review']
  },
  currentStep: { type: Number, default: 1 }
})
</script>

<style scoped>
.checkout-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-x: auto; /* For small mobile screens */
  padding-bottom: var(--space-4);
  scrollbar-width: none;
}

.checkout-progress::-webkit-scrollbar {
  display: none;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 60px;
}

.step-indicator {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 2px solid var(--bg-primary); /* For line overlapping */
  z-index: 2;
  transition: all 0.3s ease;
}

.step-label {
  margin-top: var(--space-2);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

/* Line connecting steps */
.step-line {
  position: absolute;
  top: 0.75rem;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--bg-tertiary);
  z-index: 1;
  transition: all 0.3s ease;
}

[dir="rtl"] .step-line {
  left: auto;
  right: 50%;
}

/* Active State */
.progress-step--active .step-indicator {
  background-color: var(--accent-color);
  color: var(--bg-primary);
  box-shadow: 0 0 0 4px var(--accent-light);
}

.progress-step--active .step-label {
  color: var(--text-primary);
  font-weight: 600;
}

/* Completed State */
.progress-step--completed .step-indicator {
  background-color: var(--color-success);
  color: var(--bg-primary);
}

.progress-step--completed .step-line {
  background-color: var(--color-success);
}
</style>
