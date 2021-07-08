import React, { useEffect } from 'react';
import ForYouScreen from './for-you/ForYou';
import FeedScreen from './feed/Feed';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs';
import FlatScroll from '../../components/Layout/FlatScroll/FlatScroll';
import styles from './home-styles';
import { BFTabBar } from '../../components/TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { FooterFromConfig } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const dispatch: Dispatch = useDispatch();
  const screenFooter = useSelector((state) => state.screenModel.screens.Home);
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation.dangerouslyGetParent() });

  useEffect(() => {
    dispatch.screenModel.fetch();
  }, [dispatch]);

  const items = [
    <Tab.Navigator
      tabBarOptions={{ scrollEnabled: true }}
      tabBar={(_props: MaterialTopTabBarProps) => (
        <BFTabBar
          title="Hello james"
          subtitle="Each day is an opportunity to start something new! Go for it!"
          state={_props.state}
          descriptors={_props.descriptors}
          navigation={_props.navigation}
          position={_props.position}
        />
      )}
    >
      <Tab.Screen
        options={{ tabBarTestID: 'for-you-tab' }}
        name="For You"
        component={ForYouScreen}
      />
      <Tab.Screen options={{ tabBarTestID: 'feed-tab' }} name="Feed" component={FeedScreen} />
    </Tab.Navigator>,
    <>
      <FooterFromConfig
        config={screenFooter?.bottomButtons}
        navigation={navigation}
        dispatch={dispatch}
      />
    </>
  ];

  return <FlatScroll style={styles.container} data={items} onScroll={scroll} />;
};

export default HomeScreen;
