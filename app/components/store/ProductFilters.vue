<template>
  <aside class="product-filters">
    <div class="filters-header">
      <h3 class="text-h3 font-semibold">Filters</h3>
      <button class="text-sm text-accent underline hover:text-accent-hover" @click="$emit('clear')">Clear All</button>
    </div>

    <!-- Categories -->
    <UiAccordion title="Categories" default-open>
      <div class="filter-group">
        <UiCheckbox v-for="cat in categories" :key="cat.value" v-model="selectedFilters.categories[cat.value]">
          {{ cat.label }} <span class="text-muted text-xs ml-1">({{ cat.count }})</span>
        </UiCheckbox>
      </div>
    </UiAccordion>

    <!-- Price Range -->
    <UiAccordion title="Price Range" default-open>
      <div class="filter-group">
        <UiCheckbox v-for="price in priceRanges" :key="price.value" v-model="selectedFilters.price[price.value]">
          {{ price.label }}
        </UiCheckbox>
      </div>
    </UiAccordion>

    <!-- Availability -->
    <UiAccordion title="Availability" default-open>
      <div class="filter-group">
        <UiCheckbox v-model="selectedFilters.availability.inStock">
          In Stock
        </UiCheckbox>
        <UiCheckbox v-model="selectedFilters.availability.outOfStock">
          Out of Stock
        </UiCheckbox>
      </div>
    </UiAccordion>

    <!-- Rating -->
    <UiAccordion title="Rating">
      <div class="filter-group">
        <UiCheckbox v-for="rating in 4" :key="rating" v-model="selectedFilters.rating[5 - rating]">
          <div class="flex items-center gap-1">
            <div class="flex">
              <UiIcon v-for="i in 5" :key="i" name="star" :size="14" :color="i <= (5 - rating) ? 'var(--color-warning)' : 'var(--border-color)'" :filled="i <= (5 - rating)" />
            </div>
            <span>& up</span>
          </div>
        </UiCheckbox>
      </div>
    </UiAccordion>
  </aside>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps({
  categories: {
    type: Array as () => Array<{ label: string, value: string, count: number }>,
    default: () => []
  },
  priceRanges: {
    type: Array as () => Array<{ label: string, value: string }>,
    default: () => [
      { label: 'Under $50', value: 'under-50' },
      { label: '$50 to $100', value: '50-100' },
      { label: '$100 to $200', value: '100-200' },
      { label: 'Over $200', value: 'over-200' }
    ]
  }
})

const emit = defineEmits(['update:filters', 'clear'])

// Deep reactive state for filters
const selectedFilters = reactive({
  categories: {} as Record<string, boolean>,
  price: {} as Record<string, boolean>,
  availability: {
    inStock: false,
    outOfStock: false
  },
  rating: {} as Record<string, boolean>
})

// Watch for changes and emit to parent
watch(selectedFilters, (newVal) => {
  emit('update:filters', newVal)
}, { deep: true })
</script>

<style scoped>
.product-filters {
  display: flex;
  flex-direction: column;
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-2);
}

.ml-1 { margin-left: 0.25rem; }
[dir="rtl"] .ml-1 { margin-left: 0; margin-right: 0.25rem; }

.hover\:text-accent-hover:hover {
  color: var(--accent-hover);
}
</style>
