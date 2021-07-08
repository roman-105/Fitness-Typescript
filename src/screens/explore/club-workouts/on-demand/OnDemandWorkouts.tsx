import React, { useEffect } from 'react';
import FlatScroll from '../../../../components/Layout/FlatScroll/FlatScroll';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Center } from '../../../../components/Layout/Layout';
import Typography from '../../../../components/Typography';
import formatMessage from 'format-message';
import styles from './on-demand-workouts-style';
import clubWorkoutImage from '../../../../assets/images/explore/club_workout_example.png';
import MediaList from '../../../../components/MediaList/MediaList';
import BFLoader from '../../../../components/Loader/BFLoader';

const OnDemandClubWorkouts = () => {
  const dispatch: Dispatch = useDispatch();
  const {
    workoutsModel: { onDemandWorkouts },
    loading: {
      effects: {
        workoutsModel: { getOnDemandWorkouts: isLoading }
      }
    }
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch.workoutsModel.getOnDemandWorkouts({ location: 'Club' });
  }, [dispatch]);

  if (isLoading || !onDemandWorkouts) {
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
      data={onDemandWorkouts}
      testId={'on-demand-club-workouts'}
      onPress={onPress}
      placeholder={clubWorkoutImage}
    />
  ];

  return (
    <>
      <View style={styles.container}>
        <Typography fontFamily="trebleHeavy" fontSize={24} style={styles.title} uppercase>
          {formatMessage('On demand club workouts')}
        </Typography>
        <Typography fontSize={12} lineHeight={14} style={styles.text} fontFamily="trebleRegular">
          {`${onDemandWorkouts.length} results`}
        </Typography>
      </View>
      <FlatScroll data={items} />
    </>
  );
};

export default OnDemandClubWorkouts;
