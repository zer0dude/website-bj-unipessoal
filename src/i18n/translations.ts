import de from './locales/de.json';
import en from './locales/en.json';

const translations = { de, en } as const;

export type Locale = 'de' | 'en';

/**
 * Get translated text for a given key and locale
 * Falls back to German if key not found in requested locale
 */
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (value) return value;
  
  // Fallback to German
  value = translations.de;
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

/**
 * Detect current locale from URL pathname
 * Returns 'de' for root paths, 'en' for /en/ paths
 */
export function getCurrentLocale(url: URL): Locale {
  const pathname = url.pathname;
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'de';
}

/**
 * Get all available locales
 */
export function getAllLocales(): Locale[] {
  return ['de', 'en'];
}

/**
 * Get the alternate locale (opposite of current)
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'de' ? 'en' : 'de';
}

/**
 * Convert a path from one locale to another
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  // Remove /en prefix if present
  const cleanPath = path.replace(/^\/en/, '') || '/';
  
  // Add /en prefix for English, keep clean for German
  return targetLocale === 'en' ? `/en${cleanPath === '/' ? '' : cleanPath}` : cleanPath;
}
