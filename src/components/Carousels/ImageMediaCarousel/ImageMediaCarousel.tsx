import React, { useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formatMessage from 'format-message';
import { Routes } from '../../../router/routes';
import FlatCarousel from '../FlatCarousel';
import styles, { size } from './image-media-carousel-style';
import MediaWithInfoSquareCard, {
  MediaWithInfoSquareCardProps
} from '../../Card/MediaWithInfo/MediaWithInfoSquareCard';
import DateUtils from '../../../utils/dateUtils';

export type HasKey = { key: string };
export type ImageMediaCarouselProps = MediaWithInfoSquareCardProps & HasKey;

const renderCard = (
  { item }: ListRenderItemInfo<ImageMediaCarouselProps>,
  handleNavigateToSigularWorkout: (id: string | undefined) => void,
  onPress: () => void,
  placeholder: string,
  isFavouriteItem?: boolean
) => {
  const level = item?.level?.map((i: any) => i.title);
  return (
    <View style={styles.container}>
      <MediaWithInfoSquareCard
        id={item.id}
        image={item.picture?.url || placeholder}
        name={item.name}
        dificulty={level}
        duration={`${DateUtils.formatHoursToMinutes(item?.duration)}` || formatMessage('30 min')}
        onPress={onPress}
        handleNavigate={handleNavigateToSigularWorkout}
        isFavouriteItem={isFavouriteItem}
      />
    </View>
  );
};

const ImageMediaCarousel = (props: {
  data: ImageMediaCarouselProps[];
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
      itemWidth={size + 8 * 2}
      snapAlignment="center"
    />
  );
};

export default ImageMediaCarousel;
