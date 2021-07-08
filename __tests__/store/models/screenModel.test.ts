import { RootModel } from '../../../src/store/models';
import { screenModel } from '../../../src/store/models/screens';
import { Routes } from '../../../src/router/routes';
import {
  contentResult,
  expectedResult
} from '../../../__testConstants__/contentfulResultScreenMock';
// @ts-ignore
import contenful from 'contentful/dist/contentful.browser.min.js';

const rootModel: Pick<RootModel, 'screenModel'> = {
  screenModel: { ...screenModel }
};

jest.mock('contentful/dist/contentful.browser.min.js', () => {
  const mock = jest.fn(() => contentResult);
  return {
    createClient: () => ({ getEntries: mock })
  };
});

describe('screenModel tests', () => {
  beforeEach(() => {
    rootModel.screenModel = require('../../../src/store/models/screens').screenModel;
    rootModel.screenModel.state = { screens: {} };
    contenful.createClient().getEntries.mockClear();
  });

  describe('reducers', () => {
    it('should add screens', () => {
      const result = rootModel.screenModel.reducers.setScreens({ screens: {} }, [
        {
          route: 'Login' as Routes
        },
        {
          route: 'Home' as Routes
        }
      ]);
      expect(result.screens.Login).toEqual({ route: 'Login' });
      expect(result.screens.Home).toEqual({ route: 'Home' });
    });
  });

  describe('effects', () => {
    it('should handle a failed response gracefully', async () => {
      const dispatch: any = {
        screenModel: { setScreens: jest.fn() }
      };

      contenful.createClient().getEntries.mockReturnValueOnce(null);

      rootModel.screenModel
        .effects(dispatch)
        // @ts-ignore
        .fetch(null, { screenModel: { screens: {} } });

      expect(rootModel.screenModel.state).toStrictEqual({ screens: {} });
    });

    it('should not call fetch if there was data in screens', async () => {
      const dispatch: any = {
        screenModel: { setScreens: jest.fn() }
      };
      rootModel.screenModel
        .effects(dispatch)
        // @ts-ignore
        .fetch(null, { screenModel: { screens: { route: 'mocked' } } });

      expect(contenful.createClient().getEntries).not.toBeCalled();
    });

    it('should work properly', async () => {
      const mockedState: any = { screenModel: { screens: {} } };
      const dispatch: any = { screenModel: { setScreens: jest.fn() } };

      await rootModel.screenModel.effects(dispatch).fetch(null, mockedState);

      expect(contenful.createClient().getEntries).toBeCalled();
      expect(dispatch.screenModel.setScreens).toBeCalledWith(expectedResult);
    });
  });
});
