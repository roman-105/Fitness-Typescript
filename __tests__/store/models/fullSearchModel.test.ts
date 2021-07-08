import { RootModel } from '../../../src/store/models';
import { localDictMock } from '../../../__testConstants__/fullAppSearchResponseMock';
import BFErrorTracking from '../../../src/utils/tools/errorTracking';
import BFAxios from '../../../src/services/BFAxios';
import MockAdapter from 'axios-mock-adapter';
import FullSearchAdapter from '../../../src/store/models/full-search/fullSearchAdapter';
import {
  fullSearchModel,
  FullSearchModelState
} from '../../../src/store/models/full-search/fullSearchModel';

jest.mock('../../../src/store/models/full-search/bflocalDict.json', () => localDictMock);
const recordErrorStub = jest.spyOn(BFErrorTracking, 'recordError');
const transformSearchResultsStub = jest.spyOn(FullSearchAdapter, 'transformSearchResults');

const rootModel: Pick<RootModel, 'fullSearchModel'> = {
  fullSearchModel: { ...fullSearchModel }
};

const BFAxiosMock = new MockAdapter(BFAxios);

const initialContentResults = {
  workouts: [],
  programs: [],
  nutrition: [],
  lifestyle: []
};

const initModel = {
  query: '',
  appResults: null,
  contentResults: null
};

let initialFullSearchState: FullSearchModelState = { ...fullSearchModel.state };

describe('fullSearchModel tests', () => {
  beforeEach(() => {
    rootModel.fullSearchModel = require('../../../src/store/models/full-search').fullSearchModel;
    rootModel.fullSearchModel.state = initModel;
  });

  afterEach(() => {
    recordErrorStub.mockReset();
    transformSearchResultsStub.mockReset();
    BFAxiosMock.reset();
  });

  describe('reducers', () => {
    it('setQuery - should modify the query', () => {
      const result = rootModel.fullSearchModel.reducers.setQuery(initialFullSearchState, 'query');

      expect(result.query).toEqual('query');
    });
    it('setResults - should save results', () => {
      const result = rootModel.fullSearchModel.reducers.setResults(initialFullSearchState, {
        appResults: [],
        contentResults: initialContentResults
      });

      expect(result.appResults).toHaveLength(0);
      expect(result.contentResults).toMatchObject(initialContentResults);
    });
  });

  describe('effects', () => {
    const dispatch: any = {
      fullSearchModel: { setResults: jest.fn() }
    };

    afterEach(() => {
      dispatch.fullSearchModel.setResults.mockReset();
    });

    it('search - should store app-results if simple query matches', async () => {
      BFAxiosMock.onGet(/search/).reply(200, []);
      transformSearchResultsStub.mockReturnValue(initialContentResults);

      await rootModel.fullSearchModel.effects(dispatch).search({}, {
        fullSearchModel: {
          query: 'Progress'
        }
      } as any);

      expect(dispatch.fullSearchModel.setResults).toHaveBeenCalled();
      const args = dispatch.fullSearchModel.setResults.mock.calls[0][0];
      expect(args.appResults).toHaveLength(2);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('search - should store empty array (app-results) if query doesnt match', async () => {
      BFAxiosMock.onGet(/search/).reply(200, []);
      transformSearchResultsStub.mockReturnValue(initialContentResults);

      await rootModel.fullSearchModel.effects(dispatch).search({}, {
        fullSearchModel: {
          query: 'pppp'
        }
      } as any);

      expect(dispatch.fullSearchModel.setResults).toHaveBeenCalled();
      const args = dispatch.fullSearchModel.setResults.mock.calls[0][0];
      expect(args.appResults).toHaveLength(0);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('search - app result should be sorted by weight', async () => {
      BFAxiosMock.onGet(/search/).reply(200, []);
      transformSearchResultsStub.mockReturnValue(initialContentResults);

      await rootModel.fullSearchModel.effects(dispatch).search({}, {
        fullSearchModel: {
          query: 'Trainer'
        }
      } as any);

      expect(dispatch.fullSearchModel.setResults).toHaveBeenCalled();
      const args = dispatch.fullSearchModel.setResults.mock.calls[0][0];
      expect(args.appResults).toHaveLength(2);
      expect(args.appResults[0].name).toEqual('Coach');
      expect(recordErrorStub).not.toHaveBeenCalled();
    });
  });
});
