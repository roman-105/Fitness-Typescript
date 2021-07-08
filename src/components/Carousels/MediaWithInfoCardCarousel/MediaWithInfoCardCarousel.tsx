import React, { useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import FlatCarousel from '../../../components/Carousels/FlatCarousel';
import { useNavigation } from '@react-navigation/native';
import formatMessage from 'format-message';
import { Routes } from '../../../router/routes';
import MediaWithInfoCard, {
  MediaWithInfoCardProps
} from '../../Card/MediaWithInfo/MediaWithInfoCard';
import styles from './media-info-card-carousel-style';
import DateUtils from '../../../utils/dateUtils';

export type HasKey = { key: string };
export type MediaWithInfoCardCarouselProps = MediaWithInfoCardProps & HasKey;

const renderCard = (
  { item }: ListRenderItemInfo<MediaWithInfoCardProps>,
  handleNavigateToSigularWorkout: (id: string | undefined) => void,
  onPress: () => void,
  placeholder: string,
  isFavourite?: boolean
) => {
  const level = item?.level?.map((i: any) => i.title);
  return (
    <View style={styles.container}>
      <MediaWithInfoCard
        id={item.id}
        image={item.picture?.url || placeholder}
        name={item.name}
        dificulty={level}
        duration={`${DateUtils.formatHoursToMinutes(item?.duration)}` || formatMessage('30 min')}
        onPress={onPress}
        handleNavigate={handleNavigateToSigularWorkout}
        isFavouriteItem={isFavourite}
      />
    </View>
  );
};

const MediaWithInfoCardCarousel = (props: {
  data: MediaWithInfoCardCarouselProps[];
  testID?: string;
  onPress: () => void;
  placeholder: string;
  isFavourite?: boolean;
}) => {
  const navigation = useNavigation();

  const handleNavigateToSigularWorkout = useCallback(
    (id) => {
      navigation.navigate(Routes.WorkoutSingular, { key: id });
    },
    [navigation]
  );

  return (
    <FlatCarousel
      testID={props.testID}
      data={props.data}
      renderItem={(item) => {
        return renderCard(
          item,
          handleNavigateToSigularWorkout,
          props.onPress,
          props.placeholder,
          props.isFavourite
        );
      }}
      snapAlignment="start"
      itemWidth={0}
    />
  );
};

export default MediaWithInfoCardCarousel;
