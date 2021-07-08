import Config from 'react-native-config';

const env = {
  // Contentful
  CONTENTFUL_SPACE_ID: Config.CONTENTFUL_SPACE_ID ?? 'test',
  CONTENTFUL_CONTENT_ACCESS_TOKEN: Config.CONTENTFUL_CONTENT_ACCESS_TOKEN ?? 'test',
  CONTENTFUL_ENVIRONMENT: Config.CONTENTFUL_ENVIRONMENT ?? 'test',

  // SSO
  BASICFIT_SSO_SECRET: Config.BASICFIT_SSO_SECRET ?? 'test',

  // Auth
  AUTH_PROVIDER_URL: Config.AUTH_PROVIDER_URL ?? 'test',
  BF_BACKEND_URL: Config.BF_BACKEND_URL ?? 'test'
};

export default env;
