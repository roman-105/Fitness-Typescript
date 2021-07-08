import { createModel } from '@rematch/core';
import dayjs, { Dayjs } from 'dayjs';
import formatMessage from 'format-message';
import { RootModel } from '../';
import HealthAdapter, { dataType } from './healthAdapter';
import { Linking, Platform } from 'react-native';

const DEFAULT_PERIOD = 14;

export interface HealthModelState {
  isAuthorized: boolean;
  hasIOSRequestedPermissions: boolean;
  data: Record<dataType, any[]>;
  isDisconnected: boolean;
}

export const keys: dataType[] = ['steps', 'distances', 'calories', 'hearthRate'];

export const healthModel = createModel<RootModel>()({
  state: {
    isAuthorized: false,
    hasIOSRequestedPermissions: false,
    data: {
      steps: [],
      distances: [],
      calories: [],
      hearthRate: []
    },
    isDisconnected: false
  } as HealthModelState,
  reducers: {
    setIsAuthorized: (
      state,
      {
        isAuthorized,
        hasRequestedPermissions
      }: { isAuthorized: boolean; hasRequestedPermissions: boolean }
    ) => {
      state.isAuthorized = isAuthorized;
      state.hasIOSRequestedPermissions = hasRequestedPermissions;
      return state;
    },
    storeData: (state, data: any[]) => {
      data.forEach((element: any, index: number) => {
        state.data[keys[index]] = element;
      });
      return state;
    },
    setIsDisconnected: (state, { isDisconnected }: { isDisconnected: boolean }) => {
      state.isDisconnected = isDisconnected;
      return state;
    }
  },
  effects: (dispatch) => ({
    async isAuthorized(_, rootstate) {
      const previousAuthorization = rootstate.healthModel.isAuthorized;
      const isAuthorized = await HealthAdapter.isAuthorized();
      if (previousAuthorization === true && isAuthorized === false) {
        dispatch.snackbarModel.report({
          message: formatMessage('The connection has succesfully been removed')
        });
      }
      if (Platform.OS === 'ios' && previousAuthorization === false && isAuthorized === true) {
        dispatch.snackbarModel.report({
          message: formatMessage('The connection has successfully been established')
        });
      }
      const hasRequestedPermissions = await HealthAdapter.hasRequestedPermissions();
      dispatch.healthModel.setIsAuthorized({
        isAuthorized: isAuthorized,
        hasRequestedPermissions: hasRequestedPermissions
      });
    },
    async authorize() {
      const { isAuthorized, hasRequestedPermissions } = await HealthAdapter.authorize();
      dispatch.healthModel.setIsAuthorized({ isAuthorized: isAuthorized, hasRequestedPermissions });
      dispatch.healthModel.setIsDisconnected({ isDisconnected: false });
      if (isAuthorized) {
        dispatch.snackbarModel.report({
          message: formatMessage('The connection has successfully been established')
        });
      }
      if (!isAuthorized) {
        dispatch.snackbarModel.report({
          message: formatMessage('Oops, something went wrong. We were not able to connect.')
        });
      }
    },
    async getData() {
      const startDate: Dayjs = dayjs().subtract(DEFAULT_PERIOD, 'days');
      const endDate: Dayjs = dayjs();

      const promises = keys.map((key: dataType) =>
        HealthAdapter.getData({
          type: key,
          startDate: startDate,
          endDate: endDate,
          interval: 'days'
        })
      );

      const results = await Promise.all(promises);
      dispatch.healthModel.storeData(results);
    },
    async disconnect() {
      const { isDisconnected, platform } = await HealthAdapter.disconnect();
      if (platform === 'android' && isDisconnected) {
        dispatch.snackbarModel.report({
          message: formatMessage('The connection has succesfully been removed')
        });
      }
      if (platform === 'ios') {
        dispatch.modalModel.setInfo({
          visible: true,
          subtitle: formatMessage(
            'To disconnect open the Health app - Go to Profile - Privacy - Apps - BFA - Press Turn All Categories Off'
          ),
          acceptText: 'OKAY',
          onAccept: () => {
            Linking.openURL('x-apple-health://');
            dispatch.modalModel.setInfo({ visible: false });
          },
          closeText: formatMessage('CANCEL')
        });
      }
      dispatch.healthModel.setIsDisconnected({ isDisconnected: isDisconnected });
    }
  })
});
