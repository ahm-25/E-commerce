<template>
  <footer class="store-footer">
    <div class="container">
      <div class="store-footer__grid">
        <div class="footer-col">
          <h3 class="text-h4 font-medium uppercase tracking-widest mb-6">{{ storeName }}</h3>
          <p class="text-secondary text-body mb-8 max-w-xs">
            Curated premium products for the modern individual. Crafted with intention.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Instagram" class="social-link">Instagram</a>
            <a href="#" aria-label="Twitter" class="social-link">Twitter</a>
            <a href="#" aria-label="Facebook" class="social-link">Facebook</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 class="font-medium uppercase tracking-widest text-xs mb-6 text-muted">Shop</h4>
          <ul class="footer-nav">
            <li><NuxtLink to="/products">All Products</NuxtLink></li>
            <li><NuxtLink to="/categories">Categories</NuxtLink></li>
            <li><NuxtLink to="/offers">Special Offers</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="font-medium uppercase tracking-widest text-xs mb-6 text-muted">Support</h4>
          <ul class="footer-nav">
            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/returns">Returns & Exchanges</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="font-medium uppercase tracking-widest text-xs mb-6 text-muted">Newsletter</h4>
          <p class="text-secondary text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Email address" class="newsletter-input" required>
            <button type="submit" class="newsletter-submit">→</button>
          </form>
        </div>
      </div>
      
      <div class="store-footer__bottom">
        <p class="text-muted text-xs uppercase tracking-widest">&copy; {{ new Date().getFullYear() }} {{ storeName }}. All rights reserved.</p>
        <div class="payment-methods">
          <span class="payment-icon text-xs tracking-wider">VISA</span>
          <span class="payment-icon text-xs tracking-wider">MASTERCARD</span>
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
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding-block-start: var(--space-24);
  padding-block-end: var(--space-8);
  margin-top: auto;
}

.store-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-16);
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

.max-w-xs {
  max-width: 20rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav a {
  color: var(--text-primary);
  font-size: 0.875rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-nav a:hover {
  opacity: 0.6;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.social-link {
  color: var(--text-primary);
  font-size: 0.875rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  opacity: 0.6;
}

.newsletter-form {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-2);
  transition: border-color 0.3s ease;
}

.newsletter-form:focus-within {
  border-color: var(--text-primary);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  padding: 0;
}

.newsletter-input:focus {
  outline: none;
}

.newsletter-input::placeholder {
  color: var(--text-muted);
}

.newsletter-submit {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 var(--space-2);
  transition: transform 0.3s ease;
}

.newsletter-submit:hover {
  transform: translateX(4px);
}

[dir="rtl"] .newsletter-submit {
  transform: scaleX(-1); /* reverse arrow */
}
[dir="rtl"] .newsletter-submit:hover {
  transform: scaleX(-1) translateX(4px);
}

.store-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-color);
}

@media (min-width: 768px) {
  .store-footer__bottom {
    flex-direction: row;
  }
}

.payment-methods {
  display: flex;
  gap: var(--space-4);
}

.payment-icon {
  color: var(--text-muted);
}
</style>
