<template>
  <div class="container py-12">
    <div class="flex justify-between items-center mb-12">
      <div>
        <h1 class="text-h1 mb-2">Design System</h1>
        <p class="text-muted">A playground for the multi-tenant template UI.</p>
      </div>
      <div class="flex gap-4">
        <UiButton variant="outline" @click="toggleTheme">
          Toggle Theme ({{ currentTheme }})
        </UiButton>
        <UiButton variant="outline" @click="toggleDirection">
          Toggle RTL ({{ currentDirection }})
        </UiButton>
      </div>
    </div>

    <!-- Typography -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Typography</h2>
      <div class="flex-col gap-6">
        <div>
          <span class="text-muted text-sm block mb-1">Heading 1 (.text-h1)</span>
          <h1 class="text-h1">Premium E-commerce Platform</h1>
        </div>
        <div>
          <span class="text-muted text-sm block mb-1">Heading 2 (.text-h2)</span>
          <h2 class="text-h2">Featured Collections</h2>
        </div>
        <div>
          <span class="text-muted text-sm block mb-1">Heading 3 (.text-h3)</span>
          <h3 class="text-h3">Product Name</h3>
        </div>
        <div>
          <span class="text-muted text-sm block mb-1">Body Text (.text-body)</span>
          <p class="text-body max-w-2xl">This is standard body text used for product descriptions, articles, and general content. The spacing and line-height are optimized for readability across devices.</p>
        </div>
      </div>
    </section>

    <!-- Colors -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Colors</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="color-box">
          <div class="color-swatch" style="background-color: var(--bg-primary); border: 1px solid var(--border-color)"></div>
          <div class="color-info">Background Primary</div>
        </div>
        <div class="color-box">
          <div class="color-swatch" style="background-color: var(--bg-secondary)"></div>
          <div class="color-info">Background Secondary</div>
        </div>
        <div class="color-box">
          <div class="color-swatch" style="background-color: var(--accent-color)"></div>
          <div class="color-info">Accent Color</div>
        </div>
        <div class="color-box">
          <div class="color-swatch" style="background-color: var(--text-primary)"></div>
          <div class="color-info">Text Primary</div>
        </div>
      </div>
    </section>

    <!-- Buttons -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Buttons</h2>
      <div class="flex-col gap-8">
        <div>
          <h3 class="text-h3 mb-4">Variants</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="outline">Outline</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="primary" disabled>Disabled</UiButton>
          </div>
        </div>
        <div>
          <h3 class="text-h3 mb-4">Sizes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <UiButton size="sm">Small Button</UiButton>
            <UiButton size="md">Medium Button</UiButton>
            <UiButton size="lg">Large Button</UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Inputs -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Inputs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UiInput label="Standard Input" placeholder="Enter text here..." />
        <UiInput label="Input with Error" placeholder="Enter text here..." error="This field is required." />
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Badges</h2>
      <div class="flex gap-4 flex-wrap">
        <UiBadge variant="neutral">Neutral</UiBadge>
        <UiBadge variant="primary">Primary</UiBadge>
        <UiBadge variant="success">Success</UiBadge>
        <UiBadge variant="warning">Warning</UiBadge>
        <UiBadge variant="danger">Danger</UiBadge>
      </div>
    </section>

    <!-- Cards -->
    <section class="mb-16">
      <h2 class="text-h2 mb-6 pb-2" style="border-bottom: 1px solid var(--border-color)">Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UiCard>
          <template #header>
            <h3 class="text-h3">Card Title</h3>
          </template>
          <p class="text-body text-secondary">This is a standard card with a header, body, and footer. It adapts to the current theme perfectly.</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UiButton variant="ghost">Cancel</UiButton>
              <UiButton variant="primary">Save</UiButton>
            </div>
          </template>
        </UiCard>
        
        <UiCard padding="lg">
          <h3 class="text-h3 mb-4">Large Padding Card</h3>
          <p class="text-body text-secondary mb-6">This card has larger padding and no header or footer slots.</p>
          <UiButton full-width>Action Button</UiButton>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'store'
})

// Inject from the store layout for demo purposes
const { currentTheme, currentDirection, toggleTheme, toggleDirection } = inject('themeConfig') as any
</script>

<style scoped>
.color-box {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.color-swatch {
  height: 80px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.color-info {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.max-w-2xl {
  max-width: 42rem;
}
</style>
