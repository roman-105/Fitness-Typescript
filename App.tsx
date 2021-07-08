/**
 * BFA App made by Team Los Gimnasitos 2020
 * Roi, Felipe & Miguel
 *
 * @format
 **/

import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Router from './src/router/Router';
import Config from 'react-native-config';
import { SnackBar } from './src/components/Snackbar';
import { BFModal } from './src/components/Modal';
import { BFWalkthroughModal } from './src/components/Modal';
import { Provider } from 'react-redux';
import './src/utils/i18n/i18n';
import { store } from './src/store/store';
import theme from './src/theme';
import { Routes } from './src/router/routes';
import locale from './src/utils/i18n/locale';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/nl';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.locale(locale);
dayjs.extend(advancedFormat);

if (Config.HIDE_LOG_BOX_WARNINGS === 'true') LogBox.ignoreAllLogs(true);

// Add Maps from deeplinks to Routes
// Key is the Route and value is what triggers that route
// for example, a deeplink like bfa://qr triggers QR route.
// for adding parameters you just add a /:<param_name>
// in this example 'bfa://my.basic-fit.com/membership'
// calls WEBVIEW route with {params: {deeplink: 'membership'}}
const config = {
  screens: {
    [Routes.QR]: 'qr',
    [Routes.ClubSingular]: 'club/:clubId',
    [Routes.WorkoutSingular]: 'club/:workoutId',
    [Routes.Webview]: 'my.basic-fit.com/:deeplink',
    [Routes.LessonSingular]: 'groupLesson/:clubId/:lessonId',
    [Routes.tests]: 'tests'
  }
};

const linking: LinkingOptions = {
  prefixes: ['bfa://'],
  config
};

const navTheme = DefaultTheme;
navTheme.colors.background = theme.colors.primary.white;

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme} linking={linking}>
        <Router />
      </NavigationContainer>
      <SnackBar />
      <BFModal />
      <BFWalkthroughModal />
    </Provider>
  );
};

export default App;
