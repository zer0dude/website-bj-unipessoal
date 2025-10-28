import { getTranslation, getCurrentLocale, getLocalizedPath, type Locale } from './translations';

/**
 * Create a translation function for a specific locale
 */
export function createTranslator(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}

/**
 * Get language display names
 */
export const LANGUAGE_NAMES: Record<Locale, { native: string; english: string }> = {
  de: { native: 'Deutsch', english: 'German' },
  en: { native: 'English', english: 'English' }
};

/**
 * Get the language switcher URL for current page
 */
export function getLanguageSwitchUrl(currentUrl: URL, targetLocale: Locale): string {
  const currentLocale = getCurrentLocale(currentUrl);
  const currentPath = currentUrl.pathname;
  
  if (currentLocale === targetLocale) return currentPath;
  
  return getLocalizedPath(currentPath, targetLocale);
}

/**
 * Check if a locale is RTL (Right-to-Left)
 */
export function isRTL(locale: Locale): boolean {
  return false; // Neither German nor English are RTL
}

/**
 * Get locale-specific date formatting
 */
export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', options);
}
