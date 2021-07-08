import * as RNLocalize from 'react-native-localize';
import { BF_LOCALES, BF_COUNTRIES } from '../constants';
import { filterByWhitelist } from '../utils';

const locale = RNLocalize.findBestAvailableLanguage(BF_LOCALES)?.languageTag?.split('-')[0] ?? 'en';
export const country = filterByWhitelist(RNLocalize.getCountry().toLowerCase(), BF_COUNTRIES, 'nl');
export default locale;
