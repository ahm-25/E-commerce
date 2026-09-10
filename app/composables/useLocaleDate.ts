import { useI18n } from '#imports'

// Latin digits are forced for Arabic so dates stay consistent with the prices.
const INTL_LOCALES: Record<string, string> = {
  en: 'en-US',
  ar: 'ar-EG-u-nu-latn'
}

export const useLocaleDate = () => {
  const { locale } = useI18n()

  const formatDate = (value: string | number | Date) =>
    new Intl.DateTimeFormat(INTL_LOCALES[locale.value] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(value))

  return { formatDate }
}
