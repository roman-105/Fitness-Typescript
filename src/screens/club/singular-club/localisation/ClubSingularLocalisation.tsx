import React, { useCallback } from 'react';
import Typography from '../../../../components/Typography/Typography';
import formatMessage from 'format-message';
import { Container } from '../../../../components/Layout/Layout';
import MapView, { Marker } from 'react-native-maps';
import ClubSelectedMarker from '../../../../assets/images/club/club_selected_marker.png';
import styles from './club-singular-localisation-styles';
import { IClubSingular } from '../../../../store/models/club';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../router/routes';

interface ClubSingularLocalisationProps {
  club: IClubSingular;
}

const ClubSingularLocalisation = ({ club }: ClubSingularLocalisationProps) => {
  const navigation = useNavigation();

  const handlePressOnMap = useCallback(() => {
    navigation.navigate(Routes.ClubFinder, {
      preSelectedClub: club
    });
  }, [navigation, club]);

  return (
    <>
      <Container>
        <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={22}>
          {formatMessage('Localisation')}
        </Typography>
      </Container>
      <MapView
        onPress={handlePressOnMap}
        initialRegion={{
          latitude: club.location.lat,
          longitude: club.location.lon,
          latitudeDelta: 0.0075,
          longitudeDelta: 0.0075
        }}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        style={styles.mapView}
      >
        <Marker
          image={ClubSelectedMarker}
          coordinate={{ latitude: club.location.lat, longitude: club.location.lon }}
          onPress={handlePressOnMap}
        />
      </MapView>
    </>
  );
};

export default ClubSingularLocalisation;
