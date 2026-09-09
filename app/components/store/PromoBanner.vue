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
          <span v-if="subtitle" class="text-accent text-sm font-semibold uppercase tracking-wider mb-2 block">{{ subtitle }}</span>
          <h2 class="text-h2 mb-4">{{ title }}</h2>
          <p class="text-secondary text-body mb-8">{{ description }}</p>
          <UiButton variant="primary" size="lg">{{ ctaText }}</UiButton>
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
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.promo-banner__grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .promo-banner__grid {
    grid-template-columns: 1fr 1fr;
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
  min-height: 300px;
}

.promo-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-banner__image-skeleton {
  min-height: 300px;
  height: 100%;
}

.promo-banner__content-col {
  display: flex;
  align-items: center;
  padding: var(--space-8);
}

@media (min-width: 768px) {
  .promo-banner__content-col {
    padding: var(--space-12);
  }
}

@media (min-width: 1024px) {
  .promo-banner__content-col {
    padding: var(--space-16);
  }
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.block {
  display: block;
}

.my-4 {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}
</style>
