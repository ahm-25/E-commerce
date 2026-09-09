<template>
  <div class="product-details-page section-padding">
    <!-- Top Section: Gallery & Info -->
    <section class="container">
      <div class="pdp-grid">
        
        <!-- Left Column: Gallery -->
        <div class="pdp-gallery-col">
          <StoreProductGallery :images="productData.images" :title="productData.title" :loading="isLoading" />
        </div>

        <!-- Right Column: Info & Actions -->
        <div class="pdp-info-col">
          <div v-if="isLoading" class="pdp-info-skeleton">
            <UiSkeleton type="text" width="20%" class="mb-2" />
            <UiSkeleton type="text" width="80%" height="2.5rem" class="mb-4" />
            <UiSkeleton type="rect" width="150px" height="1.5rem" class="mb-6" />
            <UiSkeleton type="rect" width="120px" height="2rem" class="mb-6" />
            <UiSkeleton type="text" width="100%" class="mb-2" />
            <UiSkeleton type="text" width="90%" class="mb-8" />
            <UiSkeleton type="rect" width="100%" height="150px" class="mb-8" />
            <div class="flex gap-4">
              <UiSkeleton type="rect" width="150px" height="3rem" />
              <UiSkeleton type="rect" width="100%" height="3rem" />
            </div>
          </div>

          <div v-else>
            <!-- Breadcrumbs / Category -->
            <p class="text-sm text-accent font-medium mb-2 uppercase tracking-wider">{{ productData.category }}</p>
            
            <!-- Title -->
            <h1 class="text-h2 mb-4">{{ productData.title }}</h1>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-6">
              <div class="flex">
                <UiIcon v-for="i in 5" :key="i" name="star" :size="16" :color="i <= productData.rating ? 'var(--color-warning)' : 'var(--border-color)'" :filled="i <= productData.rating" />
              </div>
              <span class="text-sm font-medium">{{ productData.rating }}</span>
              <span class="text-sm text-muted underline cursor-pointer">({{ productData.reviewCount }} reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="flex items-center gap-3 mb-6">
              <span class="text-h3 font-semibold" :class="{'text-danger': discountPercentage > 0}">{{ formattedPrice }}</span>
              <span v-if="productData.originalPrice" class="text-muted text-lg line-through">{{ formattedOriginalPrice }}</span>
              <UiBadge v-if="discountPercentage > 0" variant="danger">-{{ discountPercentage }}%</UiBadge>
            </div>
            
            <!-- Short Description -->
            <p class="text-body text-secondary mb-8 leading-relaxed">
              {{ productData.shortDescription }}
            </p>
            
            <!-- Variants -->
            <div class="mb-8">
              <StoreProductVariants :variant-groups="productData.variants" @update:selection="handleVariantSelection" />
            </div>
            
            <!-- Actions -->
            <div class="pdp-actions mb-8">
              <div class="pdp-quantity">
                <span class="text-sm font-medium mb-2 block">Quantity</span>
                <UiQuantitySelector v-model="quantity" :max="10" />
              </div>
              
              <div class="pdp-buttons">
                <div class="flex gap-3 mb-3">
                  <UiButton variant="outline" size="lg" class="flex-1" @click="addToCart">Add to Cart</UiButton>
                  <button class="wishlist-btn-large" :class="{'wishlist-btn-large--active': isWishlisted}" @click="toggleWishlist">
                    <UiIcon name="heart" :size="24" :filled="isWishlisted" />
                  </button>
                </div>
                <UiButton variant="primary" size="lg" full-width @click="buyNow">Buy It Now</UiButton>
              </div>
            </div>
            
            <!-- Trust Badges -->
            <div class="flex items-center gap-6 py-4 border-y border-light">
              <div class="flex items-center gap-2 text-sm text-secondary">
                <UiIcon name="check-circle" :size="18" /> Secure Checkout
              </div>
              <div class="flex items-center gap-2 text-sm text-secondary">
                <UiIcon name="truck" :size="18" /> Free Shipping over $100
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Middle Section: Accordions -->
    <section class="container section-padding pb-0">
      <div class="max-w-3xl mx-auto">
        <template v-if="isLoading">
          <UiSkeleton v-for="i in 4" :key="i" type="rect" height="4rem" class="mb-4" />
        </template>
        <template v-else>
          <UiAccordion title="Product Description" default-open>
            <p class="mb-4">{{ productData.description }}</p>
            <p>Crafted with meticulous attention to detail, this piece represents the pinnacle of our design philosophy, merging timeless aesthetics with modern functionality.</p>
          </UiAccordion>
          <UiAccordion title="Specifications">
            <ul class="spec-list">
              <li><strong>Material:</strong> {{ productData.specs.material }}</li>
              <li><strong>Fit:</strong> {{ productData.specs.fit }}</li>
              <li><strong>Care:</strong> {{ productData.specs.care }}</li>
              <li><strong>Origin:</strong> {{ productData.specs.origin }}</li>
            </ul>
          </UiAccordion>
          <UiAccordion title="Shipping & Returns">
            <p class="mb-2"><strong>Standard Shipping:</strong> 3-5 business days.</p>
            <p class="mb-4"><strong>Express Shipping:</strong> 1-2 business days.</p>
            <p>We accept returns within 30 days of purchase. Items must be in their original condition with tags attached.</p>
          </UiAccordion>
        </template>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="container section-padding">
      <div class="flex items-center justify-between mb-8 border-b border-light pb-4">
        <h2 class="text-h2 font-semibold">Customer Reviews</h2>
        <UiButton v-if="!isLoading" variant="outline">Write a Review</UiButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-if="isLoading">
          <StoreCustomerReviewCard v-for="i in 3" :key="i" loading />
        </template>
        <template v-else>
          <StoreCustomerReviewCard
            v-for="(review, index) in productData.reviews"
            :key="index"
            v-bind="review"
          />
        </template>
      </div>
    </section>

    <!-- Related Products -->
    <section class="container section-padding bg-secondary-section">
      <div class="flex items-center justify-between mb-8 border-b border-light pb-4">
        <h2 class="text-h2 font-semibold">You May Also Like</h2>
      </div>
      <div class="product-grid">
        <template v-if="isLoading">
          <StoreProductCard v-for="i in 4" :key="i" :id="i" loading />
        </template>
        <template v-else>
          <StoreProductCard
            v-for="product in productData.relatedProducts"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'store'
})

