import { RootModel } from '../../../src/store/models';
import { authModel } from '../../../src/store/models/authModel';
import MockAdapter from 'axios-mock-adapter';

import RNSecureKeyStore from 'react-native-secure-key-store';
import axios from 'axios';

const rootModel: Pick<RootModel, 'authModel'> = {
  authModel: { ...authModel }
};

const axiosMock = new MockAdapter(axios);

jest.mock('react-native-secure-key-store', () => {
  const get = jest.fn();
  const set = jest.fn();
  const remove = jest.fn();
  return { get, set, remove, ACCESSIBLE: { ALWAYS_THIS_DEVICE_ONLY: 'mock' } };
});

describe('authModel tests', () => {
  describe('reducers', () => {
    beforeEach(() => {
      rootModel.authModel = require('../../../src/store/models/authModel').authModel;
      rootModel.authModel.state = require('../../../src/store/models/authModel').authModel.state;
    });

    it('sets auth correctly', () => {
      // @ts-ignore
      const newState = authModel.reducers.setAuth(rootModel.authModel.state, 'mocked');
      expect(newState).toStrictEqual({ isAuthenticated: 'mocked' });
    });
  });

  describe('effects', () => {
    const dispatch: any = {
      authModel: { setAuth: jest.fn(), refreshAuthedAxios: jest.fn() },
      memberModel: { getMemberInfo: jest.fn() }
    };

    beforeEach(() => {
      rootModel.authModel = require('../../../src/store/models/authModel').authModel;
      (RNSecureKeyStore.get as any).mockClear();
      (RNSecureKeyStore.set as any).mockClear();
      (RNSecureKeyStore.remove as any).mockClear();
      axiosMock.reset();
      dispatch.authModel.refreshAuthedAxios.mockClear();
      dispatch.authModel.setAuth.mockClear();
    });
    it('on failed login should not set encrypted data and not call getAuthed', async () => {
      axiosMock.onPost(/auth\/token/).reply(401);
      await expect(
        rootModel.authModel.effects(dispatch).Login({ user: 'mock', pass: 'mock' })
      ).rejects.toThrow();
      expect(RNSecureKeyStore.set).not.toBeCalled();
      expect(dispatch.authModel.refreshAuthedAxios).not.toBeCalled();
    });

    it('on successfull login should set encrypted data and call getAuthed', async () => {
      axiosMock.onPost(/auth\/token/).reply(200, { mocked: true });
      await rootModel.authModel.effects(dispatch).Login({ user: 'mock', pass: 'mock' });
      expect(RNSecureKeyStore.set).toBeCalled();
      expect(dispatch.authModel.refreshAuthedAxios).toBeCalled();
      expect(dispatch.memberModel.getMemberInfo).toBeCalled();
    });

    it('should not recreate a authedAxiosInstance from encrypted storage if is authenticated', async () => {
      rootModel.authModel
        .effects(dispatch)
        // @ts-ignore
        .refreshAuthedAxios(false, { authModel: { isAuthenticated: true } });
      expect(RNSecureKeyStore.get).not.toBeCalled();
    });

    it('should throw an error if trying to get a axios instance when no keys are stored', async () => {
      await expect(
        rootModel.authModel
          .effects(dispatch)
          // @ts-ignore
          .refreshAuthedAxios(false, { authModel: { isAuthenticated: false } })
      ).rejects.toThrow();
      expect(dispatch.authModel.setAuth).not.toBeCalled();
    });

    it('should logout', async () => {
      const customDispatch = jest.fn() as any;
      customDispatch.authModel = { setAuth: jest.fn() };

      await rootModel.authModel.effects(customDispatch).Logout();
      expect(customDispatch).toHaveBeenCalled();
      expect(customDispatch.authModel.setAuth).toBeCalledWith(false);
    });
  });
});
