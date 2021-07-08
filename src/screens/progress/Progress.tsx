import React, { useEffect } from 'react';
import FlatScroll from '../../components/Layout/FlatScroll/FlatScroll';
import { useDispatch, useSelector } from 'react-redux';
import { FooterFromConfig } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Health from './health/Health';
import formatMessage from 'format-message';
import Typography from '../../components/Typography/Typography';
import styles from './progress-styles';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const ProgressScreen = () => {
  const dispatch = useDispatch();
  const screenFooter = useSelector((state) => state.screenModel.screens.Progress);
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation.dangerouslyGetParent() });

  useEffect(() => {
    dispatch.screenModel.fetch();
  }, [dispatch]);

  const items = [
    <View testID="progress">
      <View style={styles.headerContainer}>
        <Typography type="h1" uppercase>
          {formatMessage('Connected app')}
        </Typography>
      </View>
      <Health />
      <FooterFromConfig
        config={screenFooter?.bottomButtons}
        navigation={navigation}
        dispatch={dispatch}
      />
    </View>
  ];

  return <FlatScroll data={items} onScroll={scroll} />;
};

export default ProgressScreen;
