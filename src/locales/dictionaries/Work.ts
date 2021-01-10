import { WorkCategory } from '@/types/Work';
import type { LocaleMessages } from 'vue-i18n';
import { SupportedLocales } from '../SupportedLocales';

const WorkCategoryDict: {
  [L in SupportedLocales]: { [K in WorkCategory]: string };
} = {
  en: {
    webapp: 'Web App',
    website: 'Website',
    desktopapp: 'Desktop App',
  },
  ja: {
    webapp: 'ウェブアプリ',
    website: 'ウェブサイト',
    desktopapp: 'デスクトップアプリ',
  },
};

export const WorkDict: LocaleMessages = {
  en: {
    ...WorkCategoryDict.en,
  },
  ja: {
    ...WorkCategoryDict.ja,
  },
};
