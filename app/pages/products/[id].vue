<template>
  <div class="product-details-page">
    <!-- Top Section: Gallery & Info -->
    <section class="container px-0 md:px-8">
      <div class="pdp-grid">
        
        <!-- Left Column: Gallery -->
        <div class="pdp-gallery-col">
          <StoreProductGallery :images="productData.images" :title="productData.title" :loading="isLoading" />
        </div>

        <!-- Right Column: Info & Actions -->
        <div class="pdp-info-col px-4 md:px-0">
          <div v-if="isLoading" class="pdp-info-skeleton">
            <UiSkeleton type="text" width="20%" class="mb-2" />
            <UiSkeleton type="text" width="80%" height="3rem" class="mb-6" />
            <UiSkeleton type="rect" width="150px" height="2rem" class="mb-8" />
            <UiSkeleton type="text" width="100%" class="mb-2" />
            <UiSkeleton type="text" width="90%" class="mb-12" />
            <UiSkeleton type="rect" width="100%" height="80px" class="mb-8" />
            <UiSkeleton type="rect" width="100%" height="3.5rem" class="mb-4" />
          </div>

          <div v-else class="pdp-info-content">
            <!-- Breadcrumbs / Category -->
            <p class="text-xs text-secondary font-medium mb-4 uppercase tracking-widest">{{ productData.category }}</p>
            
            <!-- Title -->
            <h1 class="text-h1 font-light mb-6 leading-tight">{{ productData.title }}</h1>
            
            <!-- Price & Rating -->
            <div class="flex items-end justify-between mb-8 pb-8 border-b border-color">
              <div class="flex items-center gap-4">
                <span class="text-h2 font-medium">{{ formattedPrice }}</span>
                <span v-if="productData.originalPrice" class="text-secondary text-lg line-through">{{ formattedOriginalPrice }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <UiIcon v-for="i in 5" :key="i" name="star" :size="14" :color="i <= productData.rating ? 'var(--text-primary)' : 'var(--border-color)'" :filled="true" />
                </div>
                <span class="text-xs text-muted uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">({{ productData.reviewCount }})</span>
              </div>
            </div>
            
            <!-- Short Description -->
            <p class="text-body-lg text-secondary mb-12">
              {{ productData.shortDescription }}
            </p>
            
            <!-- Variants -->
            <div class="mb-8">
              <StoreProductVariants :variant-groups="productData.variants" @update:selection="handleVariantSelection" />
            </div>
            
            <!-- Actions -->
            <div class="pdp-actions mb-12">
              <div class="pdp-quantity">
                <span class="text-xs uppercase tracking-widest font-medium mb-3 block">Quantity</span>
                <div class="quantity-selector">
                  <button @click="quantity > 1 ? quantity-- : null" class="qty-btn">-</button>
                  <span class="qty-val">{{ quantity }}</span>
                  <button @click="quantity < 10 ? quantity++ : null" class="qty-btn">+</button>
                </div>
              </div>
              
              <div class="pdp-buttons">
                <button class="editorial-btn-primary mb-4" @click="handleAddToCart">Add to Cart</button>
                <div class="flex gap-4">
                  <button class="editorial-btn-outline flex-1" @click="buyNow">Buy It Now</button>
                  <button class="wishlist-btn" :class="{'wishlist-btn--active': isWishlisted}" @click="toggleWishlist" aria-label="Add to Wishlist">
                    <UiIcon name="heart" :size="20" stroke-width="1.5" :filled="isWishlisted" />
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Trust Badges -->
            <div class="flex flex-col gap-3 py-6 border-t border-color text-sm text-secondary uppercase tracking-widest">
              <div class="flex items-center gap-3">
                <UiIcon name="check" :size="16" /> Complimentary Worldwide Shipping
              </div>
              <div class="flex items-center gap-3">
                <UiIcon name="refresh-cw" :size="16" /> 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details Section (Desktop Editorial / Mobile Accordion) -->
    <section class="container section-padding border-t border-color mt-16 md:mt-24">
      <div v-if="!isLoading" class="max-w-4xl mx-auto">
        <!-- Desktop: Large open sections -->
        <div class="hidden md:flex flex-col gap-24">
          <div class="editorial-section">
            <h2 class="text-h3 uppercase tracking-wide mb-8">The Story</h2>
            <p class="text-body-lg text-secondary max-w-2xl">{{ productData.description }}</p>
            <p class="text-body-lg text-secondary max-w-2xl mt-4">Crafted with meticulous attention to detail, this piece represents the pinnacle of our design philosophy, merging timeless aesthetics with modern functionality.</p>
          </div>
          
          <div class="editorial-section">
            <h2 class="text-h3 uppercase tracking-wide mb-8">Specifications</h2>
            <ul class="spec-list text-body-lg text-secondary max-w-2xl">
              <li><span class="font-medium text-primary uppercase tracking-wider text-sm mr-4">Material</span> {{ productData.specs.material }}</li>
              <li><span class="font-medium text-primary uppercase tracking-wider text-sm mr-4">Fit</span> {{ productData.specs.fit }}</li>
              <li><span class="font-medium text-primary uppercase tracking-wider text-sm mr-4">Care</span> {{ productData.specs.care }}</li>
              <li><span class="font-medium text-primary uppercase tracking-wider text-sm mr-4">Origin</span> {{ productData.specs.origin }}</li>
            </ul>
          </div>
          
          <div class="editorial-section">
            <h2 class="text-h3 uppercase tracking-wide mb-8">Shipping & Returns</h2>
            <div class="text-body-lg text-secondary max-w-2xl">
              <p class="mb-2"><strong class="font-medium text-primary">Standard Shipping:</strong> 3-5 business days.</p>
              <p class="mb-6"><strong class="font-medium text-primary">Express Shipping:</strong> 1-2 business days.</p>
              <p>We accept returns within 30 days of purchase. Items must be in their original condition with tags attached. Please visit our returns portal to initiate a request.</p>
            </div>
          </div>
        </div>

        <!-- Mobile: Accordions -->
        <div class="md:hidden">
          <UiAccordion title="The Story" default-open>
            <p class="mb-4">{{ productData.description }}</p>
            <p>Crafted with meticulous attention to detail, this piece represents the pinnacle of our design philosophy, merging timeless aesthetics with modern functionality.</p>
          </UiAccordion>
          <UiAccordion title="Specifications">
            <ul class="flex flex-col gap-2">
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
        </div>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="container section-padding bg-secondary py-24">
      <div class="section-header justify-center text-center w-full border-none mb-12">
        <h2 class="text-h3 font-medium uppercase tracking-wide mx-auto">Client Testimonials</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    <section class="container section-padding mt-12 mb-24">
      <div class="section-header">
        <h2 class="text-h3 font-medium uppercase tracking-wide">Complementary Pieces</h2>
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
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'store'
})

