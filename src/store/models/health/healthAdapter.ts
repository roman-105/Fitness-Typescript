import Fitness from '@ovalmoney/react-native-fitness';
import { Platform } from 'react-native';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

/* Permission options */
const commonPermissions = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read
  },
  {
    kind: Fitness.PermissionKinds.Calories,
    access: Fitness.PermissionAccesses.Read
  },
  {
    kind: Fitness.PermissionKinds.Distances,
    access: Fitness.PermissionAccesses.Read
  },
  {
    kind: Fitness.PermissionKinds.HeartRate,
    access: Fitness.PermissionAccesses.Read
  },
  {
    kind: Fitness.PermissionKinds.SleepAnalysis,
    access: Fitness.PermissionAccesses.Read
  }
];

const androidPermissions = [
  {
    kind: Fitness.PermissionKinds.Activity,
    access: Fitness.PermissionAccesses.Read
  }
];

const permissions = [
  ...commonPermissions,
  ...(Platform.OS === 'android' ? androidPermissions : [])
];

export type dataType = 'steps' | 'distances' | 'calories' | 'hearthRate';

const fitnessActionLookUp: Record<dataType, Function> = {
  steps: Fitness.getSteps,
  distances: Fitness.getDistances,
  calories: Fitness.getCalories,
  hearthRate: Fitness.getHeartRate
};

const HealthAdapter = {
  isAuthorized: async () => {
    if (Platform.OS === 'android') return await Fitness.isAuthorized(permissions);
    if (Platform.OS === 'ios') return await HealthAdapter.isIOSAuthorized();
    return false;
  },
  authorize: async () => {
    const isAuthorized = await Fitness.requestPermissions(permissions);
    if (Platform.OS === 'ios') {
      const isIOSAuthorized = await HealthAdapter.isIOSAuthorized();
      return { isAuthorized: isIOSAuthorized, hasRequestedPermissions: true };
    }
    // Return hasRequestedPermissions: false for not IOS devices
    return { isAuthorized, hasRequestedPermissions: false };
  },
  hasRequestedPermissions: async () => {
    return await Fitness.isAuthorized(permissions);
  },
  isIOSAuthorized: async () => {
    // Due to Apple's privacy model, always true is returned in iOS
    // Workaround: We are getting steps from last day to know if user accepted the permissions
    try {
      const stepsYesterday = await Fitness.getSteps({
        startDate: dayjs().subtract(30, 'day').toISOString(),
        endDate: dayjs().toISOString(),
        interval: 'days'
      });

      return stepsYesterday.length > 0;
    } catch {
      return false;
    }
  },
  getData: async ({
    type,
    startDate,
    endDate,
    interval
  }: {
    type: dataType;
    startDate: Dayjs;
    endDate: Dayjs;
    interval: 'days' | 'hour' | 'minute' | undefined;
  }) => {
    return await fitnessActionLookUp[type]({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      interval
    });
  },
  disconnect: async () => {
    if (Platform.OS === 'android') {
      const isDisconnected = await Fitness.disconnect();
      return { isDisconnected, platform: Platform.OS };
    }
    return { isDisconnected: false, platform: Platform.OS };
  }
};

export default HealthAdapter;
