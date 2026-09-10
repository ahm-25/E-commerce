<template>
  <div class="plp-page section-padding">
    <div class="container">
      
      <!-- Breadcrumbs -->
      <nav v-if="!isLoading" class="breadcrumbs mb-6">
        <NuxtLink to="/" class="breadcrumbs__link">Home</NuxtLink>
        <span class="breadcrumbs__separator">/</span>
        <NuxtLink to="/categories" class="breadcrumbs__link">Collections</NuxtLink>
        <span class="breadcrumbs__separator">/</span>
        <span class="breadcrumbs__current">{{ categoryInfo.name }}</span>
      </nav>
      <div v-else class="mb-6"><UiSkeleton type="text" width="150px" /></div>

      <!-- Category Header -->
      <header class="category-header mb-8 pb-8 border-b border-light reveal-on-scroll">
        <div v-if="isLoading" class="max-w-2xl">
          <UiSkeleton type="text" width="40%" height="3rem" class="mb-4" />
          <UiSkeleton type="text" width="90%" class="mb-2" />
          <UiSkeleton type="text" width="70%" />
        </div>
        <div v-else class="max-w-2xl">
          <h1 class="text-h1 mb-4">{{ categoryInfo.name }}</h1>
          <p class="text-body-lg text-secondary">{{ categoryInfo.description }}</p>
        </div>
      </header>

      <!-- Main PLP Layout -->
      <div class="plp-layout">
        
        <!-- Desktop Sidebar -->
        <aside class="plp-sidebar hidden lg:block">
          <StoreProductFilters 
            :categories="[]" 
            @update:filters="handleFilterChange"
            @clear="clearFilters"
          />
        </aside>

        <!-- Main Content -->
        <main class="plp-main">
          
          <!-- Toolbar -->
          <div class="plp-toolbar mb-8">
            <div class="flex items-center gap-4">
              <button class="filter-toggle-btn lg:hidden" @click="isMobileFiltersOpen = true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filters
              </button>
              <span v-if="!isLoading" class="text-sm text-secondary font-medium uppercase tracking-widest">{{ filteredProducts.length }} Products</span>
              <UiSkeleton v-else type="text" width="80px" />
            </div>

            <div class="flex items-center gap-3">
              <span class="text-sm text-secondary hidden sm:inline-block uppercase tracking-widest">Sort by:</span>
              <UiSelect 
                v-model="sortBy" 
                :options="sortOptions" 
                aria-label="Sort products"
              />
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="isLoading" class="plp-grid">
            <StoreProductCard v-for="i in 8" :key="i" :id="i" loading />
          </div>
          
          <div v-else-if="filteredProducts.length === 0" class="plp-empty-state mt-12">
            <StoreEmptyState 
              @action-click="clearFilters"
            />
          </div>
          
          <div v-else class="plp-grid reveal-on-scroll">
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
          <h3 class="text-h3 font-semibold uppercase tracking-widest text-sm">Filters</h3>
          <button @click="isMobileFiltersOpen = false" class="p-2" aria-label="Close filters">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto" style="height: calc(100% - 130px);">
          <StoreProductFilters 
            :categories="[]"
            @update:filters="handleFilterChange"
            @clear="clearFilters"
          />
        </div>
        <div class="p-4 border-t border-light flex gap-3 bg-primary sticky bottom-0">
          <UiButton variant="outline" class="flex-1" @click="clearFilters">Clear All</UiButton>
          <UiButton variant="primary" class="flex-1" @click="isMobileFiltersOpen = false">Show Results</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { definePageMeta, useRoute } from '#imports'
import { useScrollReveal } from '~/composables/useScrollReveal'

definePageMeta({
  layout: 'store'
})

const route = useRoute()
const slug = route.params.slug as string

const isLoading = ref(true)
const isMobileFiltersOpen = ref(false)
const sortBy = ref('newest')
const { registerElement } = useScrollReveal()

const sortOptions = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Selling', value: 'best_selling' }
]

const categoryInfo = ref({} as any)
const allProducts = ref([] as any[])
const activeFilters = ref<any>({})

const handleFilterChange = (filters: any) => {
  activeFilters.value = filters
}

const clearFilters = () => {
  activeFilters.value = {}
  if(isMobileFiltersOpen.value) isMobileFiltersOpen.value = false
}

const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  
  if (activeFilters.value?.availability?.outOfStock) {
    return [] 
  }

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
  // Mock fetching data based on the slug
  const titleMap: Record<string, string> = {
    'outerwear': 'Outerwear',
    'accessories': 'Accessories',
    'footwear': 'Footwear',
    'essentials': 'Essentials'
  }
  
  const title = titleMap[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1))

  setTimeout(() => {
    categoryInfo.value = {
      name: title,
      description: `Explore our meticulously crafted collection of ${title.toLowerCase()}. Designed with uncompromising attention to detail for the modern wardrobe.`
    }

    allProducts.value = [
      { id: 101, title: 'Minimalist Wool Coat', category: title, price: 299.00, originalPrice: 350.00, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', badge: 'New', badgeVariant: 'primary', rating: 4.8, reviewCount: 12 },
      { id: 102, title: 'Leather Crossbody Bag', category: title, price: 145.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', rating: 5.0, reviewCount: 8 },
      { id: 103, title: 'Classic White Sneakers', category: title, price: 89.00, originalPrice: 110.00, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 45 },
      { id: 104, title: 'Cotton Crewneck Sweater', category: title, price: 65.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', rating: 4.2, reviewCount: 6 },
      { id: 202, title: 'Slim Fit Chinos', category: title, price: 75.00, originalPrice: 90.00, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 89 }
    ]

    isLoading.value = false
    
    nextTick(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(registerElement)
    })
  }, 800)
})
</script>

<style scoped>
.plp-page {
  padding-top: calc(var(--space-24) + 60px); /* Account for top nav */
}

.section-padding {
  padding-bottom: var(--space-24);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.breadcrumbs__link {
  color: var(--text-muted);
  transition: color 0.2s;
  text-decoration: none;
}

.breadcrumbs__link:hover {
  color: var(--text-primary);
}

.breadcrumbs__separator {
  color: var(--border-color);
  margin: 0 var(--space-2);
}

.breadcrumbs__current {
  color: var(--text-primary);
  font-weight: 500;
}

.border-b { border-bottom: 1px solid var(--border-color); }
.border-t { border-top: 1px solid var(--border-color); }
.border-light { border-color: var(--border-light); }
.pb-8 { padding-bottom: var(--space-8); }
.max-w-2xl { max-width: 48rem; }

.plp-layout {
  display: flex;
  gap: var(--space-12);
  align-items: flex-start;
}

.plp-sidebar {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 6rem;
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
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.filter-toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.plp-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .plp-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-8);
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
  margin-inline-start: auto;
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
