import React from 'react';
import { View } from 'react-native';
import { Center } from '../../../../../components/Layout/Layout';
import Typography from '../../../../../components/Typography';
import formatMessage from 'format-message';
import styles from '../all-club-workouts-style';
import clubWorkoutImage from '../../../../../assets/images/explore/club_workout_example.png';
import MediaList from '../../../../../components/MediaList/MediaList';
import BFLoader from '../../../../../components/Loader/BFLoader';
import { IWorkoutsData } from '../../../../../store/models/explore/workoutsModelAdapter';
import BFFilterButton from '../../../../../components/Button/filter/BFFilterButton';
import { FilterColouredIcon } from '../../../../../components/Icon';

interface AllClubWorkoutsListProps {
  data?: IWorkoutsData[];
  page: number;
  isLoading: boolean;
  totalItems: number;
  toggleFavourite: () => void;
  selectedFilters: any[];
  onPressFilterButton: () => void;
  areFiltersApplied?: boolean;
  onShowMore?: () => void;
}

const EmptyContent = ({ areFiltersApplied }: { areFiltersApplied?: boolean }) => {
  if (areFiltersApplied) {
    return (
      <View style={styles.emptyContent}>
        <FilterColouredIcon width={50} height={50} />
        <Typography
          align="center"
          fontFamily="trebleRegular"
          fontSize={12}
          lineHeight={16}
          style={styles.emptyText}
        >
          {formatMessage('No results based on your selected filters')}
        </Typography>
      </View>
    );
  }

  return (
    <View>
      <Typography align="center" fontFamily="trebleRegular" fontSize={12}>
        {formatMessage('No workouts available')}
      </Typography>
    </View>
  );
};

const AllClubWorkoutsList = ({
  data,
  page,
  toggleFavourite,
  totalItems,
  isLoading,
  selectedFilters,
  onPressFilterButton,
  areFiltersApplied,
  onShowMore
}: AllClubWorkoutsListProps) => {
  if (!data || (page === 0 && isLoading)) {
    return (
      <Center>
        <BFLoader />
      </Center>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Typography fontFamily="trebleHeavy" fontSize={24} style={styles.title} uppercase>
            {formatMessage('club workouts')}
          </Typography>
          <BFFilterButton numFilters={selectedFilters.length} onPress={onPressFilterButton} />
        </View>
        <Typography fontSize={12} lineHeight={14} style={styles.text} fontFamily="trebleRegular">
          {totalItems > 99 ? formatMessage('99+') : `${totalItems}`} {formatMessage('Results')}
        </Typography>
      </View>
      {data?.length === 0 ? (
        <EmptyContent areFiltersApplied={areFiltersApplied} />
      ) : (
        <MediaList
          data={data}
          testId={'favourite-club-workouts'}
          onPress={toggleFavourite}
          placeholder={clubWorkoutImage}
          onShowMore={!isLoading ? onShowMore : undefined}
          isLoadingMore={isLoading}
        />
      )}
    </>
  );
};

export default AllClubWorkoutsList;
