<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header text-center mb-8">
          <h1 class="text-h2 font-semibold mb-2">{{ t('auth.createAccount') }}</h1>
          <p class="text-secondary text-sm">{{ t('auth.registerSubtitle') }}</p>
        </div>

        <form @submit.prevent="handleRegister" class="login-form">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-medium mb-2">{{ t('auth.firstName') }}</label>
              <UiInput v-model="firstName" type="text" :placeholder="t('auth.firstNamePlaceholder')" size="lg" required />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium mb-2">{{ t('auth.lastName') }}</label>
              <UiInput v-model="lastName" type="text" :placeholder="t('auth.lastNamePlaceholder')" size="lg" required />
            </div>
          </div>

          <div class="form-group mb-4">
            <label class="block text-sm font-medium mb-2">{{ t('auth.email') }}</label>
            <UiInput v-model="email" type="email" :placeholder="t('auth.emailPlaceholder')" size="lg" required />
          </div>

          <div class="form-group mb-4">
            <label class="block text-sm font-medium mb-2">{{ t('auth.password') }}</label>
            <UiInput v-model="password" type="password" placeholder="••••••••" size="lg" required />
          </div>

          <div class="form-group mb-6">
            <label class="block text-sm font-medium mb-2">{{ t('auth.confirmPassword') }}</label>
            <UiInput v-model="confirmPassword" type="password" placeholder="••••••••" size="lg" required />
          </div>

          <UiButton type="submit" variant="primary" size="lg" class="w-full mb-4 login-btn" :loading="isLoading">
            {{ t('auth.createAccount') }}
          </UiButton>
          
          <div class="social-login">
            <div class="divider">
              <span>{{ t('auth.orSignUpWith') }}</span>
            </div>
            <div class="social-buttons grid grid-cols-2 gap-4 mt-4">
              <UiButton variant="outline" type="button" class="social-btn">
                <UiIcon name="github" :size="18" class="mr-2" /> GitHub
              </UiButton>
              <UiButton variant="outline" type="button" class="social-btn">
                <UiIcon name="twitter" :size="18" class="mr-2" /> Twitter
              </UiButton>
            </div>
          </div>
        </form>

        <p class="text-center text-sm text-secondary mt-8">
          {{ t('auth.haveAccount') }} <NuxtLinkLocale to="/login" class="text-accent font-medium hover:underline">{{ t('auth.signInLink') }}</NuxtLinkLocale>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, navigateTo, useI18n, useLocalePath } from '#imports'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()
const localePath = useLocalePath()

useHead(() => ({ title: t('auth.createAccount') }))

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const handleRegister = () => {
  // Add validation logic here
  if (password.value !== confirmPassword.value) {
    alert(t('auth.passwordMismatch'))
    return
  }

  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    navigateTo(localePath('/login')) // Redirect to login on success
  }, 1500)
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  padding: var(--space-4);
  position: relative;
  overflow: hidden;
}

.login-page::before,
.login-page::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;
  transition: background-color 0.5s ease;
}

.login-page::before {
  width: 500px;
  height: 500px;
  background-color: var(--color-primary);
  top: -150px;
  left: -150px;
  opacity: 0.15;
}

.login-page::after {
  width: 400px;
  height: 400px;
  background-color: var(--color-accent);
  bottom: -100px;
  right: -100px;
  opacity: 0.15;
}

.login-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 10;
}

.login-card {
  background-color: rgba(var(--bg-primary-rgb), 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeUp 0.6s ease-out forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Fallback */
[data-theme="light"] .login-card, :root .login-card { background-color: rgba(255, 255, 255, 0.7); }
[data-theme="dark"] .login-card { background-color: rgba(22, 22, 22, 0.7); }

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15);
}

.login-btn {
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: var(--space-6) 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-light);
}

.divider span {
  padding: 0 var(--space-4);
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.social-btn:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
}

.w-full { width: 100%; }
.text-center { text-align: center; }
.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mt-4 { margin-top: var(--space-4); }
.mt-8 { margin-top: var(--space-8); }
.block { display: block; }
.flex { display: flex; }
.items-center { align-items: center; }
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.gap-4 { gap: var(--space-4); }
.mr-2 { margin-right: var(--space-2); }
</style>
