import React, { useEffect } from 'react';
import FlatScroll from '../../../../components/Layout/FlatScroll/FlatScroll';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Center } from '../../../../components/Layout/Layout';
import Typography from '../../../../components/Typography';
import formatMessage from 'format-message';
import styles from './recommended-workouts-style';
import clubWorkoutImage from '../../../../assets/images/explore/club_workout_example.png';
import MediaList from '../../../../components/MediaList/MediaList';
import BFLoader from '../../../../components/Loader/BFLoader';

const RecommendedClubWorkouts = () => {
  const dispatch: Dispatch = useDispatch();
  const {
    workoutsModel: { recommendedWorkouts },
    loading: {
      effects: {
        workoutsModel: { getRecommendedWorkouts: isLoading }
      }
    }
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch.workoutsModel.getRecommendedWorkouts({ location: 'Club' });
  }, [dispatch]);

  if (isLoading || !recommendedWorkouts) {
    return (
      <Center>
        <BFLoader style={{ width: 10 }} />
      </Center>
    );
  }

  const onPress = () => {
    // Toggle favourite
  };

  const items = [
    <MediaList
      data={recommendedWorkouts}
      testId={'recommended-club-workouts'}
      onPress={onPress}
      placeholder={clubWorkoutImage}
    />
  ];

  return (
    <>
      <View style={styles.container}>
        <Typography fontFamily="trebleHeavy" fontSize={24} style={styles.title} uppercase>
          {formatMessage('Recommended club workouts')}
        </Typography>
        <Typography fontSize={12} lineHeight={14} style={styles.text} fontFamily="trebleRegular">
          {`${recommendedWorkouts.length} results`}
        </Typography>
      </View>
      <FlatScroll data={items} />
    </>
  );
};

export default RecommendedClubWorkouts;
