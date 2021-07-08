import React from 'react';
import { BF_CLUBS_NUM_SERVICES_TO_SHOW } from '../../../utils/constants';
import ClubImagePlaceholder from '../../../assets/images/club/club_placeholder.jpg';
import styles, { CLUB_LOCATION_HEIGHT } from './club-location-card-styles';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import FlatScroll from '../../Layout/FlatScroll/FlatScroll';
import { BFTag } from '../../Tag';
import Typography from '../../Typography';
import { IClub } from '../../../store/models/club';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ClubLocationCardProps {
  club: IClub;
  onPress?: () => void;
}

const ClubLocationCard = ({ club, onPress }: ClubLocationCardProps) => {
  return (
    <TouchableOpacity key={club.clubId} style={styles.selectedClubInnerContainer} onPress={onPress}>
      <FastImage
        style={styles.selectedClubImage}
        source={club.clubImage?.url ? { uri: club.clubImage.url } : ClubImagePlaceholder}
      />
      <View style={styles.selectedClubInfoContainer}>
        <View style={styles.selectedClubHeaderContainer}>
          <Typography style={styles.selectedClubName} type="regularbfa" maxLines={2}>
            {club.name}
          </Typography>
          {club.distanceFromCurrentLocation !== undefined && (
            <Typography type="regularbfa" fontSize={12}>
              {`${club.distanceFromCurrentLocation.toFixed(2)} km`}
            </Typography>
          )}
        </View>
        <View style={styles.selectedClubTagsContainer}>
          {club.services && (
            <FlatScroll
              horizontal
              data={club.services.slice(0, BF_CLUBS_NUM_SERVICES_TO_SHOW).map((service, index) => {
                return (
                  <BFTag
                    style={index ? styles.selectedClubTagSeparation : {}}
                    key={service.id}
                    title={service.name}
                  />
                );
              })}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClubLocationCard;

export const CLUB_LOCATION_CARD_HEIGHT = CLUB_LOCATION_HEIGHT;
