<template>
  <footer class="store-footer">
    <div class="container">
      <div class="store-footer__grid">
        <div class="footer-col">
          <h3 class="text-h3 font-bold mb-4">{{ storeName }}</h3>
          <p class="text-muted text-sm mb-4">
            Curated premium products for the modern individual.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Instagram" class="social-icon">IG</a>
            <a href="#" aria-label="Twitter" class="social-icon">TW</a>
            <a href="#" aria-label="Facebook" class="social-icon">FB</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 class="font-semibold mb-4">Shop</h4>
          <ul class="footer-nav">
            <li><NuxtLink to="/products">All Products</NuxtLink></li>
            <li><NuxtLink to="/categories">Categories</NuxtLink></li>
            <li><NuxtLink to="/offers">Special Offers</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="footer-nav">
            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/returns">Returns & Exchanges</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="font-semibold mb-4">Newsletter</h4>
          <p class="text-muted text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Enter your email address" class="newsletter-input" required>
            <UiButton variant="primary" size="sm">Subscribe</UiButton>
          </form>
        </div>
      </div>
      
      <div class="store-footer__bottom">
        <p class="text-muted text-sm">&copy; {{ new Date().getFullYear() }} {{ storeName }}. All rights reserved.</p>
        <div class="payment-methods">
          <!-- Mock payment icons -->
          <span class="payment-icon">VISA</span>
          <span class="payment-icon">MC</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const storeName = ref('Lumina Boutique') // Mock tenant data
</script>

<style scoped>
.store-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding-block-start: var(--space-12);
  padding-block-end: var(--space-8);
  margin-top: auto;
}

.store-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

@media (min-width: 640px) {
  .store-footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .store-footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
  }
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-nav a {
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: var(--accent-color);
}

.social-links {
  display: flex;
  gap: var(--space-4);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: bold;
  transition: all 0.2s;
}

.social-icon:hover {
  background-color: var(--accent-color);
  color: #fff;
}

.newsletter-form {
  display: flex;
  gap: var(--space-2);
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.store-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-light);
}

@media (min-width: 768px) {
  .store-footer__bottom {
    flex-direction: row;
  }
}

.payment-methods {
  display: flex;
  gap: var(--space-2);
}

.payment-icon {
  padding: 0.25rem 0.5rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.625rem;
  font-weight: bold;
  color: var(--text-muted);
}
</style>
