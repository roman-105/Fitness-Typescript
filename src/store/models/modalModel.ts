import { createModel } from '@rematch/core';
import { RootModel } from '.';

export interface modalState {
  info: {
    visible: boolean;
    title?: string;
    subtitle?: string | (() => void);
    closeText?: string;
    acceptText?: string;
    onAccept?: () => void;
    onClose?: () => void;
  };
}

export const modalModel = createModel<RootModel>()({
  state: {
    info: {
      visible: false
    }
  } as modalState,
  reducers: {
    setInfo: (state: any, info: modalState['info'] | undefined): modalState => {
      state.info = info;
      return state;
    }
  },
  effects: (dispatch) => ({
    async report(payload: { info: modalState['info'] }) {
      const { info } = payload;
      dispatch.modalModel.setInfo(info);
    }
  })
});
