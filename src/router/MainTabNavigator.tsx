import React, { useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { bottomBarIcon, bottomBarLabel } from '../components/BottomBarIcon';
import { HeaderContainer } from '../components/Header';
import theme from '../theme';
import { Routes } from './routes';

import HomeScreen from '../screens/home/Home';
import ClubScreen from '../screens/club/Club';
import ExploreScreen from '../screens/explore/Explore';
import ProgressScreen from '../screens/progress/Progress';
import CoachScreen from '../screens/coach/Coach';
import usePrivate from '../hooks/usePrivate';

const Tab = createBottomTabNavigator();

const headerConfigLookup: any = {
  [Routes.Home]: (navigateTo: (route: Routes) => void) => ({
    route: Routes.Home,
    left: [{ icon: 'profile', onPress: () => navigateTo(Routes.Profile) }],
    right: [
      { icon: 'card', onPress: () => navigateTo(Routes.QR) },
      { icon: 'notifications', onPress: () => navigateTo(Routes.Notifications) }
    ]
  }),
  [Routes.Programs]: (navigateTo: (route: Routes) => void) => ({
    route: Routes.Programs,
    left: [{ icon: 'profile', onPress: () => navigateTo(Routes.Profile) }],
    right: [
      { icon: 'search', onPress: () => navigateTo(Routes.Search) },
      { icon: 'notifications', onPress: () => navigateTo(Routes.Notifications) }
    ]
  }),
  [Routes.Progress]: (navigateTo: (route: Routes) => void) => ({
    route: Routes.Progress,
    left: [{ icon: 'profile', onPress: () => navigateTo(Routes.Profile) }],
    right: [
      { icon: 'search', onPress: () => navigateTo(Routes.Search) },
      { icon: 'notifications', onPress: () => navigateTo(Routes.Notifications) }
    ]
  }),
  [Routes.Coach]: (navigateTo: (route: Routes) => void) => ({
    route: Routes.Coach,
    left: [{ icon: 'profile', onPress: () => navigateTo(Routes.Profile) }],
    right: [
      { icon: 'search', onPress: () => navigateTo(Routes.Search) },
      { icon: 'notifications', onPress: () => navigateTo(Routes.Notifications) }
    ]
  }),
  [Routes.Club]: (navigateTo: (route: Routes) => void) => ({
    route: Routes.Club,
    left: [{ icon: 'profile', onPress: () => navigateTo(Routes.Profile) }],
    right: [
      { icon: 'card', onPress: () => navigateTo(Routes.QR) },
      { icon: 'notifications', onPress: () => navigateTo(Routes.Notifications) }
    ]
  })
};

const MainTabNavigator = ({
  Home = HomeScreen,
  Programs = ExploreScreen,
  Progress = ProgressScreen,
  Coach = CoachScreen,
  Club = ClubScreen
}) => {
  const navigation = useNavigation();
  const indexTab: number | undefined = navigation.dangerouslyGetState().routes[0]?.state?.index;

  const navigateTo = useCallback(
    (route: Routes) => {
      navigation.navigate(route);
    },
    [navigation]
  );

  useEffect(() => {
    const navState: any = navigation.dangerouslyGetState().routes[0]?.state;
    // indexTab === undefined => firstTab

    const headerConfig =
      indexTab !== undefined
        ? headerConfigLookup[navState?.routeNames[indexTab]](navigateTo)
        : headerConfigLookup[Routes.Home](navigateTo);

    navigation.setOptions({
      headerLeft: () => <HeaderContainer route={headerConfig.route} items={headerConfig.left} />,
      headerRight: () => <HeaderContainer route={headerConfig.route} items={headerConfig.right} />
    });
  }, [navigation, indexTab, navigateTo]);

  // make the whole tab navigator private
  usePrivate();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: bottomBarIcon(route.name as Routes),
        tabBarLabel: bottomBarLabel(route.name as Routes)
      })}
      tabBarOptions={{
        style: { height: 48 },
        showLabel: true,
        inactiveTintColor: '#838386', // this color only appears here
        activeTintColor: theme.colors.primary.orange
      }}
    >
      <Tab.Screen options={{ tabBarTestID: 'home-tab' }} name={Routes.Home} component={Home} />
      <Tab.Screen
        options={{ tabBarTestID: 'programs-tab' }}
        name={Routes.Programs}
        component={Programs}
      />
      <Tab.Screen
        options={{ tabBarTestID: 'progress-tab' }}
        name={Routes.Progress}
        component={Progress}
      />
      <Tab.Screen options={{ tabBarTestID: 'coach-tab' }} name={Routes.Coach} component={Coach} />
      <Tab.Screen options={{ tabBarTestID: 'club-tab' }} name={Routes.Club} component={Club} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
