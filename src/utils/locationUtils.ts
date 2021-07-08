import Geolocation from 'react-native-geolocation-service';

type coord = {
  latitude: number;
  longitude: number;
};

const LocationUtils = {
  calculateDistanceBetweenCoords: (coord1: coord, coord2: coord) => {
    const R = 6371e3; // metres
    const φ1 = (coord1.latitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = (R * c) / 1000; // in kilometers
    return d;
  },

  getCurrentLocation: async (): Promise<coord | undefined> => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          resolve(undefined);
        },
        {
          enableHighAccuracy: true,
          timeout: 3000, // 3 seconds
          maximumAge: 1200000 // 2 minutes
        }
      );
    });
  }
};

export default LocationUtils;
