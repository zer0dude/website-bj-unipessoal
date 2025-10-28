import { getLocalizedPath, getCurrentLocale, type Locale } from '../i18n/translations';

/**
 * Generate navigation URLs for the current locale
 */
export function getNavUrls(currentUrl: URL) {
  const locale = getCurrentLocale(currentUrl);
  const basePrefix = locale === 'en' ? '/en' : '';
  
  return {
    home: `${basePrefix}/`,
    software: `${basePrefix}/software-development`,
    devops: `${basePrefix}/devops`,
    projects: `${basePrefix}/personal-projects`
  };
}

/**
 * Generate a localized URL for a given path and locale
 */
export function createLocalizedUrl(path: string, locale: Locale, baseUrl: string = 'https://brianjin.eu'): string {
  const localizedPath = getLocalizedPath(path, locale);
  return `${baseUrl}${localizedPath}`;
}

/**
 * Check if a path is the current active page
 */
export function isCurrentPage(currentUrl: URL, targetPath: string): boolean {
  const currentPath = currentUrl.pathname;
  const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
  const normalizedTarget = targetPath.replace(/\/$/, '') || '/';
  
  return normalizedCurrent === normalizedTarget;
}

/**
 * Get all available page paths for a locale
 */
export function getPagePaths(locale: Locale): Record<string, string> {
  const prefix = locale === 'en' ? '/en' : '';
  
  return {
    home: `${prefix}/`,
    software: `${prefix}/software-development`,
    devops: `${prefix}/devops`, 
    projects: `${prefix}/personal-projects`
  };
}

/**
 * Generate sitemap URLs for both locales
 */
export function generateSitemapUrls(baseUrl: string = 'https://brianjin.eu'): Array<{url: string, locale: Locale}> {
  const pages = ['/', '/software-development', '/devops', '/personal-projects'];
  const urls: Array<{url: string, locale: Locale}> = [];
  
  for (const page of pages) {
    // German (default)
    urls.push({
      url: `${baseUrl}${page}`,
      locale: 'de'
    });
    
    // English
    urls.push({
      url: `${baseUrl}${getLocalizedPath(page, 'en')}`,
      locale: 'en'
    });
  }
  
  return urls;
}
