import crashlytics from '@react-native-firebase/crashlytics';

const BFErrorTracking = {
  recordError: (error: Error) => {
    crashlytics().recordError(error);
  },
  log: (message: string) => {
    crashlytics().log(message);
  }
};

export default BFErrorTracking;