const { addToCart } = useCart()

const isLoading = ref(true)
const quantity = ref(1)
const isWishlisted = ref(false)
const selectedVariant = ref('')

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

const handleVariantSelection = (selection: any) => { 
  // Convert selection object to a string representing the variant
  selectedVariant.value = Object.values(selection).map((opt: any) => opt.label).join(' / ')
}

const handleAddToCart = () => {
  addToCart({
    id: productData.value.id,
    title: productData.value.title,
    price: productData.value.price,
    quantity: quantity.value,
    image: productData.value.images[0],
    variant: selectedVariant.value
  })
}

const buyNow = () => { 
  handleAddToCart()
  // In a real app, this would redirect to checkout immediately
  // useRouter().push('/checkout')
}

// Mock Data
const productData = ref({} as any)

onMounted(() => {
  setTimeout(() => {
    productData.value = {
      id: 101,
      title: 'The Signature Wool Overcoat',
      category: 'Outerwear',
      price: 495.00,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 124,
      shortDescription: 'Meticulously tailored from 100% Italian virgin wool. Features a classic double-breasted silhouette with horn buttons and a cupro lining for an impeccable drape.',
      description: 'The Signature Wool Overcoat is constructed from a premium Italian wool blend that offers exceptional warmth without the bulk. The interior is fully lined with silky cupro, ensuring smooth layering over heavy knitwear. The silhouette is deliberately oversized to accommodate modern styling while maintaining clean, architectural lines.',
      specs: {
        material: '100% Virgin Wool; Lining: 100% Cupro',
        fit: 'Relaxed/Oversized. Size down for a tailored fit.',
        care: 'Dry clean only. Do not tumble dry.',
        origin: 'Ethically crafted in Italy'
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
    
    // Set default variant
    selectedVariant.value = 'Charcoal / M'
    
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
.product-details-page {
  padding-top: var(--space-8);
}

@media (min-width: 1024px) {
  .product-details-page {
    padding-top: var(--space-12);
  }
}

.pdp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .pdp-grid {
    grid-template-columns: 60% 40%;
    gap: 0;
  }
}

.pdp-info-col {
  position: relative;
}

@media (min-width: 1024px) {
  .pdp-info-content {
    position: sticky;
    top: calc(var(--space-24) + 60px); /* Account for header */
    padding-left: var(--space-16);
    padding-right: var(--space-8);
  }
  
  [dir="rtl"] .pdp-info-content {
    padding-left: var(--space-8);
    padding-right: var(--space-16);
  }
}

.border-color {
  border-color: var(--border-color);
}

.text-primary { color: var(--text-primary); }

.spec-list li {
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.spec-list li:last-child {
  border-bottom: none;
}

/* Custom Buttons & Selectors for Editorial Feel */
.pdp-quantity {
  margin-bottom: var(--space-8);
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  background-color: transparent;
}

.qty-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 3rem;
  height: 3rem;
  font-size: 1.25rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-val {
  width: 3rem;
  text-align: center;
  font-size: 0.875rem;
}

.editorial-btn-primary {
  display: block;
  width: 100%;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  padding: var(--space-4) 0;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  border: 1px solid var(--text-primary);
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.editorial-btn-primary:hover {
  opacity: 0.8;
}

.editorial-btn-outline {
  display: block;
  background-color: transparent;
  color: var(--text-primary);
  padding: var(--space-4) 0;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  border: 1px solid var(--text-primary);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.editorial-btn-outline:hover {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

.wishlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.wishlist-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.wishlist-btn--active {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.section-padding {
  padding-block: var(--space-16);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-6);
}

.section-header h2 {
  margin: 0;
  line-height: 1;
}

.border-none {
  border-bottom: none;
}

.bg-secondary {
  background-color: var(--bg-secondary);
}

/* Hidden utility overrides */
.hidden { display: none !important; }
@media (min-width: 768px) {
  .md\:hidden { display: none !important; }
  .md\:flex { display: flex !important; }
  .md\:block { display: block !important; }
}
</style>

