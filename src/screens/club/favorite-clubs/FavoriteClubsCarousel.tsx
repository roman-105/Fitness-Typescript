import React, { useMemo, useCallback } from 'react';
import FlatCarousel from '../../../components/Carousels/FlatCarousel';
import { View, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import FastImage from 'react-native-fast-image';
import clubPlaceholder from '../../../assets/images/club/club_placeholder.jpg';
import styles, { FAVORITE_CLUB_CARD_WIDTH } from './favorite-clubs-section-styles';
import Typography from '../../../components/Typography';
import formatMessage from 'format-message';
import { PlusIcon } from '../../../components/Icon';
import theme from '../../../theme';
import { IClub } from '../../../store/models/club';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';
import { useDispatch } from 'react-redux';

const ADD_FAVORITE_CLUB_CARD_KEY = 'addFavoriteKey';

interface IAddFavoriteCard {
  key: string;
}

interface FavoriteClubsCarouselProps {
  data: IClub[];
}

const isAddFavoriteCard = (
  item: ListRenderItemInfo<IClub | IAddFavoriteCard>
): item is ListRenderItemInfo<IAddFavoriteCard> => {
  return item.item.key === ADD_FAVORITE_CLUB_CARD_KEY;
};

const renderFavoriteCard = (
  { item, index }: { item: IClub; index: number },
  onPress: (club: IClub) => void
) => {
  return (
    <TouchableOpacity
      key={item.key}
      onPress={() => onPress(item)}
      style={[styles.favoriteClubCardContainer, index === 0 && styles.firstFavoriteClubCard]}
    >
      {item.isHomeClub && (
        <View style={styles.favoriteClubCardHomeTag}>
          <Typography type="regularbfa" light fontSize={12} lineHeight={20}>
            {formatMessage('Home club')}
          </Typography>
        </View>
      )}
      <FastImage
        style={styles.favoriteClubCardImage}
        source={item.clubImage?.url ? { uri: item.clubImage.url } : clubPlaceholder}
      />
      <View style={styles.favoriteClubCardContent}>
        <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={22} maxLines={3}>
          {item.name}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const renderAddFavoriteCard = (
  { item, index }: { item: IAddFavoriteCard; index: number },
  onPress: () => void
) => {
  return (
    <TouchableOpacity
      key={item.key}
      onPress={onPress}
      style={[styles.addFavoriteClubCardContainer, index === 0 && styles.firstFavoriteClubCard]}
    >
      <View style={styles.addFavoriteClubCardContent}>
        <PlusIcon fill={theme.colors.secondary.powerPurple} />
        <Typography
          style={styles.addFavoriteClubCardText}
          fontFamily="trebleRegular"
          fontSize={12}
          lineHeight={22}
        >
          {formatMessage('Add club')}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const FavoriteClubsCarousel = ({ data }: FavoriteClubsCarouselProps) => {
  const navigation = useNavigation();
  const dispatch: Dispatch = useDispatch();
  const finalData: (IClub | IAddFavoriteCard)[] = useMemo(() => {
    return [...data, { key: ADD_FAVORITE_CLUB_CARD_KEY }];
  }, [data]);

  const handleNavigateToClubSingular = useCallback(
    (club: IClub) => {
      dispatch.clubModel.setSingularClub(club);
      navigation.navigate(Routes.ClubSingular);
    },
    [navigation, dispatch]
  );

  const handleNavigateToClubFinder = useCallback(() => {
    navigation.navigate(Routes.ClubFinder);
  }, [navigation]);

  return (
    <FlatCarousel
      data={finalData}
      renderItem={(item) => {
        if (isAddFavoriteCard(item)) {
          return renderAddFavoriteCard(item, handleNavigateToClubFinder);
        }
        return renderFavoriteCard(
          (item as any) as ListRenderItemInfo<IClub>,
          handleNavigateToClubSingular
        );
      }}
      itemWidth={FAVORITE_CLUB_CARD_WIDTH}
      snapAlignment="start"
    />
  );
};

export default FavoriteClubsCarousel;
