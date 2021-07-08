import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from '../screens/profile/Profile';
import { HeaderContainer } from '../components/Header';
import theme from '../theme';
import NotificationsScreen from '../screens/notifications/Notifications';
import QRScreen from '../screens/club/QR';
import SettingsScreen from '../screens/profile/settings/Settings';
import SearchScreen from '../screens/search/Search';
import { ArrowLeftIcon } from '../components/Icon';
import BFWebview from '../components/Webview/BFWebview';
import TestsScreen from '../screens/tests/Tests';
import LoginScreen from '../screens/login/Login';
import SignUpScreen from '../screens/login/SignUp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CastController } from '../components/CastController';
import { useSelector, useDispatch } from 'react-redux';
import ClubSingular from '../screens/club/singular-club/ClubSingular';
import ClubFinder from '../screens/club/club-finder/ClubFinder';
import LessonsSingular from '../screens/lesson/singular-lesson/LessonSingular';
import Lesson from '../screens/lesson/Lesson';
import ClubWorkouts from '../screens/explore/club-workouts/ClubWorkouts';
import AllClubWorkouts from '../screens/explore/club-workouts/all-club-workouts/AllClubWorkouts';
import WorkoutSingular from '../screens/explore/singular-workout/WorkoutSingular';
import RecommendedClubWorkouts from '../screens/explore/club-workouts/recommended/RecommendedWorkouts';
import OnDemandClubWorkouts from '../screens/explore/club-workouts/on-demand/OnDemandWorkouts';
import ConsentScreen from '../screens/personalisation/consent/ConsentScreen';
import Personalisation from '../screens/personalisation/Personalisation';
import PersonalisationConfirmation from '../screens/personalisation/confirmation/PersonalisationConfirmation';
import formatMessage from 'format-message';

const styles: any = StyleSheet.create({
  headerContainer: {
    height: 48,
    backgroundColor: theme.colors.primary.white,
    shadowOpacity: 0,
    elevation: 0
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeAreaContainer: { flex: 1 }
});

const Stack = createStackNavigator();

function RouterComponent() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerContainer,
        headerLeftContainerStyle: { marginHorizontal: 12 },
        headerRightContainerStyle: { marginHorizontal: 12 },
        headerTitle: '',
        headerLeft: (config) => {
          return (
            <TouchableOpacity
              testID="header-back-button"
              style={styles.backButton}
              onPress={config.onPress}
            >
              <ArrowLeftIcon fill={theme.colors.black} />
            </TouchableOpacity>
          );
        }
      }}
    >
      <Stack.Screen name={Routes.Main} component={MainTabNavigator} />
      <Stack.Screen options={{ header: () => null }} name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.Profile}
                items={[
                  {
                    icon: 'settings',
                    onPress: () => navigation.navigate(Routes.Settings)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.Profile}
        component={ProfileScreen}
      />
      <Stack.Screen name={Routes.Notifications} component={NotificationsScreen} />
      <Stack.Screen name={Routes.QR} component={QRScreen} />
      <Stack.Screen name={Routes.Settings} component={SettingsScreen} />
      <Stack.Screen name={Routes.Search} component={SearchScreen} />
      <Stack.Screen name={Routes.Webview} component={BFWebview} />
      <Stack.Screen name={Routes.tests} component={TestsScreen} />
      <Stack.Screen name={Routes.ClubFinder} component={ClubFinder} />
      <Stack.Screen name={Routes.LessonSchedule} component={Lesson} />
      <Stack.Screen name={Routes.Consent} component={ConsentScreen} />
      <Stack.Screen name={Routes.Onboarding} component={Personalisation} />
      <Stack.Screen name={Routes.OnboardingConfirm} component={PersonalisationConfirmation} />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.LessonSingular}
        component={LessonsSingular}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.ClubSingular}
        component={ClubSingular}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.CastController}
        component={CastController}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.ClubWorkouts}
                items={[
                  {
                    icon: 'search',
                    onPress: () => navigation.navigate(Routes.Search)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.ClubWorkouts}
        component={ClubWorkouts}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.AllClubWorkouts}
                items={[
                  {
                    icon: 'search',
                    onPress: () => navigation.navigate(Routes.Search)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.AllClubWorkouts}
        component={AllClubWorkouts}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.WorkoutSingular}
                items={[
                  {
                    icon: 'search',
                    onPress: () => navigation.navigate(Routes.Search)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.WorkoutSingular}
        component={WorkoutSingular}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.RecommendedClubWorkouts}
                items={[
                  {
                    icon: 'search',
                    onPress: () => navigation.navigate(Routes.Search)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.RecommendedClubWorkouts}
        component={RecommendedClubWorkouts}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <HeaderContainer
                route={Routes.OnDemandClubWorkouts}
                items={[
                  {
                    icon: 'search',
                    onPress: () => navigation.navigate(Routes.Search)
                  },
                  {
                    icon: 'notifications',
                    onPress: () => navigation.navigate(Routes.Notifications)
                  }
                ]}
              />
            );
          }
        })}
        name={Routes.OnDemandClubWorkouts}
        component={OnDemandClubWorkouts}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  const {
    ui: { backgroundColor, barStyle },
    walkThrough: { hasBeenDone }
  } = useSelector((state) => state.appModel);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (hasBeenDone === false)
      dispatch.modalModel.setInfo({
        visible: true,
        title: formatMessage('Discover the basic-fit app'),
        subtitle: formatMessage(
          'Find out how you can start a workout, make a reservation, track your progress, and get inspired to Go For It!'
        ),
        acceptText: formatMessage('Show me'),
        onAccept: () => {
          dispatch.modalModel.setInfo({ visible: false });
          dispatch.appModel.setWalkThrough({ index: 0, visible: true });
        },
        closeText: formatMessage('Not now'),
        onClose: () => {
          dispatch.appModel.finishWalkThrough();
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBeenDone]);

  useEffect(() => {
    const init = async () => {
      await dispatch.appModel.checkIfWalkThroughIsDone();
      await dispatch.authModel.refreshAuthedAxios();
      await dispatch.memberModel.getMemberInfo();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: backgroundColor }]}>
        <StatusBar barStyle={barStyle} />
        <RouterComponent />
      </SafeAreaView>
    </>
  );
}
