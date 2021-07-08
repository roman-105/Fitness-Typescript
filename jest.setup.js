import { setup } from 'format-message';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.useFakeTimers();
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('@react-native-firebase/perf', () => {
  return () => ({
    startTrace: () => ({
      putAttribute: jest.fn(),
      putMetric: jest.fn(),
      stop: jest.fn()
    })
  });
});

jest.mock('@react-native-firebase/analytics', () => {
  const logMock = jest.fn();
  return () => ({
    logEvent: logMock
  });
});

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    recordError: jest.fn(),
    log: jest.fn()
  });
});

jest.mock('react-native-google-cast', () => {
  return () => undefined;
});

jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: () => 'nl',
  getCountry: () => 'nl'
}));

setup({
  missingTranslation: 'ignore'
});
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('@ovalmoney/react-native-fitness', () => {
  return {
    isAuthorized: jest.fn(),
    authorize: jest.fn(),
    getSteps: jest.fn(),
    getDistances: jest.fn(),
    getCalories: jest.fn(),
    getHeartRate: jest.fn(),
    PermissionKinds: {},
    PermissionAccesses: {}
  };
});

jest.mock('react-native-geolocation-service', () => ({
  requestAuthorization: jest.fn(),
  getCurrentPosition: jest.fn()
}));
