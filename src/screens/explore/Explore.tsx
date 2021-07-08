import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs';
import FlatScroll from '../../components/Layout/FlatScroll/FlatScroll';
import BrowseScreen from './browse/Browse';
import FavouritesScreen from './favourites/Favourites';
import styles from './explore-styles';
import { BFTabBar } from '../../components/TabBar';
import { FooterFromConfig } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const Tab = createMaterialTopTabNavigator();

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const screenFooter = useSelector((state) => state.screenModel.screens.Explore);
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
          title="Explore"
          state={_props.state}
          descriptors={_props.descriptors}
          navigation={_props.navigation}
          position={_props.position}
        />
      )}
    >
      <Tab.Screen options={{ tabBarTestID: 'browse-tab' }} name="Browse" component={BrowseScreen} />
      <Tab.Screen
        options={{ tabBarTestID: 'favourites-tab' }}
        name="Favourites"
        component={FavouritesScreen}
      />
    </Tab.Navigator>,
    <FooterFromConfig
      config={screenFooter?.bottomButtons}
      navigation={navigation}
      dispatch={dispatch}
    />
  ];

  return <FlatScroll style={styles.container} data={items} onScroll={scroll} />;
};

export default ExploreScreen;
