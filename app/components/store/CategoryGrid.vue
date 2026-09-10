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
    <NuxtLinkLocale 
      v-for="category in categories" 
      :key="category.id" 
      :to="`/categories/${category.slug}`"
      class="category-card group"
    >
      <div class="category-card__image-wrap">
        <img :src="category.image" :alt="category.name" class="category-card__image" loading="lazy" @error="handleImageError">
        <div class="category-card__overlay"></div>
      </div>
      
      <div class="category-card__content">
        <div class="category-card__pill">
          <h3 class="category-card__title text-body font-semibold tracking-wide">{{ category.name }}</h3>
          <div class="category-card__action">
            <UiIcon name="arrow-up-right" :size="16" class="rtl:-scale-x-100" />
          </div>
        </div>
      </div>
    </NuxtLinkLocale>
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

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; // Modern fallback image
}
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
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.category-card--loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-card__image-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.category-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-card:hover .category-card__image {
  transform: scale(1.08);
}

.category-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
  opacity: 0.7;
  transition: opacity 0.5s ease;
}

.category-card:hover .category-card__overlay {
  opacity: 0.9;
}

.category-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-6);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.category-card__pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  width: 100%;
  max-width: 90%;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
  transform: translateY(10px);
}

.category-card:hover .category-card__pill {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.category-card__title {
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-card__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #ffffff;
  color: var(--text-primary);
  opacity: 0;
  transform: scale(0.8) rotate(-45deg) translateX(-10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

[dir="rtl"] .category-card__action {
  transform: scale(0.8) rotate(45deg) translateX(10px);
}

.category-card:hover .category-card__action {
  opacity: 1;
  transform: scale(1) rotate(0) translateX(0);
}
</style>
