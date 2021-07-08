import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Linking, AppState } from 'react-native';
import formatMessage from 'format-message';
import Typography from '../../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';
import { BASIC_FIT_WEBSITE_POLICY } from '../../../utils/constants';

const useHealth = () => {
  const { isAuthorized, data, hasIOSRequestedPermissions, isDisconnected } = useSelector(
    (state) => state.healthModel
  );
  const dispatch: Dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch.healthModel.isAuthorized();
    AppState.addEventListener('change', () => dispatch.healthModel.isAuthorized());
    if (isAuthorized) {
      dispatch.healthModel.getData();
    }
    return () => {
      AppState.removeEventListener('change', () => dispatch.healthModel.isAuthorized());
    };
  }, [dispatch, isAuthorized]);

  const handleOpenPrivacyPolicy = useCallback(() => {
    dispatch.modalModel.setInfo({ visible: false });
    navigation.navigate(Routes.Webview, { uri: BASIC_FIT_WEBSITE_POLICY });
  }, [navigation, dispatch]);

  const handleAuthorize = useCallback(() => {
    if (!isAuthorized && hasIOSRequestedPermissions) {
      return dispatch.modalModel.setInfo({
        visible: true,
        subtitle: formatMessage(
          'Oops, something went wrong. We were not able to connect. Try adapting your device permissions.'
        ),
        acceptText: 'OKAY',
        onAccept: () => {
          Linking.openURL('x-apple-health://');
          dispatch.modalModel.setInfo({ visible: false });
        },
        closeText: formatMessage('CANCEL')
      });
    }

    if (!isAuthorized || (isAuthorized && isDisconnected)) {
      return dispatch.modalModel.setInfo({
        visible: true,
        title: formatMessage('Disclaimer'),
        subtitle: () => {
          return (
            <Typography
              type="regularbfa"
              fontFamily={'trebleRegular'}
              fontSize={13}
              lineHeight={22}
            >
              {formatMessage(
                'When you connect your health app, some data from your health app will be shared and stored by Basic-Fit. If you want more information about which data we process in this context, why and how, read our'
              )}{' '}
              <Typography
                fontFamily={'trebleHeavy'}
                fontSize={13}
                lineHeight={22}
                onPress={handleOpenPrivacyPolicy}
                style={{ textDecorationLine: 'underline', fontWeight: '800' }}
              >
                {formatMessage('privacy policy')}
              </Typography>
              {'.'}
            </Typography>
          );
        },
        closeText: formatMessage('CANCEL'),
        acceptText: formatMessage('OKAY'),
        onAccept: () => {
          dispatch.modalModel.setInfo({ visible: false });
          dispatch.healthModel.authorize();
        }
      });
    }
    if (isAuthorized) {
      dispatch.healthModel.disconnect();
    }
  }, [dispatch, isAuthorized, isDisconnected, hasIOSRequestedPermissions, handleOpenPrivacyPolicy]);

  return {
    isAuthorized: isAuthorized,
    isDisconnected: isDisconnected,
    healthData: data,
    hasIOSRequestedPermissions,
    handleAuthorize: handleAuthorize
  };
};

export default useHealth;
