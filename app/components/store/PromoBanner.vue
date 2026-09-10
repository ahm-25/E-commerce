<template>
  <div v-if="loading" class="promo-banner">
    <div class="promo-banner__grid">
      <UiSkeleton type="rect" class="promo-banner__image-skeleton" />
      <div class="promo-banner__content p-8 md:p-16">
        <UiSkeleton type="text" width="30%" />
        <UiSkeleton type="text" width="80%" height="2.5rem" class="my-4" />
        <UiSkeleton type="text" width="100%" />
        <UiSkeleton type="text" width="90%" class="mb-8" />
        <UiSkeleton type="rect" width="150px" height="3rem" />
      </div>
    </div>
  </div>

  <div v-else class="promo-banner" :class="{ 'promo-banner--reverse': reverse }">
    <div class="promo-banner__grid">
      <div class="promo-banner__image-col">
        <img :src="image" :alt="title" class="promo-banner__image" loading="lazy">
      </div>
      <div class="promo-banner__content-col">
        <div class="promo-banner__content">
          <span v-if="subtitle" class="text-xs font-medium uppercase tracking-widest mb-4 block text-secondary">{{ subtitle }}</span>
          <h2 class="text-h2 font-light mb-6">{{ title }}</h2>
          <p class="text-secondary text-body-lg mb-12 max-w-md">{{ description }}</p>
          <NuxtLinkLocale to="/products" class="editorial-btn">{{ ctaText }}</NuxtLinkLocale>
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
  image: { type: String, default: '' },
  reverse: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
.promo-banner {
  overflow: hidden;
  margin-block: var(--space-8);
}

.promo-banner__grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .promo-banner__grid {
    grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }
}

.promo-banner--reverse .promo-banner__image-col {
  order: 2;
}

.promo-banner--reverse .promo-banner__content-col {
  order: 1;
}

.promo-banner__image-col {
  position: relative;
  min-height: 400px;
}

.promo-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-banner__image-skeleton {
  min-height: 400px;
  height: 100%;
}

.promo-banner__content-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-6);
  background-color: var(--bg-secondary);
}

@media (min-width: 1024px) {
  .promo-banner__content-col {
    padding: var(--space-16);
  }
}

.promo-banner__content {
  max-width: 500px;
  text-align: center;
}

.max-w-md {
  max-width: 28rem;
  margin-inline: auto;
}

.editorial-btn {
  display: inline-block;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--text-primary);
  color: var(--text-primary);
  padding: 0 0 var(--space-2) 0;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: opacity 0.3s ease, padding-bottom 0.3s ease;
}

.editorial-btn:hover {
  opacity: 0.7;
  padding-bottom: var(--space-3);
}

.block {
  display: block;
}

.my-4 {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}
</style>