const isLoading = ref(true)
const quantity = ref(1)
const isWishlisted = ref(false)

// Formatting
const formatPrice = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
const formattedPrice = computed(() => formatPrice(productData.value.price || 0))
const formattedOriginalPrice = computed(() => productData.value.originalPrice ? formatPrice(productData.value.originalPrice) : null)
const discountPercentage = computed(() => {
  if (productData.value.originalPrice && productData.value.originalPrice > productData.value.price) {
    return Math.round(((productData.value.originalPrice - productData.value.price) / productData.value.originalPrice) * 100)
  }
  return 0
})

const toggleWishlist = () => { isWishlisted.value = !isWishlisted.value }
const handleVariantSelection = (selection: any) => { console.log('Selected variants:', selection) }
const addToCart = () => { alert(`Added ${quantity.value} item(s) to cart!`) }
const buyNow = () => { alert('Redirecting to checkout...') }

// Mock Data
const productData = ref({} as any)

onMounted(() => {
  setTimeout(() => {
    productData.value = {
      id: 101,
      title: 'Minimalist Wool Coat',
      category: 'Outerwear',
      price: 299.00,
      originalPrice: 350.00,
      rating: 4.8,
      reviewCount: 124,
      shortDescription: 'Elevate your winter wardrobe with our signature Minimalist Wool Coat. Tailored for a relaxed yet refined fit, it features a hidden button placket and deep welt pockets.',
      description: 'The Minimalist Wool Coat is constructed from a premium Italian wool blend that offers exceptional warmth without the bulk. The interior is fully lined with silky cupro, ensuring smooth layering over heavy knitwear. The silhouette is deliberately oversized to accommodate modern styling while maintaining clean, architectural lines.',
      specs: {
        material: '80% Wool, 20% Polyamide; Lining: 100% Cupro',
        fit: 'Relaxed/Oversized. Size down for a tailored fit.',
        care: 'Dry clean only. Do not tumble dry.',
        origin: 'Ethically crafted in Portugal'
      },
      images: [
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'
      ],
      variants: [
        {
          name: 'Color',
          type: 'color',
          options: [
            { id: 'c1', label: 'Charcoal', value: '#3f3f46' },
            { id: 'c2', label: 'Camel', value: '#d4a373' },
            { id: 'c3', label: 'Navy', value: '#1e3a8a', disabled: true }
          ]
        },
        {
          name: 'Size',
          type: 'pill',
          options: [
            { id: 's1', label: 'XS' },
            { id: 's2', label: 'S' },
            { id: 's3', label: 'M' },
            { id: 's4', label: 'L' },
            { id: 's5', label: 'XL', disabled: true }
          ]
        }
      ],
      reviews: [
        { name: "Sarah Jenkins", date: "May 12, 2026", title: "Exceptional quality", text: "I've ordered three times from this store and the quality is consistently amazing. The wool coat fits perfectly.", rating: 5 },
        { name: "Michael Chen", date: "April 28, 2026", title: "Great drape and feel", text: "The fabric feels very premium. It keeps me warm in freezing temperatures without feeling heavy.", rating: 5 },
        { name: "Emma Robertson", date: "April 15, 2026", title: "Slightly too large", text: "Beautiful coat, but the oversized fit is very pronounced. I recommend sizing down.", rating: 4 }
      ],
      relatedProducts: [
        { id: 104, title: 'Cotton Crewneck Sweater', category: 'Essentials', price: 65.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', rating: 4.2, reviewCount: 6 },
        { id: 202, title: 'Slim Fit Chinos', category: 'Trousers', price: 75.00, originalPrice: 90.00, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 89 },
        { id: 504, title: 'Linen Button-Down', category: 'Essentials', price: 55.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 89 },
        { id: 102, title: 'Leather Crossbody Bag', category: 'Accessories', price: 145.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', rating: 5.0, reviewCount: 8 }
      ]
    }
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
.section-padding {
  padding-block: var(--space-12);
}

.pdp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .pdp-grid {
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-16);
    align-items: start;
  }
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.leading-relaxed {
  line-height: 1.7;
}

.text-danger {
  color: var(--color-danger);
}

.pdp-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .pdp-actions {
    flex-direction: row;
    align-items: flex-end;
  }
}

.pdp-quantity {
  flex-shrink: 0;
}

.pdp-buttons {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.wishlist-btn-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.wishlist-btn-large:hover, .wishlist-btn-large--active {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.border-y {
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.border-b {
  border-bottom: 1px solid var(--border-color);
}

.border-light {
  border-color: var(--border-light);
}

.max-w-3xl {
  max-width: 48rem;
}

.spec-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.bg-secondary-section {
  position: relative;
}
.bg-secondary-section::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bg-secondary);
  z-index: -1;
}
</style>
