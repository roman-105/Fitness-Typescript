import remoteConfig, { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';

const BFRemoteConfig = {
  setDefaults: async (defaultConfig: FirebaseRemoteConfigTypes.ConfigDefaults) => {
    await remoteConfig().setDefaults(defaultConfig);
  },
  fetchAndActivate: async () => {
    await remoteConfig().fetchAndActivate();
  },
  getValue: async (key: string): Promise<FirebaseRemoteConfigTypes.ConfigValue> => {
    return remoteConfig().getValue(key);
  }
};

export default BFRemoteConfig;
