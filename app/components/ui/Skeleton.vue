<template>
  <div 
    :class="['ui-skeleton', `ui-skeleton--${type}`]" 
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  type: { 
    type: String, 
    default: 'rect', 
    validator: (v: string) => ['rect', 'circle', 'text'].includes(v) 
  },
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' }
})
</script>

<style scoped>
.ui-skeleton {
  background-color: var(--bg-tertiary);
  animation: pulse 1.5s infinite ease-in-out;
}

.ui-skeleton--circle { 
  border-radius: 50%; 
}

.ui-skeleton--rect { 
  border-radius: var(--radius-md); 
}

.ui-skeleton--text { 
  border-radius: var(--radius-sm); 
  height: 1.25em; 
  margin-bottom: 0.5em;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}
</style>
