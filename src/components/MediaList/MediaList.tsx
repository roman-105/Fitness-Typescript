import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formatMessage from 'format-message';
import MediaListCard, { MediaListCardProps } from './MediaListCard';
import styles from './media-list-style';
import { Routes } from '../../router/routes';
import DateUtils from '../../utils/dateUtils';
import BFLoader from '../Loader/BFLoader';

export type HasKey = { key: string };
export type MediaListProps = MediaListCardProps & HasKey;

function defaultKeyExtractor(item: HasKey) {
  return item.key;
}

const renderCard = (
  { item }: ListRenderItemInfo<MediaListCardProps>,
  handleNavigateToSigularWorkout: (id: string | undefined) => void,
  onPress: () => void,
  placeholder: string
) => {
  const level = item?.level?.map((i: any) => i.title);
  return (
    <View style={styles.container}>
      <MediaListCard
        id={item.id}
        image={item.picture?.url || placeholder}
        name={item.name}
        dificulty={level}
        duration={`${DateUtils.formatHoursToMinutes(item?.duration)}` || formatMessage('30 min')}
        onPress={onPress}
        handleNavigate={handleNavigateToSigularWorkout}
      />
    </View>
  );
};

const MediaList = (props: {
  data: MediaListProps[];
  testId?: string;
  onPress: () => void;
  placeholder: string;
  isLoadingMore?: boolean;
  onShowMore?: () => void;
}) => {
  const navigation = useNavigation();

  const handleNavigateToSingularWorkout = useCallback(
    (id) => {
      navigation.navigate(Routes.WorkoutSingular, { key: id });
    },
    [navigation]
  );

  return (
    <FlatList
      testID={props.testId}
      data={props.data}
      renderItem={(item) => {
        return renderCard(item, handleNavigateToSingularWorkout, props.onPress, props.placeholder);
      }}
      onEndReachedThreshold={1}
      keyExtractor={defaultKeyExtractor}
      onEndReached={props.onShowMore}
      ListFooterComponent={() => {
        if (props.isLoadingMore)
          return (
            <View style={styles.loaderContainer}>
              <BFLoader style={styles.loader} />
            </View>
          );

        return <></>;
      }}
    />
  );
};

export default MediaList;
