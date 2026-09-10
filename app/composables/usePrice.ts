import { computed } from 'vue'
import { useI18n } from '#imports'

// Prices are stored in USD. We format them with the active locale so grouping and
// separators follow the language, while forcing latin digits so Arabic stays readable.
const INTL_LOCALES: Record<string, string> = {
  en: 'en-US',
  ar: 'ar-EG-u-nu-latn'
}

export const usePrice = () => {
  const { locale } = useI18n()

  const intlLocale = computed(() => INTL_LOCALES[locale.value] || 'en-US')

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(intlLocale.value, {
      style: 'currency',
      currency: 'USD'
    }).format(value)

  return { formatPrice, intlLocale }
}
