import React, { useCallback } from 'react';
import { Container } from '../../../../components/Layout/Layout';
import { View, ViewStyle, TouchableOpacity, Platform, Linking } from 'react-native';
import Typography from '../../../../components/Typography';
import { ClockOutlinedIcon, MyClubIcon, RouteIcon } from '../../../../components/Icon';
import theme from '../../../../theme';
import formatMessage from 'format-message';
import styles from './club-singular-basic-info-styles';
import { IClubSingular } from '../../../../store/models/club/clubModelAdapter';

interface ClubSingularBasicInfoProps {
  club: IClubSingular;
  style?: ViewStyle;
}

const ClubSingularBasicInfo = ({ club, style }: ClubSingularBasicInfoProps) => {
  const handlePressDirections = useCallback(() => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${club.location.lat},${club.location.lon}`;
    const label = club.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) Linking.openURL(url);
  }, [club]);

  return (
    <Container marginVertical={8} style={style}>
      <Typography
        style={styles.clubAddress}
        fontFamily="trebleHeavy"
        fontSize={14}
        lineHeight={22}
        uppercase
      >
        {`${club.address}, ${club.postalCode} \n${club.city}`}
      </Typography>
      {club.distanceFromCurrentLocation && (
        <View style={styles.clubIconContainer}>
          <MyClubIcon style={styles.icon} fill={theme.colors.primary.asphaltGrey} />
          <Typography type="regularbfa" fontSize={12} lineHeight={20}>
            {`${club.distanceFromCurrentLocation.toFixed(1)}km ${formatMessage(
              'from your location'
            )}`}
          </Typography>
        </View>
      )}
      <View style={styles.clubIconContainer}>
        <ClockOutlinedIcon style={styles.icon} fill={theme.colors.primary.asphaltGrey} />
        <Typography type="regularbfa" fontSize={12} lineHeight={20}>
          {club.status}
        </Typography>
      </View>
      <TouchableOpacity style={styles.clubDirectionsButton} onPress={handlePressDirections}>
        <Typography fontFamily="trebleHeavy" fontSize={12}>
          {formatMessage('Directions')}
        </Typography>
        <RouteIcon fill={theme.colors.primary.asphaltGrey} />
      </TouchableOpacity>
    </Container>
  );
};

export default ClubSingularBasicInfo;
