<template>
  <div class="marquee-container" aria-hidden="true">
    <div class="marquee-content">
      <!-- We duplicate the text multiple times to ensure smooth infinite scrolling -->
      <span v-for="i in 4" :key="i" class="marquee-text">
        {{ text || $t('marquee.default') }}
        <span class="marquee-separator">•</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  padding: var(--space-2) 0;
  display: flex;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
}

.marquee-text {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-right: 2rem;
  display: flex;
  align-items: center;
}

.marquee-separator {
  margin-left: 2rem;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Needs to be perfectly matched with content length for seamless loop, 50% works if duplicated perfectly */
  }
}

/* Pause on hover for accessibility */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}
</style>
