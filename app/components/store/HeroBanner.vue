<template>
  <div v-if="loading" class="hero-banner">
    <UiSkeleton type="rect" width="100%" height="100%" class="hero-banner__skeleton-bg" />
    <div class="container hero-banner__content">
      <div class="hero-banner__text-box">
        <UiSkeleton type="text" width="100px" class="mb-4" />
        <UiSkeleton type="text" width="80%" height="3rem" class="mb-4" />
        <UiSkeleton type="text" width="90%" class="mb-2" />
        <UiSkeleton type="text" width="70%" class="mb-8" />
        <UiSkeleton type="rect" width="160px" height="3.5rem" />
      </div>
    </div>
  </div>

  <div v-else class="hero-banner">
    <div class="hero-banner__bg">
      <img v-if="backgroundImage" :src="backgroundImage" :alt="title" class="hero-banner__image">
      <div class="hero-banner__overlay"></div>
    </div>
    
    <div class="container hero-banner__content">
      <div class="hero-banner__text-box">
        <span v-if="subtitle" class="hero-banner__subtitle font-semibold">{{ subtitle }}</span>
        <h2 class="hero-banner__title text-h1">{{ title }}</h2>
        <p v-if="description" class="hero-banner__description text-body">{{ description }}</p>
        <div class="hero-banner__actions mt-8">
          <UiButton variant="primary" size="lg" @click="$emit('cta-click')">{{ ctaText }}</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  ctaText: { type: String, default: 'Shop Now' },
  backgroundImage: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

defineEmits(['cta-click'])
</script>

<style scoped>
.hero-banner {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-block: var(--space-6);
  background-color: var(--bg-secondary);
}

.hero-banner__skeleton-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-banner__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--bg-primary) 10%, rgba(255,255,255,0) 100%);
}

[data-theme="dark"] .hero-banner__overlay {
  background: linear-gradient(to right, var(--bg-primary) 10%, rgba(15,23,42,0) 100%);
}

[dir="rtl"] .hero-banner__overlay {
  background: linear-gradient(to left, var(--bg-primary) 10%, rgba(255,255,255,0) 100%);
}

[data-theme="dark"][dir="rtl"] .hero-banner__overlay {
  background: linear-gradient(to left, var(--bg-primary) 10%, rgba(15,23,42,0) 100%);
}

.hero-banner__content {
  position: relative;
  z-index: 10;
  width: 100%;
}

.hero-banner__text-box {
  max-width: 500px;
  padding: var(--space-8) 0;
}

.hero-banner__subtitle {
  display: inline-block;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
}

.hero-banner__title {
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.hero-banner__description {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 50vh;
  }
  
  .hero-banner__overlay {
    background: linear-gradient(to top, var(--bg-primary) 0%, rgba(255,255,255,0.4) 100%);
  }
  
  [data-theme="dark"] .hero-banner__overlay {
    background: linear-gradient(to top, var(--bg-primary) 0%, rgba(15,23,42,0.4) 100%);
  }
  
  .hero-banner__text-box {
    padding-top: var(--space-16);
    text-align: center;
    margin-inline: auto;
  }
}
</style>
