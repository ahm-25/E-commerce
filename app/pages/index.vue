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
        :title="t('home.curatedSelection')"
        :link-text="t('home.shopCollection')"
        link-url="/products"
        :products="storeData.featuredProducts.slice(0, 3)"
      />
    </section>

    <!-- 4. Product Collection (New Arrivals) -->
    <section class="container section-padding reveal-on-scroll">
      <div class="section-header">
        <h2 class="text-h3 font-medium uppercase tracking-wide">{{ t('home.newArrivals') }}</h2>
        <NuxtLinkLocale v-if="!isLoading" to="/products?sort=newest" class="editorial-link">{{ t('common.viewAll') }}</NuxtLinkLocale>
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
        <h2 class="text-h3 font-medium uppercase tracking-wide">{{ t('home.collections') }}</h2>
      </div>
      <StoreCategoryGrid :loading="isLoading" :categories="storeData.categories" />
    </section>

    <!-- 7. Featured Product (Cinematic) -->
    <div class="reveal-on-scroll">
      <StoreFeaturedProduct :loading="isLoading" :product="storeData.featuredPiece" />
    </div>

    <!-- 8. Best Sellers (Carousel) -->
    <section class="container section-padding reveal-on-scroll">
      <StoreProductCarousel :loading="isLoading" :title="t('home.bestSellers')" :products="storeData.bestSellers" />
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
        <h2 class="text-h3 font-medium uppercase tracking-wide mx-auto">{{ t('home.testimonials') }}</h2>
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
import { definePageMeta, useI18n } from '#imports'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useLocaleDate } from '~/composables/useLocaleDate'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()
const { formatDate } = useLocaleDate()
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
        title: t('home.hero.title'),
        subtitle: t('home.hero.subtitle'),
        description: t('home.hero.description'),
        ctaText: t('home.hero.cta'),
        backgroundImage: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2000&auto=format&fit=crop"
      },
      categories: [
        { id: 1, name: t('categoryNames.smartphones'), slug: 'smartphones', image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: t('categoryNames.tablets'), slug: 'tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: t('categoryNames.wearables'), slug: 'wearables', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: t('categoryNames.accessories'), slug: 'accessories', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop' }
      ],
      featuredProducts: [
        { id: 501, title: 'ProPhone 15 Ultra', category: 'Smartphones', price: 1199.00, originalPrice: 1299.00, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', badge: 'Featured', badgeVariant: 'primary', rating: 4.9, reviewCount: 620, specs: ['256GB', '8GB RAM', '5G', 'OLED'] },
        { id: 502, title: 'SoundPods Pro 2', category: 'Accessories', price: 249.00, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 1180, specs: ['Active Noise Cancellation', '30h Battery'] },
        { id: 503, title: 'Watch Series 9', category: 'Wearables', price: 399.00, originalPrice: 450.00, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 240, specs: ['45mm', 'ECG', 'LTE'] },
        { id: 504, title: 'Pad Air 5th Gen', category: 'Tablets', price: 599.00, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 890, specs: ['64GB', 'M1 Chip', 'Wi-Fi'] }
      ],
      newArrivals: [
        { id: 101, title: 'Galaxy Fold 5', category: 'Smartphones', price: 1799.00, originalPrice: 1899.00, image: 'https://images.unsplash.com/photo-1631558231908-013fa0a4eb6a?q=80&w=800&auto=format&fit=crop', badge: 'New', badgeVariant: 'primary', rating: 4.8, reviewCount: 120, specs: ['512GB', '12GB RAM', 'Foldable'] },
        { id: 102, title: 'MagCharge Power Bank', category: 'Accessories', price: 99.00, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop', rating: 5.0, reviewCount: 85, specs: ['10000mAh', '20W Fast Charge'] },
        { id: 103, title: 'X-Series Laptop Pro', category: 'Computers', price: 1999.00, originalPrice: 2199.00, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 45, specs: ['1TB SSD', '16GB RAM', '14" Mini-LED'] },
        { id: 104, title: 'Smart Home Hub', category: 'Accessories', price: 129.00, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop', rating: 4.2, reviewCount: 65, specs: ['Matter Support', 'Zigbee'] }
      ],
      bestSellers: [
        { id: 201, title: 'ProPhone 14 Plus', category: 'Smartphones', price: 899.00, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', badge: 'Bestseller', badgeVariant: 'warning', rating: 4.9, reviewCount: 1560, specs: ['128GB', '6.7" OLED'] },
        { id: 202, title: 'Wireless Charging Pad', category: 'Accessories', price: 45.00, originalPrice: 60.00, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop', rating: 4.7, reviewCount: 890, specs: ['15W Qi', 'Dual Device'] },
        { id: 203, title: 'Noise Cancelling Headphones', category: 'Accessories', price: 349.00, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop', rating: 4.6, reviewCount: 345, specs: ['Hi-Res Audio', 'Over-ear'] },
        { id: 204, title: 'Silicone Case (ProPhone 15)', category: 'Accessories', price: 49.00, image: 'https://images.unsplash.com/photo-1605170439002-90845e8c0137?q=80&w=800&auto=format&fit=crop', rating: 4.8, reviewCount: 1120, specs: ['MagSafe Compatible'] },
        { id: 205, title: 'USB-C Fast Charger', category: 'Accessories', price: 25.00, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop', rating: 4.5, reviewCount: 560, specs: ['30W', 'GaN'] }
      ],
      promoBanners: [
        {
          title: t('home.promo.title'),
          subtitle: t('home.promo.subtitle'),
          description: t('home.promo.description'),
          ctaText: t('home.promo.cta'),
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1200&auto=format&fit=crop"
        }
      ],
      reviews: [
        { name: "Ahmed K.", date: formatDate('2026-05-12'), text: t('home.reviews.one'), rating: 5 },
        { name: "Sarah M.", date: formatDate('2026-04-28'), text: t('home.reviews.two'), rating: 5 },
        { name: "Omar N.", date: formatDate('2026-04-15'), text: t('home.reviews.three'), rating: 4 }
      ],
      featuredPiece: {
        id: 999,
        title: t('home.featuredPiece.title'),
        description: t('home.featuredPiece.description'),
        price: 1399.00,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=1200&auto=format&fit=crop'
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
  padding-block: 6rem; /* Enhanced vertical rhythm for luxury feel */
}

@media (min-width: 1024px) {
  .section-padding {
    padding-block: 10rem;
  }
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-4);
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, var(--border-color) 0%, transparent 100%);
}

.section-header.text-center::after {
  background: linear-gradient(to right, transparent 0%, var(--border-color) 50%, transparent 100%);
}

.section-header h2 {
  margin: 0;
  line-height: 1;
  font-weight: 400; /* Lighter font for elegant editorial look */
  letter-spacing: 0.1em;
}

.border-none::after {
  display: none;
}

.editorial-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  position: relative;
  padding-bottom: 4px;
  transition: opacity 0.3s ease;
}

.editorial-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--text-primary);
  transform: scaleX(1);
  transform-origin: bottom left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.editorial-link:hover {
  opacity: 0.8;
}

.editorial-link:hover::after {
  transform: scaleX(0);
  transform-origin: bottom right;
}

.py-24 {
  padding-block: var(--space-24);
}
</style>
