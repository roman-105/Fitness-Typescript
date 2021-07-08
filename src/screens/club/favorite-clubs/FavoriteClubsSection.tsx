import React from 'react';
import styles from './favorite-clubs-section-styles';
import { View } from 'react-native';
import Typography from '../../../components/Typography';
import formatMessage from 'format-message';
import FavoriteClubsCarousel from './FavoriteClubsCarousel';
import { useSelector } from 'react-redux';
import BFLoader from '../../../components/Loader/BFLoader';

export const ADD_FAVORITE_CLUB_CARD_KEY = 'addFavoriteClub';

const FavoriteClubSection = () => {
  const { favoriteClubs } = useSelector((state) => state.clubModel);

  return (
    <View style={styles.favoriteClubsContainer}>
      <Typography
        fontFamily="trebleHeavy"
        fontSize={14}
        lineHeight={22}
        uppercase
        style={styles.title}
      >
        {formatMessage('Your favorite clubs')}
      </Typography>
      {!favoriteClubs ? <BFLoader /> : <FavoriteClubsCarousel data={favoriteClubs} />}
    </View>
  );
};

export default FavoriteClubSection;
