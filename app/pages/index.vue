<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="container">
      <StoreHeroBanner
        :loading="isLoading"
        :title="storeData.hero.title"
        :subtitle="storeData.hero.subtitle"
        :description="storeData.hero.description"
        :cta-text="storeData.hero.ctaText"
        :background-image="storeData.hero.backgroundImage"
      />
    </section>

    <!-- Categories Section -->
    <section class="container section-padding">
      <div class="section-header">
        <h2 class="text-h2 font-semibold">Shop by Category</h2>
        <NuxtLink v-if="!isLoading" to="/categories" class="view-all-link">View All</NuxtLink>
      </div>
      <StoreCategoryGrid :loading="isLoading" :categories="storeData.categories" />
    </section>

    <!-- Featured Products Section -->
    <section class="container section-padding bg-secondary-section">
      <div class="section-header">
        <h2 class="text-h2 font-semibold">Featured Products</h2>
        <NuxtLink v-if="!isLoading" to="/products?sort=featured" class="view-all-link">View All</NuxtLink>
      </div>
      <div class="product-grid">
        <template v-if="isLoading">
          <StoreProductCard v-for="i in 4" :key="i" :id="i" loading />
        </template>
        <template v-else>
          <StoreProductCard
            v-for="product in storeData.featuredProducts"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="container section-padding">
      <div class="section-header">
        <h2 class="text-h2 font-semibold">New Arrivals</h2>
        <NuxtLink v-if="!isLoading" to="/products?sort=newest" class="view-all-link">View All</NuxtLink>
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

    <!-- Primary Promotional Banner -->
    <section class="container section-padding">
      <StorePromoBanner 
        :loading="isLoading"
        v-bind="storeData.promoBanners[0]"
      />
    </section>

    <!-- Best Sellers Section -->
    <section class="container section-padding bg-secondary-section">
      <div class="section-header">
        <h2 class="text-h2 font-semibold">Best Sellers</h2>
        <NuxtLink v-if="!isLoading" to="/products?sort=bestsellers" class="view-all-link">View All</NuxtLink>
      </div>
      <div class="product-grid">
        <template v-if="isLoading">
          <StoreProductCard v-for="i in 4" :key="i" :id="i" loading />
        </template>
        <template v-else>
          <StoreProductCard
            v-for="product in storeData.bestSellers"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </div>
    </section>

    <!-- Product Collection Section -->
    <section class="container section-padding">
      <StorePromoBanner 
        :loading="isLoading"
        reverse
        v-bind="storeData.promoBanners[1]"
      />
    </section>
      <div class="section-header">
        <h2 class="text-h2 font-semibold">Best Sellers</h2>
        <NuxtLink v-if="!isLoading" to="/products?sort=bestsellers" class="view-all-link">View All</NuxtLink>
      </div>
      <div class="product-grid">
        <template v-if="isLoading">
          <StoreProductCard v-for="i in 4" :key="i" :id="i" loading />
        </template>
        <template v-else>
          <StoreProductCard
            v-for="product in storeData.bestSellers"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </div>
    </section>

    <!-- Secondary Promotional Banner (Reverse Layout) -->
      <StorePromoBanner 
        :loading="isLoading"
        reverse
        v-bind="storeData.promoBanners[1]"
      />
    </section>

    <!-- Customer Reviews Section -->
    <section class="container section-padding bg-secondary-section">
      <div class="section-header justify-center text-center w-full">
        <h2 class="text-h2 font-semibold mx-auto">What Our Customers Say</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    
    <!-- Newsletter Section (Pre-footer) -->
    <section class="container section-padding">
      <div class="newsletter-cta">
        <div class="newsletter-cta__content">
          <h2 class="text-h2 font-semibold mb-4">Join Our Community</h2>
          <p class="text-body text-secondary mb-8">Sign up for exclusive offers, original stories, events and more.</p>
          <form class="newsletter-cta__form" @submit.prevent>
            <UiInput placeholder="Enter your email address" type="email" required />
            <UiButton variant="primary" size="lg">Subscribe</UiButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'store'
})

// Simulated loading state for dynamic tenant content
const isLoading = ref(true)

// Centralized mock data payload (Simulating an API response from the tenant's backend)
const storeData = ref({
  hero: {} as any,
  categories: [] as any[],
  featuredProducts: [] as any[],
  newArrivals: [] as any[],
  bestSellers: [] as any[],
  promoBanners: [] as any[],
  reviews: [] as any[]
})

onMounted(() => {
  // Simulate network latency (1.5 seconds) to demonstrate loading skeletons
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
        { id: 204, title: 'Canvas Tote Bag', category: 'Accessories', price: 35.00, image: 'https://images.unsplash.com/photo-1597633244018-87cb463c6d2c?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 112 }
      ],
      promoBanners: [
        {
          title: "The Summer Edit",
          subtitle: "Curated for you",
          description: "Lightweight fabrics and breathable silhouettes designed for the warmest months of the year.",
          ctaText: "Explore Collection",
          image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        },
        {
          title: "Sustainable Practices",
          subtitle: "Our Commitment",
          description: "We partner with ethical factories and use organic materials to reduce our environmental footprint without compromising on quality.",
          ctaText: "Read Our Story",
          image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1200&auto=format&fit=crop"
        }
      ],
      reviews: [
        { name: "Sarah Jenkins", date: "May 12, 2026", title: "Exceptional quality", text: "I've ordered three times from this store and the quality is consistently amazing. The wool coat fits perfectly.", rating: 5 },
        { name: "Michael Chen", date: "April 28, 2026", title: "Great customer service", text: "Had an issue with sizing and the return process was incredibly smooth. Will definitely be shopping here again.", rating: 5 },
        { name: "Emma Robertson", date: "April 15, 2026", title: "Beautiful packaging", text: "Opening the package felt like receiving a gift. The attention to detail is what sets this brand apart.", rating: 4 }
      ]
    }
    
    isLoading.value = false
  }, 1500)
})
</script>

<style scoped>
.section-padding {
  padding-block: var(--space-16);
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--space-4);
}

.view-all-link {
  font-weight: 500;
  color: var(--accent-color);
  transition: color 0.2s;
}

.view-all-link:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

/* Optional full-width background for sections */
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

.newsletter-cta {
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-4);
  text-align: center;
}

.newsletter-cta__content {
  max-width: 600px;
  margin-inline: auto;
}

.newsletter-cta__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .newsletter-cta__form {
    flex-direction: row;
    align-items: stretch;
  }
  
  .newsletter-cta__form > :first-child {
    flex: 1;
  }
}
</style>
