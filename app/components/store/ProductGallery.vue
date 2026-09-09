<template>
  <div v-if="loading" class="product-gallery">
    <UiSkeleton type="rect" class="gallery-main-skeleton" />
    <div class="gallery-thumbnails">
      <UiSkeleton v-for="i in 4" :key="i" type="rect" class="gallery-thumbnail-skeleton" />
    </div>
  </div>

  <div v-else class="product-gallery">
    <!-- Main Image -->
    <div 
      class="gallery-main" 
      @mousemove="handleZoom" 
      @mouseleave="resetZoom"
      ref="mainImageContainer"
    >
      <img 
        :src="activeImage" 
        :alt="title" 
        class="gallery-main-image"
        :style="zoomStyle"
      >
      <!-- Optional Fullscreen Button for mobile could go here -->
    </div>

    <!-- Thumbnails -->
    <div class="gallery-thumbnails" v-if="images.length > 1">
      <button 
        v-for="(image, index) in images" 
        :key="index"
        class="gallery-thumbnail-btn"
        :class="{ 'gallery-thumbnail-btn--active': activeIndex === index }"
        @click="setActiveImage(index)"
        :aria-label="`View image ${index + 1}`"
      >
        <img :src="image" :alt="`${title} thumbnail ${index + 1}`" class="gallery-thumbnail-image">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  images: { type: Array as () => string[], default: () => [] },
  title: { type: String, default: 'Product Image' },
  loading: { type: Boolean, default: false }
})

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value] || '')

const mainImageContainer = ref<HTMLElement | null>(null)
const zoomStyle = ref({ transformOrigin: 'center center', transform: 'scale(1)' })
const isZooming = ref(false)

const setActiveImage = (index: number) => {
  activeIndex.value = index
  resetZoom()
}

const handleZoom = (e: MouseEvent) => {
  if (!mainImageContainer.value) return
  
  // Only apply zoom on desktop/hover-capable devices
  if (window.matchMedia('(hover: none)').matches) return

  const { left, top, width, height } = mainImageContainer.value.getBoundingClientRect()
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100

  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(2)' // 2x Zoom level
  }
}

const resetZoom = () => {
  zoomStyle.value = {
    transformOrigin: 'center center',
    transform: 'scale(1)'
  }
}
</script>

<style scoped>
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.gallery-main, .gallery-main-skeleton {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: crosshair;
}

.gallery-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out; /* Smooth follow cursor */
}

/* On mobile, disable the crosshair */
@media (hover: none) {
  .gallery-main {
    cursor: default;
  }
}

.gallery-thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.gallery-thumbnail-skeleton {
  aspect-ratio: 1;
}

.gallery-thumbnail-btn {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  background-color: var(--bg-tertiary);
  transition: border-color 0.2s ease;
}

.gallery-thumbnail-btn--active {
  border-color: var(--accent-color);
}

.gallery-thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
