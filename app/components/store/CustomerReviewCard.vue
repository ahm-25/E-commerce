<template>
  <div v-if="loading" class="review-card p-6">
    <UiSkeleton type="text" width="100%" class="mb-2" />
    <UiSkeleton type="text" width="90%" class="mb-2" />
    <UiSkeleton type="text" width="60%" class="mb-8" />
    <UiSkeleton type="text" width="40%" />
  </div>

  <div v-else class="review-card p-6">
    <div class="flex items-center gap-1 mb-6">
      <UiIcon v-for="i in 5" :key="i" name="star" :size="14" :color="i <= rating ? 'var(--text-primary)' : 'var(--border-color)'" :filled="true" />
    </div>
    
    <p class="review-text text-h4 font-light mb-8 flex-grow">"{{ text }}"</p>
    
    <div class="review-author">
      <p class="text-sm font-medium uppercase tracking-widest">{{ name }}</p>
      <p class="text-xs text-muted mt-1">{{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, default: '' },
  date: { type: String, default: '' },
  title: { type: String, default: '' }, // Not used in minimal layout
  text: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
.review-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  align-items: center;
}

.p-6 {
  padding: var(--space-8) var(--space-6);
}

.review-text {
  color: var(--text-primary);
  line-height: 1.6;
}

.review-author {
  margin-top: auto;
  border-top: 1px solid var(--text-primary);
  padding-top: var(--space-4);
  width: 3rem; /* Small separator line effect */
  transition: width 0.3s ease;
}

.review-card:hover .review-author {
  width: 5rem;
}
</style>
