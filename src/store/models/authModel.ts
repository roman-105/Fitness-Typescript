import { createModel } from '@rematch/core';
import { doLogin, doLogout, updateBFAxios } from '../../services/Auth';
import { RootModel } from '.';

export interface AuthState {
  isAuthenticated: boolean | null;
}

export const authModel = createModel<RootModel>()({
  state: {
    isAuthenticated: null
  } as AuthState,
  reducers: {
    setAuth: (state, isAuthenticated: boolean): AuthState => {
      state.isAuthenticated = isAuthenticated;
      return state;
    }
  },
  effects: (dispatch) => ({
    async Login(payload: { user: string; pass: string }) {
      const { user, pass } = payload;
      await doLogin(user, pass);
      await dispatch.authModel.refreshAuthedAxios();
      await dispatch.memberModel.getMemberInfo();
    },
    async Logout() {
      await doLogout();
      dispatch.authModel.setAuth(false);
      dispatch({ type: 'RESET_APP' });
    },
    async refreshAuthedAxios(_, rootState) {
      if (!rootState.authModel.isAuthenticated) {
        await updateBFAxios();
        dispatch.authModel.setAuth(true);
      }
    }
  })
});
