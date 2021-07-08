import BFAxios from '../BFAxios';
import env from '../../utils/environment';
import { IFullSearchResponse } from '../response-types';

const SearchService = {
  query: async ({ query }: { query: string }) => {
    const { data } = await BFAxios.get<IFullSearchResponse>(`${env.BF_BACKEND_URL}/search`, {
      params: { query }
    });
    return data;
  }
};

export default SearchService;
