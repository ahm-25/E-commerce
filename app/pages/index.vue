<template>
  <div class="homepage">
    <!-- 1. Infinite Marquee -->
    <StoreMarquee />

    <!-- 2. Editorial Hero -->
    <section class="hero-section">
      <StoreHeroBanner
        :loading="isLoading"
        :title="storeData.hero.title"
        :subtitle="storeData.hero.subtitle"
        :description="storeData.hero.description"
        :cta-text="storeData.hero.ctaText"
        :background-image="storeData.hero.backgroundImage"
      />
    </section>

    <!-- 3. Featured Collection (Asymmetrical) -->
    <section class="container section-padding reveal-on-scroll">
      <StoreFeaturedCollection 
        :loading="isLoading"
        title="Curated Selection"
        link-text="Shop Collection"
        link-url="/products"
        :products="storeData.featuredProducts.slice(0, 3)"
      />
    </section>

    <!-- 4. Product Collection (New Arrivals) -->
    <section class="container section-padding reveal-on-scroll">
      <div class="section-header">
        <h2 class="text-h3 font-medium uppercase tracking-wide">New Arrivals</h2>
        <NuxtLink v-if="!isLoading" to="/products?sort=newest" class="editorial-link">View All</NuxtLink>
      </div>
      <div class="product-grid">
        <template v-if="isLoading">
          <StoreProductCard v-for="i in 4" :key="i" :id="i" loading />
        </template>
        <template v-else>
          <StoreProductCard
            v-for="product in storeData.newArrivals"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </div>
    </section>

    <!-- 5. Brand Statement -->
    <StoreBrandStatement />

    <!-- 6. Categories (Photographic) -->
    <section class="container section-padding reveal-on-scroll">
      <div class="section-header">
        <h2 class="text-h3 font-medium uppercase tracking-wide">Collections</h2>
      </div>
      <StoreCategoryGrid :loading="isLoading" :categories="storeData.categories" />
    </section>

    <!-- 7. Featured Product (Cinematic) -->
    <div class="reveal-on-scroll">
      <StoreFeaturedProduct :loading="isLoading" :product="storeData.featuredPiece" />
    </div>

    <!-- 8. Best Sellers (Carousel) -->
    <section class="container section-padding reveal-on-scroll">
      <StoreProductCarousel :loading="isLoading" title="Best Sellers" :products="storeData.bestSellers" />
    </section>

    <!-- 9. Promotional Section -->
    <section class="container reveal-on-scroll">
      <StorePromoBanner 
        :loading="isLoading"
        v-bind="storeData.promoBanners[0]"
      />
    </section>

    <!-- 10. Customer Reviews -->
    <section class="container section-padding py-24 reveal-on-scroll">
      <div class="section-header text-center w-full justify-center border-none mb-12">
        <h2 class="text-h3 font-medium uppercase tracking-wide mx-auto">Client Testimonials</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <template v-if="isLoading">
          <StoreCustomerReviewCard v-for="i in 3" :key="i" loading />
        </template>
        <template v-else>
          <StoreCustomerReviewCard
            v-for="(review, index) in storeData.reviews"
            :key="index"
            v-bind="review"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { definePageMeta } from '#imports'
import { useScrollReveal } from '~/composables/useScrollReveal'

definePageMeta({
  layout: 'store'
})

const isLoading = ref(true)
const { registerElement } = useScrollReveal()

const storeData = ref({
  hero: {} as any,
  categories: [] as any[],
  featuredProducts: [] as any[],
  newArrivals: [] as any[],
  bestSellers: [] as any[],
  promoBanners: [] as any[],
  reviews: [] as any[],
  featuredPiece: {} as any
})

