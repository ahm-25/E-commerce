import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollReveal(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const elements = ref<HTMLElement[]>([])
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // We only want to animate if the user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Just reveal everything immediately
      elements.value.forEach(el => el.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          // Optional: Stop observing once revealed so it doesn't animate out
          observer?.unobserve(entry.target)
        }
      })
    }, options)

    elements.value.forEach((el) => {
      if (el) observer?.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  // Function to register elements from templates
  const registerElement = (el: any) => {
    if (el && el instanceof HTMLElement && !elements.value.includes(el)) {
      elements.value.push(el)
      if (observer) observer.observe(el)
    }
  }

  return {
    registerElement
  }
}
