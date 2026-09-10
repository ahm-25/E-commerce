<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header text-center mb-8">
          <div class="icon-wrapper mx-auto mb-4">
            <UiIcon name="lock" :size="24" class="text-primary" />
          </div>
          <h1 class="text-h2 font-semibold mb-2">{{ t('auth.forgotTitle') }}</h1>
          <p class="text-secondary text-sm">{{ t('auth.forgotSubtitle') }}</p>
        </div>

        <form v-if="!isSubmitted" @submit.prevent="handleReset" class="login-form">
          <div class="form-group mb-6">
            <label class="block text-sm font-medium mb-2">{{ t('auth.emailAddress') }}</label>
            <UiInput v-model="email" type="email" :placeholder="t('auth.emailPlaceholder')" size="lg" required />
          </div>

          <UiButton type="submit" variant="primary" size="lg" class="w-full mb-4 login-btn" :loading="isLoading">
            {{ t('auth.sendResetLink') }}
          </UiButton>
          
          <NuxtLinkLocale to="/login" class="w-full block text-center mt-4">
            <UiButton variant="outline" type="button" class="w-full">
              {{ t('auth.backToSignIn') }}
            </UiButton>
          </NuxtLinkLocale>
        </form>

        <div v-else class="success-message text-center">
          <div class="icon-wrapper success-icon mx-auto mb-4">
            <UiIcon name="check" :size="24" class="text-white" />
          </div>
          <h2 class="text-h4 font-medium mb-2">{{ t('auth.checkEmail') }}</h2>
          <p class="text-secondary text-sm mb-6">
            <i18n-t keypath="auth.resetSent" scope="global">
              <template #email><strong>{{ email }}</strong></template>
            </i18n-t>
          </p>
          
          <NuxtLinkLocale to="/login">
            <UiButton variant="outline" class="w-full">
              {{ t('auth.backToSignIn') }}
            </UiButton>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, useI18n } from '#imports'

definePageMeta({
  layout: 'store'
})

const { t } = useI18n()

useHead(() => ({ title: t('auth.forgotTitle') }))

const email = ref('')
const isLoading = ref(false)
const isSubmitted = ref(false)

const handleReset = () => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
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
  max-width: 440px;
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

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
}

.success-icon {
  background-color: var(--color-success);
}

.login-btn {
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.w-full { width: 100%; }
.block { display: block; }
.text-center { text-align: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mt-4 { margin-top: var(--space-4); }
.text-white { color: #fff; }
</style>
