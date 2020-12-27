import { createI18n } from '@/compat/vue-i18n-composable';
import { WorkDict } from './dictionaries/Work';

export const I18n = createI18n({
  locale: 'ja',
  messages: {
    en: {
      ...WorkDict.en,
    },
    ja: {
      ...WorkDict.ja,
    },
  },
});
