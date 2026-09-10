<template>
  <div class="hero-banner">
    <!-- Background Video -->
    <video 
      autoplay 
      loop 
      muted 
      playsinline 
      class="hero-video"
      poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
    >
      <!-- We use a placeholder video from a public source for the demo -->
      <source src="https://cdn.pixabay.com/video/2016/11/21/20/49/6451-192534563_large.mp4" type="video/mp4">
    </video>
    
    <!-- Subtle Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content container">
      <div class="hero-text-block" ref="heroText">
        <span class="hero-subtitle text-xs uppercase tracking-widest">{{ subtitle || $t('hero.subtitle') }}</span>
        <h1 class="hero-title text-hero">{{ title || $t('hero.title') }}</h1>
        <NuxtLinkLocale v-if="ctaUrl" :to="ctaUrl" class="hero-cta">{{ ctaText || $t('hero.cta') }}</NuxtLinkLocale>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator hidden md:flex">
      <span class="scroll-text text-xs uppercase tracking-widest">{{ $t('common.scroll') }}</span>
      <div class="scroll-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaUrl: { type: String, default: '/products' }
})

const heroText = ref<HTMLElement | null>(null)

onMounted(() => {
  // Simple fade-up animation on load
  setTimeout(() => {
    if (heroText.value) {
      heroText.value.classList.add('is-visible')
    }
  }, 100)
})
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 90vh; /* Extremely tall, immersive hero */
  min-height: 600px;
  overflow: hidden;
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-banner {
    height: 100vh;
  }
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: flex-start; /* Align left */
}

.hero-text-block {
  max-width: 800px;
  color: #ffffff; /* Always white on dark video */
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-text-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-subtitle {
  display: block;
  margin-bottom: var(--space-6);
  opacity: 0.8;
}

.hero-title {
  margin-bottom: var(--space-8);
  font-weight: 300;
  line-height: 1.1;
}

.hero-cta {
  display: inline-block;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-bottom: 4px;
  border-bottom: 1px solid #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease, padding-bottom 0.3s ease;
}

.hero-cta:hover {
  opacity: 0.7;
  padding-bottom: 8px;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-12);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: #ffffff;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  opacity: 0;
  animation: fadeIn 2s forwards 1s; /* Fade in after text */
}

.scroll-line {
  width: 1px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #ffffff;
  animation: scrollDown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

@keyframes scrollDown {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}

@keyframes fadeIn {
  to { opacity: 0.8; }
}

/* Hide on mobile for cleaner look */
@media (max-width: 767px) {
  .hidden { display: none !important; }
}
</style>
