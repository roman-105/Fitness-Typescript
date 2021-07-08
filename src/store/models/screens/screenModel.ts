import { createModel } from '@rematch/core';
import { RootModel } from '../';
import { BFIScreen, FetchScreens } from './screenAdapter';
import { isEmpty } from '../../../utils/utils';

export type screenModelState = { [index: string]: BFIScreen };

export const screenModel = createModel<RootModel>()({
  state: {
    // May look weird but this is to be able to get a screen like
    // state.screenModel.screens.home => BFIScreen
    screens: {} as screenModelState
  },
  reducers: {
    setScreens: (state, screens: BFIScreen[]) => {
      screens.forEach((screen) => {
        state.screens[screen.route] = screen;
      });
      return state;
    }
  },
  effects: (dispatch) => ({
    async fetch(_, rootState) {
      if (isEmpty(rootState.screenModel.screens)) {
        const result: BFIScreen[] = await FetchScreens();
        dispatch.screenModel.setScreens(result);
      }
    }
  })
});