onMounted(() => {
  setTimeout(() => {
    storeData.value = {
      hero: {
        title: "Elevate Your Everyday Style.",
        subtitle: "Summer Collection",
        description: "Discover our latest collection of premium essentials designed for the modern individual.",
        ctaText: "Shop Collection",
        backgroundImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
      },
      categories: [
        { id: 1, name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Essentials', slug: 'essentials', image: 'https://images.unsplash.com/photo-1434389678211-19703f8f9026?q=80&w=800&auto=format&fit=crop' }
      ],
      featuredProducts: [
        { id: 501, title: 'Premium Cashmere Blend', category: 'Outerwear', price: 189.00, originalPrice: 220.00, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop', badge: 'Featured', badgeVariant: 'primary', rating: 4.9, reviewCount: 62 },
        { id: 502, title: 'Minimalist Watch', category: 'Accessories', price: 125.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 118 },
        { id: 503, title: 'Leather Loafers', category: 'Footwear', price: 110.00, originalPrice: 150.00, image: 'https://images.unsplash.com/photo-1614252339460-e1cbfa6816fa?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 24 },
        { id: 504, title: 'Linen Button-Down', category: 'Essentials', price: 55.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 89 }
      ],
      newArrivals: [
        { id: 101, title: 'Minimalist Wool Coat', category: 'Outerwear', price: 299.00, originalPrice: 350.00, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', badge: 'New', badgeVariant: 'primary', rating: 4.8, reviewCount: 12 },
        { id: 102, title: 'Leather Crossbody Bag', category: 'Accessories', price: 145.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', rating: 5.0, reviewCount: 8 },
        { id: 103, title: 'Classic White Sneakers', category: 'Footwear', price: 89.00, originalPrice: 110.00, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 45 },
        { id: 104, title: 'Cotton Crewneck Sweater', category: 'Essentials', price: 65.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', rating: 4.2, reviewCount: 6 }
      ],
      bestSellers: [
        { id: 201, title: 'Oxford Button-Down Shirt', category: 'Essentials', price: 55.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop', badge: 'Bestseller', badgeVariant: 'warning', rating: 4.9, reviewCount: 156 },
        { id: 202, title: 'Slim Fit Chinos', category: 'Trousers', price: 75.00, originalPrice: 90.00, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 89 },
        { id: 203, title: 'Polarized Sunglasses', category: 'Accessories', price: 120.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 34 },
        { id: 204, title: 'Canvas Tote Bag', category: 'Accessories', price: 35.00, image: 'https://images.unsplash.com/photo-1597633244018-87cb463c6d2c?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 112 },
        { id: 205, title: 'Linen T-Shirt', category: 'Essentials', price: 40.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 56 }
      ],
      promoBanners: [
        {
          title: "The Summer Edit",
          subtitle: "Curated for you",
          description: "Lightweight fabrics and breathable silhouettes designed for the warmest months of the year.",
          ctaText: "Explore Collection",
          image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        }
      ],
      reviews: [
        { name: "Sarah Jenkins", date: "May 12, 2026", title: "Exceptional quality", text: "I've ordered three times from this store and the quality is consistently amazing. The wool coat fits perfectly.", rating: 5 },
        { name: "Michael Chen", date: "April 28, 2026", title: "Great customer service", text: "Had an issue with sizing and the return process was incredibly smooth. Will definitely be shopping here again.", rating: 5 },
        { name: "Emma Robertson", date: "April 15, 2026", title: "Beautiful packaging", text: "Opening the package felt like receiving a gift. The attention to detail is what sets this brand apart.", rating: 4 }
      ],
      featuredPiece: {
        id: 999,
        title: 'The Signature Wool Overcoat',
        description: 'Meticulously tailored from 100% Italian virgin wool. Features a classic double-breasted silhouette with horn buttons and a cupro lining for an impeccable drape.',
        price: 495.00,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop'
      }
    }
    
    isLoading.value = false

    // Register all elements with the 'reveal-on-scroll' class after DOM updates
    nextTick(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(registerElement)
    })
  }, 1500)
})

</script>

<style scoped>
.hero-section {
  width: 100%;
}

.section-padding {
  padding-block: var(--space-24);
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

.editorial-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, opacity 0.3s ease;
  padding-bottom: 2px;
}

.editorial-link:hover {
  border-color: var(--text-primary);
  opacity: 0.8;
}

.py-24 {
  padding-block: var(--space-24);
}
</style>
