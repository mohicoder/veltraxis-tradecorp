import { en, type Dict } from './en';
import { ru } from './ru';
import type { Locale } from '@/lib/i18n';

const dicts: Record<Locale, Dict> = { en, ru };
export function getDict(lang: Locale): Dict {
  return dicts[lang] ?? en;
}
export type { Dict };
