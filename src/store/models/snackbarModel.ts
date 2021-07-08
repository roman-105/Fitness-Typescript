import { createModel } from '@rematch/core';
import { RootModel } from '.';

export interface SnackbarState {
  message: string | undefined;
}

export const snackbarModel = createModel<RootModel>()({
  state: {
    message: undefined
  } as SnackbarState,
  reducers: {
    setMessage: (state, message: string | undefined): SnackbarState => {
      state.message = message;
      return state;
    }
  },
  effects: (dispatch) => ({
    async report(payload: { message: string }) {
      const { message } = payload;
      dispatch.snackbarModel.setMessage(message);
    },
    async clear() {
      dispatch.snackbarModel.setMessage(undefined);
    }
  })
});
