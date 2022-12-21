import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import ru from '@/locale/ru.json';

export default function (app: App) {
  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      ru,
    },
  });

  app.use(i18n);
}
