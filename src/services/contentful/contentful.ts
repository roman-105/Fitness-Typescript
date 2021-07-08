// @ts-ignore
import * as contentful from 'contentful/dist/contentful.browser.min.js';
import type { ContentfulClientApi } from 'contentful';
import env from '../../utils/environment';

const BFContentful: ContentfulClientApi = contentful.createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_CONTENT_ACCESS_TOKEN,
  environment: env.CONTENTFUL_ENVIRONMENT
});

export default BFContentful;
