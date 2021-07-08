import Geolocation from 'react-native-geolocation-service';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

enum IOS_AUTH_LEVELS {
  whenInUse = 'whenInUse',
  always = 'always'
}

interface useCurrentLocationProps {
  skipRequestPermissions?: boolean;
}

const useCurrentLocation = ({ skipRequestPermissions }: useCurrentLocationProps) => {
  const [currentPosition, setCurrentPosition] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | null
    | undefined
  >(undefined);

  useEffect(() => {
    const requestPermissions = async () => {
      if (!skipRequestPermissions) {
        if (Platform.OS === 'ios')
          await Geolocation.requestAuthorization(IOS_AUTH_LEVELS.whenInUse);
        if (Platform.OS === 'android')
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => setCurrentPosition(null),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestPermissions();
  }, [skipRequestPermissions]);

  return { currentPosition };
};

export default useCurrentLocation;
