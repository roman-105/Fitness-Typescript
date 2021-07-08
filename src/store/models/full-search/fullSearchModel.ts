import { createModel } from '@rematch/core';
// This is a mock
// Used for testing-local purposes
// Real data has to be retrieved from CMS - Screen model
import bfLocalDict from './bflocalDict.json';
import { RootModel } from '../';
import FullSearchAdapter from './fullSearchAdapter';
import SearchService from '../../../services/search/SearchService';
import { IFullSearchContent } from './fullSearchAdapter';
import BFErrorTracking from '../../../utils/tools/errorTracking';

export interface FullSearchModelState {
  query: string;
  appResults: any[] | null;
  contentResults: IFullSearchContent | null;
}

export enum SEARCH_RESULT_TYPES {
  BLOCK_HEADER,
  APP_RESULTS,
  CONTENT_HEADER,
  CONTENT_RESULTS,
  CONTENT_RESULTS_PAGINATED
}

export const fullSearchModel = createModel<RootModel>()({
  state: {
    query: '',
    appResults: null,
    contentResults: null
  } as FullSearchModelState,
  reducers: {
    setQuery: (state, query: string): FullSearchModelState => {
      state.query = query;
      return state;
    },
    setResults: (
      state,
      results: { appResults: any[] | null; contentResults: IFullSearchContent | null }
    ): FullSearchModelState => {
      state.appResults = results.appResults;
      state.contentResults = results.contentResults;
      return state;
    }
  },
  effects: (dispatch) => ({
    async search(_, rootState) {
      try {
        const appResults: any[] = [];
        const query = rootState.fullSearchModel.query.toLowerCase();
        const queryArray = query.split(' ');

        const contentResults: IFullSearchContent = FullSearchAdapter.transformSearchResults(
          await SearchService.query({ query })
        );

        Object.values(bfLocalDict).forEach((searchItem) => {
          let numKeywordsMatched = 0;
          for (const keyword of searchItem.Keywords) {
            for (const q of queryArray) {
              if (keyword.toLowerCase() === q) {
                numKeywordsMatched += 1; // If keyword is exactly equal
              } else if (keyword.toLowerCase().includes(q)) {
                numKeywordsMatched += 0.5; // If keyword just match
              }
            }
          }
          if (numKeywordsMatched) {
            appResults.push({
              name: searchItem.View,
              resultString: searchItem.ResultString,
              numKeywordsMatched
            });
          }
        });
        const sortedResults = appResults.sort((a, b) =>
          b.numKeywordsMatched > a.numKeywordsMatched ? 1 : -1
        );

        dispatch.fullSearchModel.setResults({
          appResults: sortedResults,
          contentResults: contentResults
        });
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    }
  })
});
