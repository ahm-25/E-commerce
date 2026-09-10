<template>
  <div class="plp-page section-padding">
    <div class="container">
      
      <!-- Breadcrumbs -->
      <nav v-if="!isLoading" class="breadcrumbs mb-6">
        <NuxtLinkLocale to="/" class="breadcrumbs__link">{{ t('common.home') }}</NuxtLinkLocale>
        <span class="breadcrumbs__separator">/</span>
        <span class="breadcrumbs__current">{{ categoryInfo.name }}</span>
      </nav>
      <div v-else class="mb-6"><UiSkeleton type="text" width="150px" /></div>

      <!-- Category Header -->
      <header class="category-header mb-8 pb-8 border-b border-light">
        <div v-if="isLoading" class="max-w-2xl">
          <UiSkeleton type="text" width="40%" height="3rem" class="mb-4" />
          <UiSkeleton type="text" width="90%" class="mb-2" />
          <UiSkeleton type="text" width="70%" />
        </div>
        <div v-else class="max-w-2xl">
          <h1 class="text-h1 mb-4">{{ categoryInfo.name }}</h1>
          <p class="text-body text-secondary">{{ categoryInfo.description }}</p>
        </div>
      </header>

      <!-- Main PLP Layout -->
      <div class="plp-layout">
        
        <!-- Desktop Sidebar -->
        <aside class="plp-sidebar hidden lg:block">
          <StoreProductFilters 
            :categories="filterCategories"
            @update:filters="handleFilterChange"
            @clear="clearFilters"
          />
        </aside>

        <!-- Main Content -->
        <main class="plp-main">
          
          <!-- Toolbar (Mobile Filter Toggle + Sorting + Results Count) -->
          <div class="plp-toolbar mb-6">
            <div class="flex items-center gap-4">
              <button class="filter-toggle-btn lg:hidden" @click="isMobileFiltersOpen = true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                {{ t('plp.filters') }}
              </button>
              <span v-if="!isLoading" class="text-sm text-secondary font-medium">{{ t('plp.productCount', { count: filteredProducts.length }) }}</span>
              <UiSkeleton v-else type="text" width="80px" />
            </div>

            <div class="flex items-center gap-3">
              <span class="text-sm text-secondary hidden sm:inline-block">{{ t('plp.sortBy') }}</span>
              <UiSelect 
                v-model="sortBy" 
                :options="sortOptions" 
                :aria-label="t('plp.sortProducts')"
              />
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="isLoading" class="plp-grid">
            <StoreProductCard v-for="i in 8" :key="i" :id="i" loading />
          </div>
          
          <div v-else-if="filteredProducts.length === 0" class="plp-empty-state">
            <StoreEmptyState 
              @action-click="clearFilters"
            />
          </div>
          
          <div v-else class="plp-grid">
            <StoreProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              v-bind="product"
            />
          </div>

        </main>
      </div>
    </div>

    <!-- Mobile Filters Drawer -->
    <div v-if="isMobileFiltersOpen" class="mobile-filters-drawer">
      <div class="mobile-filters-drawer__overlay" @click="isMobileFiltersOpen = false"></div>
      <div class="mobile-filters-drawer__content">
        <div class="flex items-center justify-between p-4 border-b border-light">
          <h3 class="text-h3 font-semibold">{{ t('plp.filters') }}</h3>
          <button @click="isMobileFiltersOpen = false" class="p-2" :aria-label="t('plp.closeFilters')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto" style="height: calc(100% - 130px);">
          <StoreProductFilters 
            :categories="filterCategories"
            @update:filters="handleFilterChange"
            @clear="clearFilters"
          />
        </div>
        <div class="p-4 border-t border-light flex gap-3 bg-primary sticky bottom-0">
          <UiButton variant="outline" class="flex-1" @click="clearFilters">{{ t('plp.clearAll') }}</UiButton>
          <UiButton variant="primary" class="flex-1" @click="isMobileFiltersOpen = false">{{ t('plp.showResults') }}</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { definePageMeta, useI18n } from '#imports'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()

const isLoading = ref(true)
const isMobileFiltersOpen = ref(false)
const sortBy = ref('newest')

const sortOptions = computed(() => [
  { label: t('plp.sort.newest'), value: 'newest' },
  { label: t('plp.sort.priceAsc'), value: 'price_asc' },
  { label: t('plp.sort.priceDesc'), value: 'price_desc' },
  { label: t('plp.sort.bestSelling'), value: 'best_selling' }
])

// Mock Data Structure
const categoryInfo = ref({} as any)
const allProducts = ref([] as any[])
const filterCategories = ref([] as any[])

// Local state for active filters to simulate empty state
const activeFilters = ref<any>({})

const handleFilterChange = (filters: any) => {
  activeFilters.value = filters
}

