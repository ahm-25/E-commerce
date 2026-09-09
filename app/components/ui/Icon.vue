<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="fill"
    :stroke="strokeColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="ui-icon"
    :class="{ 'ui-icon--spin': spin }"
  >
    <path v-if="name === 'star'" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <path v-else-if="name === 'heart'" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <g v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
    <path v-else-if="name === 'moon'" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <circle v-else-if="name === 'user'" cx="12" cy="7" r="4" /><path v-if="name === 'user'" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle v-else-if="name === 'search'" cx="11" cy="11" r="8" /><line v-if="name === 'search'" x1="21" y1="21" x2="16.65" y2="16.65" />
    <path v-else-if="name === 'shopping-bag'" d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line v-if="name === 'shopping-bag'" x1="3" y1="6" x2="21" y2="6" /><path v-if="name === 'shopping-bag'" d="M16 10a4 4 0 0 1-8 0" />
    <path v-else-if="name === 'star-half'" d="M12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2V17.77Z" />
    <path v-else-if="name === 'chevron-down'" d="M6 9l6 6 6-6" />
    <circle v-else-if="name === 'alert-circle'" cx="12" cy="12" r="10" /><line v-if="name === 'alert-circle'" x1="12" y1="8" x2="12" y2="12" /><line v-if="name === 'alert-circle'" x1="12" y1="16" x2="12.01" y2="16" />
    <path v-else-if="name === 'check-circle'" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline v-if="name === 'check-circle'" points="22 4 12 14.01 9 11.01" />
    <circle v-else-if="name === 'info'" cx="12" cy="12" r="10" /><line v-if="name === 'info'" x1="12" y1="16" x2="12" y2="12" /><line v-if="name === 'info'" x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: 'currentColor' },
  filled: { type: Boolean, default: false },
  strokeWidth: { type: Number, default: 2 },
  spin: { type: Boolean, default: false }
})

const fill = computed(() => props.filled ? props.color : 'none')
const strokeColor = computed(() => props.filled ? props.color : props.color)
</script>

<style scoped>
.ui-icon {
  display: inline-block;
  vertical-align: middle;
}
.ui-icon--spin {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
