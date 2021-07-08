import React, { useEffect } from 'react';
import FlatScroll from '../../components/Layout/FlatScroll/FlatScroll';
import { useDispatch, useSelector } from 'react-redux';
import { FooterFromConfig } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const CoachScreen = () => {
  const dispatch = useDispatch();
  const screenFooter = useSelector((state) => state.screenModel.screens.Coach);
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation.dangerouslyGetParent() });

  useEffect(() => {
    dispatch.screenModel.fetch();
  }, [dispatch]);

  const items = [
    <View testID="coach" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Coach!</Text>
    </View>,
    <FooterFromConfig
      config={screenFooter?.bottomButtons}
      navigation={navigation}
      dispatch={dispatch}
    />
  ];

  return <FlatScroll data={items} onScroll={scroll} />;
};

export default CoachScreen;
