import { ref, computed } from 'vue'

export interface CartItem {
  id: string | number
  title: string
  price: number
  quantity: number
  image: string
  variant?: string
}

// Global state using Vue's reactivity system outside components
const state = {
  isCartOpen: ref(false),
  items: ref<CartItem[]>([])
}

export function useCart() {
  const isCartOpen = state.isCartOpen
  const items = state.items

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const cartItemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const openCart = () => {
    isCartOpen.value = true
    // Prevent background scrolling when cart is open
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeCart = () => {
    isCartOpen.value = false
    // Restore background scrolling
    if (typeof window !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const toggleCart = () => {
    if (isCartOpen.value) {
      closeCart()
    } else {
      openCart()
    }
  }

  const addToCart = (item: CartItem) => {
    const existingItem = items.value.find(
      i => i.id === item.id && i.variant === item.variant
    )
    
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      items.value.push(item)
    }
    
    openCart()
  }

  const removeFromCart = (index: number) => {
    items.value.splice(index, 1)
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity > 0) {
      items.value[index].quantity = quantity
    }
  }

  return {
    isCartOpen,
    items,
    cartTotal,
    cartItemCount,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity
  }
}
