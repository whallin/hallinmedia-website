import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLanguage, strings } from './strings';

export function currentLanguage(locale: string | undefined) {
  return (locale || defaultLanguage) as keyof typeof strings;
}

export function getLocalizedPath(locale: string | undefined, path: string) {
  const currentLocale = currentLanguage(locale);

  // If we're using the default language, don't add a prefix
  if (currentLocale === defaultLanguage) {
    return `/${path}`;
  }

  // Use Astro's built-in function for other locales
  return getRelativeLocaleUrl(currentLocale, path);
}

export function useTranslations(locale: string | undefined) {
  const lang = currentLanguage(locale);
  // Return a function to translate keys to their corresponding strings
  return function t(key: keyof (typeof strings)[typeof defaultLanguage]) {
    // Attempt to return the translation for the current language, falling back to the default language if not found
    return strings[lang][key] || strings[defaultLanguage][key];
  };
}
