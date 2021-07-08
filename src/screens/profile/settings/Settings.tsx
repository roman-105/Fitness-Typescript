import React from 'react';
import { View, Text } from 'react-native';
import BFButton from '../../../components/Button/BFButton';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function onLogout() {
    dispatch.authModel.Logout();
    navigation.reset({ index: 0, routes: [{ name: Routes.Login }] });
  }

  return (
    <View testID="settings" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <BFButton title="Log-out" onPress={onLogout} />
    </View>
  );
};

export default SettingsScreen;
