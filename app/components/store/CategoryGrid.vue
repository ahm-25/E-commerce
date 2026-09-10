<template>
  <div v-if="loading" class="category-grid">
    <div v-for="i in 4" :key="i" class="category-card category-card--loading">
      <UiSkeleton type="rect" width="100%" height="100%" />
      <div class="category-card__content">
        <UiSkeleton type="text" width="60%" style="margin: 0 auto;" />
      </div>
    </div>
  </div>

  <div v-else class="category-grid">
    <NuxtLink 
      v-for="category in categories" 
      :key="category.id" 
      :to="`/categories/${category.slug}`"
      class="category-card"
    >
      <div class="category-card__image-wrap">
        <img :src="category.image" :alt="category.name" class="category-card__image" loading="lazy">
        <div class="category-card__overlay"></div>
      </div>
      <div class="category-card__content">
        <h3 class="category-card__title text-h4 uppercase tracking-widest font-medium">{{ category.name }}</h3>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  categories: {
    type: Array as () => Array<{ id: string | number, name: string, slug: string, image: string }>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-8);
  }
}

.category-card {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 3/4; /* Editorial portrait aspect ratio */
  background-color: var(--bg-tertiary);
}

.category-card--loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-card__image-wrap {
  position: absolute;
  inset: 0;
}

.category-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-card:hover .category-card__image {
  transform: scale(1.05);
}

.category-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 40%);
  opacity: 0.9;
  transition: opacity 0.5s;
}

.category-card:hover .category-card__overlay {
  opacity: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%);
}

.category-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-8) var(--space-6);
  z-index: 10;
  text-align: center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-card:hover .category-card__content {
  transform: translateY(-8px);
}

.category-card__title {
  color: #ffffff; /* Always white due to image overlay */
}
</style>
