import { useState } from '#imports'

export const useStoreTheme = () => {
  const storeTheme = useState<string>('storeTheme', () => 'tech')
  
  const setStoreTheme = (theme: 'tech' | 'fashion') => {
    storeTheme.value = theme
  }

  return {
    storeTheme,
    setStoreTheme
  }
}
