import { createModel } from '@rematch/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootModel } from '../';
import theme from '../../../theme';

export type barStyleType = 'light-content' | 'dark-content';
export const WALKTHROUGH_COMPLETED_KEY = 'WALKTHROUGH_COMPLETED_KEY';

export interface AppModelState {
  ui: {
    backgroundColor: string;
    barStyle: barStyleType;
  };
  walkThrough: {
    index: number;
    visible: boolean;
    hasBeenDone?: boolean;
  };
}

export const appModel = createModel<RootModel>()({
  state: {
    ui: {
      backgroundColor: theme.colors.primary.white,
      barStyle: 'dark-content'
    },
    walkThrough: {
      index: 0,
      visible: false,
      hasBeenDone: undefined // Flag to know if user has already finish the walkThrough (Async-storage)
    }
  } as AppModelState,
  reducers: {
    changeUI: (
      state,
      { backgroundColor, barStyle }: { backgroundColor: string; barStyle: barStyleType }
    ): AppModelState => {
      state.ui.backgroundColor = backgroundColor;
      state.ui.barStyle = barStyle;
      return state;
    },
    setWalkThrough: (
      state,
      { index, visible, hasBeenDone }: { index?: number; visible?: boolean; hasBeenDone?: boolean }
    ): AppModelState => {
      if (index !== undefined) state.walkThrough.index = index;
      if (visible !== undefined) state.walkThrough.visible = visible;
      if (hasBeenDone !== undefined) state.walkThrough.hasBeenDone = hasBeenDone;
      return state;
    }
  },
  effects: (dispatch) => ({
    async finishWalkThrough() {
      await AsyncStorage.setItem(WALKTHROUGH_COMPLETED_KEY, JSON.stringify(true));
      dispatch.appModel.setWalkThrough({ index: 0, visible: false, hasBeenDone: true });
    },
    async checkIfWalkThroughIsDone() {
      const hasBeenDone = (await AsyncStorage.getItem(WALKTHROUGH_COMPLETED_KEY)) === 'true';
      dispatch.appModel.setWalkThrough({ hasBeenDone });
    }
  })
});
