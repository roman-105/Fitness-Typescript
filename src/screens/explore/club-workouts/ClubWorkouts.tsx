import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Routes } from '../../../router/routes';
import Typography from '../../../components/Typography';
import formatMessage from 'format-message';
import styles from './club-workouts-styles';
import BFLoader from '../../../components/Loader/BFLoader';
import { Center } from '../../../components/Layout/Layout';
import MediaWithInfoCardCarousel from '../../../components/Carousels/MediaWithInfoCardCarousel/MediaWithInfoCardCarousel';
import FlatScroll from '../../../components/Layout/FlatScroll/FlatScroll';
import clubWorkoutImage from '../../../assets/images/explore/club_workout_example.png';
import ImageMediaCarousel from '../../../components/Carousels/ImageMediaCarousel/ImageMediaCarousel';
import BFLightButton from '../../../components/Button/BFLightButton';
import theme from '../../../theme';
import useScrollHeaderShadow from '../../../utils/hooks/useScrollHeaderShadow';

const Workouts = () => {
  const navigation = useNavigation();
  const dispatch: Dispatch = useDispatch();
  const {
    workoutsModel: {
      latestWorkouts,
      recommendedWorkouts,
      onDemandWorkouts,
      allWorkouts: {
        pagination: { totalItems }
      }
    },
    loading: {
      effects: {
        workoutsModel: {
          getRecommendedWorkouts: isLoadingRecommended,
          getAllWorkouts: isLoadingAll
        }
      }
    }
  } = useSelector((state) => state);
  const { scroll } = useScrollHeaderShadow({ navigation: navigation });

  useEffect(() => {
    dispatch.workoutsModel.getLatestWorkouts({ location: 'Club' });
    dispatch.workoutsModel.getRecommendedWorkouts({ location: 'Club' });
    dispatch.workoutsModel.getOnDemandWorkouts({ location: 'Club' });
    dispatch.workoutsModel.getAllWorkouts({ location: 'Club', filters: undefined, page: 0 });
  }, [dispatch]);

  if (
    isLoadingAll ||
    isLoadingRecommended ||
    !recommendedWorkouts ||
    !onDemandWorkouts ||
    !latestWorkouts
  ) {
    return (
      <Center>
        <BFLoader />
      </Center>
    );
  }

  const onPress = () => {
    // TO DO => Handle toogle Favourite
  };

  const items = [
    <View style={styles.container}>
      <Typography fontFamily="trebleHeavy" fontSize={24} style={styles.title} uppercase>
        {formatMessage('Club Workouts')}
      </Typography>
      <LinearGradient
        colors={theme.colors.refreshColors.brightOrangeGradient}
        style={styles.orangeCarousel}
      >
        <Typography
          fontFamily="trebleHeavy"
          fontSize={14}
          lineHeight={20}
          light
          style={styles.newLabel}
        >
          {formatMessage('NEW')}
        </Typography>
        <ImageMediaCarousel
          testID={'new-workouts'}
          data={latestWorkouts}
          onPress={onPress}
          placeholder={clubWorkoutImage}
        />
      </LinearGradient>
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Typography fontFamily="trebleHeavy" fontSize={14} lineHeight={20} uppercase={true}>
            {formatMessage('Recommended')}
          </Typography>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.RecommendedClubWorkouts)}>
              <Typography
                fontSize={12}
                lineHeight={14}
                style={styles.text}
                fontFamily="trebleRegular"
              >
                {recommendedWorkouts.length > 99
                  ? formatMessage('See all (99+)')
                  : formatMessage('See all ({recommendedWorkouts.length})', {
                      recommendedWorkouts
                    })}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        <MediaWithInfoCardCarousel
          testID={'club-workouts'}
          data={recommendedWorkouts}
          onPress={onPress}
          placeholder={clubWorkoutImage}
        />
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Typography fontFamily="trebleHeavy" fontSize={14} lineHeight={20} uppercase={true}>
            {formatMessage('On demand')}
          </Typography>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.OnDemandClubWorkouts)}>
              <Typography
                fontSize={12}
                lineHeight={14}
                style={styles.text}
                fontFamily="trebleRegular"
              >
                {onDemandWorkouts.length > 99
                  ? formatMessage('See all (99+)')
                  : formatMessage('See all ({onDemandWorkouts.length})', {
                      onDemandWorkouts
                    })}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        <MediaWithInfoCardCarousel
          testID={'home-workouts'}
          data={onDemandWorkouts}
          onPress={onPress}
          placeholder={clubWorkoutImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BFLightButton
          style={styles.button}
          title={formatMessage('All club workouts')}
          icon="arrowRight"
          onPress={() => navigation.navigate(Routes.AllClubWorkouts)}
          aditionalInfo={
            totalItems !== undefined
              ? totalItems > 99
                ? `${formatMessage('99+')}`
                : `${totalItems}`
              : ''
          }
        />
      </View>
    </View>
  ];

  return <FlatScroll style={styles.container} data={items} onScroll={scroll} />;
};

export default Workouts;
