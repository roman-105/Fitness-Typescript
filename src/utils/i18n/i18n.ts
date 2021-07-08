import { setup } from 'format-message';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';
import locale from './locale';

const Locales = { en, es, fr, nl };

setup({
  locale,
  missingTranslation: 'ignore',
  translations: Locales
});
