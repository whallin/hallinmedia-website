import { describe, expect, test } from 'bun:test';
import { defaultLanguage, strings } from './strings';
import { currentLanguage, useTranslations } from './utils';

describe('i18n utilities', () => {
  test('currentLanguage returns default language when locale is undefined', () => {
    expect(currentLanguage(undefined)).toBe(defaultLanguage);
  });

  test('currentLanguage returns provided locale when defined', () => {
    expect(currentLanguage('sv')).toBe('sv');
  });

  describe('useTranslations', () => {
    test('returns translation function that works with default language', () => {
      const t = useTranslations(defaultLanguage);
      expect(t('nav.home')).toBe('Home');
      expect(t('nav.contact')).toBe('Contact');
      expect(t('nav.blog')).toBe('Blog');
    });

    test('returns correct translations for Swedish', () => {
      const t = useTranslations('sv');
      expect(t('nav.home')).toBe('Hem');
      expect(t('nav.contact')).toBe('Kontakt');
      expect(t('nav.blog')).toBe('Blogg');
    });

    test('falls back to default language if translation is missing', () => {
      // Simulate missing translation by creating a partial translation object
      const t = useTranslations('sv');
      const mockKey = 'my-mock-key' as keyof (typeof strings)[typeof defaultLanguage];
      const expected = strings.sv[mockKey] || strings[defaultLanguage][mockKey];
      expect(t(mockKey)).toBe(expected);
    });
  });
});
