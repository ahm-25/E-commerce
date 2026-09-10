<template>
  <div v-if="loading" class="product-gallery">
    <!-- Desktop Skeleton -->
    <div class="hidden md:flex flex-col gap-12">
      <UiSkeleton type="rect" class="gallery-desktop-image-skel w-full aspect-[3/4]" />
      <div class="grid grid-cols-2 gap-8">
        <UiSkeleton type="rect" class="gallery-desktop-image-skel w-full aspect-[4/5]" />
        <UiSkeleton type="rect" class="gallery-desktop-image-skel w-full aspect-[3/4] mt-16" />
      </div>
    </div>
    <!-- Mobile Skeleton -->
    <div class="md:hidden flex flex-col gap-4">
      <UiSkeleton type="rect" class="w-full aspect-[4/5] rounded-none" />
      <div class="grid grid-cols-4 gap-2">
        <UiSkeleton v-for="i in 4" :key="i" type="rect" class="aspect-square rounded-none" />
      </div>
    </div>
  </div>

  <div v-else class="product-gallery">
    <!-- Desktop Editorial Gallery (Hidden on Mobile) -->
    <div class="gallery-desktop hidden md:block">
      <div v-for="(image, index) in images" :key="`desktop-${index}`" 
           class="gallery-desktop-item"
           :class="{'gallery-desktop-item--primary': index === 0, 'gallery-desktop-item--secondary-1': index === 1, 'gallery-desktop-item--secondary-2': index === 2, 'gallery-desktop-item--standard': index > 2}"
           @mousemove="(e) => handleZoom(e, index)"
           @mouseleave="() => resetZoom(index)">
        <img :src="image" :alt="`${title} image ${index + 1}`" class="gallery-image" :style="zoomStyles[index]">
      </div>
    </div>

    <!-- Mobile Thumbnail Gallery (Hidden on Desktop) -->
    <div class="gallery-mobile md:hidden">
      <!-- Main Image -->
      <div class="gallery-main">
        <img :src="activeImage" :alt="title" class="gallery-image">
      </div>

      <!-- Thumbnails -->
      <div class="gallery-thumbnails" v-if="images.length > 1">
        <button 
          v-for="(image, index) in images" 
          :key="`mobile-${index}`"
          class="gallery-thumbnail-btn"
          :class="{ 'gallery-thumbnail-btn--active': activeIndex === index }"
          @click="activeIndex = index"
          :aria-label="`View image ${index + 1}`"
        >
          <img :src="image" :alt="`${title} thumbnail ${index + 1}`" class="gallery-image">
        </button>
      </div>
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

// Mobile State
const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value] || '')

// Desktop Zoom State
const zoomStyles = ref<Record<number, any>>({})

const handleZoom = (e: MouseEvent, index: number) => {
  if (window.matchMedia('(hover: none)').matches) return
  
  const target = e.currentTarget as HTMLElement
  if (!target) return
  
  const { left, top, width, height } = target.getBoundingClientRect()
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100

  zoomStyles.value[index] = {
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(1.5)' // Elegant, slight zoom
  }
}

const resetZoom = (index: number) => {
  zoomStyles.value[index] = {
    transformOrigin: 'center center',
    transform: 'scale(1)'
  }
}
</script>

<style scoped>
.product-gallery {
  width: 100%;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-out;
}

/* Desktop Styles */
.gallery-desktop {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.gallery-desktop-item {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-tertiary);
  cursor: crosshair;
}

.gallery-desktop-item--primary {
  width: 100%;
  aspect-ratio: 3/4;
}

/* Secondary images arranged side by side asymmetrically */
.gallery-desktop-item--secondary-1 {
  width: 80%;
  aspect-ratio: 4/5;
  align-self: flex-start;
}

[dir="rtl"] .gallery-desktop-item--secondary-1 {
  align-self: flex-end;
}

.gallery-desktop-item--secondary-2 {
  width: 70%;
  aspect-ratio: 3/4;
  align-self: flex-end;
  margin-top: calc(var(--space-24) * -1); /* Overlap slightly with previous image horizontally */
}

[dir="rtl"] .gallery-desktop-item--secondary-2 {
  align-self: flex-start;
}

.gallery-desktop-item--standard {
  width: 100%;
  aspect-ratio: 4/5;
}

/* Mobile Styles */
.gallery-mobile {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.gallery-main {
  width: 100%;
  aspect-ratio: 4/5;
  background-color: var(--bg-tertiary);
  overflow: hidden;
}

.gallery-thumbnails {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  padding-bottom: var(--space-2);
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.gallery-thumbnails::-webkit-scrollbar {
  display: none;
}

.gallery-thumbnail-btn {
  flex-shrink: 0;
  width: calc(25% - var(--space-2));
  aspect-ratio: 1;
  border: 1px solid transparent;
  background-color: var(--bg-tertiary);
  transition: opacity 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  padding: 0;
}

.gallery-thumbnail-btn--active {
  border-color: var(--text-primary);
}

.hidden {
  display: none !important;
}

@media (min-width: 768px) {
  .md\:hidden { display: none !important; }
  .md\:flex { display: flex !important; }
  .md\:block { display: block !important; }
}
</style>
