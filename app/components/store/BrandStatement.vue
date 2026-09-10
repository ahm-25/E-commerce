<template>
  <section class="brand-statement">
    <div class="container brand-statement__inner">
      <h2 class="brand-statement__text text-display reveal-on-scroll">{{ text || $t('brandStatement.text') }}</h2>
      <p v-if="subtext !== null" class="brand-statement__subtext text-body uppercase tracking-widest mt-12 reveal-on-scroll reveal-delay-200">{{ subtext || $t('brandStatement.subtext') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollReveal } from '~/composables/useScrollReveal'

defineProps({
  text: {
    type: String,
    default: ''
  },
  subtext: {
    type: String,
    default: ''
  }
})

const { registerElement } = useScrollReveal()

onMounted(() => {
  document.querySelectorAll('.reveal-on-scroll').forEach(registerElement)
})
</script>

<style scoped>
.brand-statement {
  padding-block: calc(var(--space-32) * 1.5);
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.brand-statement__inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* Massive display typography for high-fashion feel */
.text-display {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  white-space: pre-line;
}

@media (min-width: 768px) {
  .text-display {
    font-size: 7rem;
  }
}

@media (min-width: 1280px) {
  .text-display {
    font-size: 9rem;
  }
}

.brand-statement__subtext {
  color: var(--text-secondary);
  opacity: 0.8;
}
</style>