const clearFilters = () => {
  // In a real app, this would reset the StoreProductFilters reactive state
  // For the mock, we just close the drawer and pretend.
  activeFilters.value = {}
  if(isMobileFiltersOpen.value) isMobileFiltersOpen.value = false
}

// Compute filtered products (Simulation)
const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  
  // Simulate filtering causing empty state (if user selects 'Out of Stock')
  if (activeFilters.value?.availability?.outOfStock) {
    return [] 
  }

  // Simulate Sorting
  if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'best_selling') {
    result.sort((a, b) => b.reviewCount - a.reviewCount)
  }

  return result
})

onMounted(() => {
  setTimeout(() => {
    categoryInfo.value = {
      name: t('plp.title'),
      description: t('plp.description')
    }

    filterCategories.value = [
      { label: t('categoryNames.outerwear'), value: 'outerwear', count: 24 },
      { label: t('categoryNames.knitwear'), value: 'knitwear', count: 18 },
      { label: t('categoryNames.trousers'), value: 'trousers', count: 32 },
      { label: t('categoryNames.essentials'), value: 'essentials', count: 56 }
    ]

    allProducts.value = [
      { id: 101, title: 'Minimalist Wool Coat', category: 'Outerwear', price: 299.00, originalPrice: 350.00, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', badge: 'New', badgeVariant: 'primary', rating: 4.8, reviewCount: 12 },
      { id: 104, title: 'Cotton Crewneck Sweater', category: 'Essentials', price: 65.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', rating: 4.2, reviewCount: 6 },
      { id: 202, title: 'Slim Fit Chinos', category: 'Trousers', price: 75.00, originalPrice: 90.00, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 89 },
      { id: 504, title: 'Linen Button-Down', category: 'Essentials', price: 55.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 89 },
      { id: 601, title: 'Merino Wool Turtleneck', category: 'Knitwear', price: 120.00, image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=800&auto=format&fit=crop', rating: 4.9, reviewCount: 42 },
      { id: 602, title: 'Heavyweight Hoodie', category: 'Essentials', price: 85.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', rating: 4.4, reviewCount: 28, badge: 'Sale', badgeVariant: 'danger', originalPrice: 110.00 },
      { id: 603, title: 'Tailored Blazer', category: 'Outerwear', price: 245.00, image: 'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 15 },
      { id: 604, title: 'Pleated Trousers', category: 'Trousers', price: 95.00, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', rating: 4.3, reviewCount: 31 }
    ]

    isLoading.value = false
  }, 1200)
})
</script>

<style scoped>
.section-padding {
  padding-block: var(--space-8);
}

@media (min-width: 1024px) {
  .section-padding {
    padding-block: var(--space-12);
  }
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
}

.breadcrumbs__link {
  color: var(--text-muted);
  transition: color 0.2s;
}

.breadcrumbs__link:hover {
  color: var(--accent-color);
}

.breadcrumbs__separator {
  color: var(--border-color);
}

.breadcrumbs__current {
  color: var(--text-primary);
  font-weight: 500;
}

.border-b { border-bottom: 1px solid var(--border-color); }
.border-t { border-top: 1px solid var(--border-color); }
.border-light { border-color: var(--border-light); }
.pb-8 { padding-bottom: var(--space-8); }
.max-w-2xl { max-width: 42rem; }

.plp-layout {
  display: flex;
  gap: var(--space-8);
  align-items: flex-start;
}

.plp-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 6rem; /* Stick below header */
}

.plp-main {
  flex-grow: 1;
  min-width: 0;
}

.hidden { display: none; }
@media (min-width: 1024px) {
  .lg\:block { display: block; }
  .lg\:hidden { display: none; }
}
@media (min-width: 640px) {
  .sm\:inline-block { display: inline-block; }
}

.plp-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
}

/* Product Grid Responsiveness Rule */
.plp-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .plp-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
  }
}

@media (min-width: 1280px) {
  .plp-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Mobile Filters Drawer */
.mobile-filters-drawer {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
}

.mobile-filters-drawer__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.mobile-filters-drawer__content {
  position: relative;
  width: 85%;
  max-width: 360px;
  height: 100%;
  background-color: var(--bg-primary);
  margin-inline-start: auto; /* Slide from right in LTR, from left in RTL */
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease forwards;
}

[dir="rtl"] .mobile-filters-drawer__content {
  margin-inline-start: 0;
  margin-inline-end: auto;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

[dir="rtl"] @keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.p-4 { padding: var(--space-4); }
.p-2 { padding: var(--space-2); }
.overflow-y-auto { overflow-y: auto; }
.bg-primary { background-color: var(--bg-primary); }
.sticky { position: sticky; }
.bottom-0 { bottom: 0; }
</style>
