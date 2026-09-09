<template>
  <div v-if="loading" class="review-card p-6">
    <div class="flex items-center gap-4 mb-4">
      <UiSkeleton type="circle" width="3rem" height="3rem" />
      <div>
        <UiSkeleton type="text" width="100px" />
        <UiSkeleton type="text" width="60px" />
      </div>
    </div>
    <UiSkeleton type="text" width="100%" />
    <UiSkeleton type="text" width="90%" />
    <UiSkeleton type="text" width="80%" />
  </div>

  <div v-else class="review-card p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex gap-1">
        <UiIcon v-for="i in 5" :key="i" name="star" :size="16" :color="i <= rating ? 'var(--color-warning)' : 'var(--border-color)'" :filled="i <= rating" />
      </div>
      <span class="text-sm text-muted">{{ date }}</span>
    </div>
    <h4 class="font-semibold mb-2">{{ title }}</h4>
    <p class="text-secondary text-sm mb-6 flex-grow">{{ text }}</p>
    <div class="flex items-center gap-3 mt-auto pt-4 border-t border-light">
      <div class="avatar">
        {{ initials }}
      </div>
      <div>
        <p class="font-medium text-sm">{{ name }}</p>
        <p class="text-xs text-muted flex items-center gap-1">
          <UiIcon name="check-circle" :size="12" color="var(--color-success)" />
          Verified Buyer
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  date: { type: String, default: '' },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  loading: { type: Boolean, default: false }
})

const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return props.name.substring(0, 2).toUpperCase()
})
</script>

<style scoped>
.review-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  height: 100%;
}

.p-6 {
  padding: var(--space-6);
}

.border-t {
  border-top: 1px solid var(--border-color);
}

.border-light {
  border-color: var(--border-light);
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}
</style>
