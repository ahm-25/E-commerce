<template>
  <div class="categories-page pb-24">
    <!-- Page Header -->
    <header class="page-header container reveal-on-scroll">
      <h1 class="text-h1 font-light mb-4 text-center">Our Collections</h1>
      <p class="text-body-lg text-secondary text-center max-w-2xl mx-auto">Explore our meticulously curated categories, designed for the modern individual seeking timeless elegance and uncompromising quality.</p>
    </header>

    <!-- Categories Grid -->
    <section class="container mt-16 reveal-on-scroll reveal-delay-200">
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UiSkeleton v-for="i in 4" :key="i" type="rect" height="400px" />
      </div>
      
      <div v-else class="editorial-categories-grid">
        <NuxtLink 
          v-for="(category, index) in categories" 
          :key="category.id" 
          :to="`/category/${category.slug}`" 
          class="category-item"
        >
          <div class="category-image-wrapper">
            <img :src="category.image" :alt="category.name" class="category-image" loading="lazy">
            <div class="category-overlay"></div>
          </div>
          <div class="category-content">
            <h2 class="text-h2 text-white">{{ category.name }}</h2>
            <span class="explore-link mt-4">Explore <UiIcon name="arrow-right" :size="16" class="ml-2 inline-block" /></span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { definePageMeta } from '#imports'
import { useScrollReveal } from '~/composables/useScrollReveal'

definePageMeta({
  layout: 'store'
})

const isLoading = ref(true)
const { registerElement } = useScrollReveal()
const categories = ref([] as any[])

onMounted(() => {
  setTimeout(() => {
    categories.value = [
      { id: 1, name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop' },
      { id: 2, name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop' },
      { id: 3, name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop' },
      { id: 4, name: 'Essentials', slug: 'essentials', image: 'https://images.unsplash.com/photo-1434389678211-19703f8f9026?q=80&w=1200&auto=format&fit=crop' }
    ]
    isLoading.value = false

    nextTick(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(registerElement)
    })
  }, 800)
})
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--space-24) + 60px); /* Account for top nav */
}

.editorial-categories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .editorial-categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.category-item {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  text-decoration: none;
  background-color: var(--bg-secondary);
}

@media (min-width: 1024px) {
  .category-item:nth-child(even) {
    transform: translateY(var(--space-16));
  }
}

.category-image-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%);
  transition: background 0.5s ease;
}

.category-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: var(--space-12);
  z-index: 2;
  text-align: center;
}

.explore-link {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover Interactions */
.category-item:hover .category-image {
  transform: scale(1.05);
}

.category-item:hover .category-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}

.category-item:hover .explore-link {
  opacity: 1;
  transform: translateY(0);
}

.pb-24 {
  padding-bottom: var(--space-32);
}
</style>
