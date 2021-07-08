import React, { useCallback, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { BFButton, BFSecondaryButton } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../router/routes';
import mapBackgroundImage from '../../assets/images/club/map_background.png';
import formatMessage from 'format-message';
import { getGymTimeReservationUrl } from '../../utils/sso/SSOUtils';
import Typography from '../../components/Typography/Typography';
import styles from './club-styles';
import FavoriteClubSection from './favorite-clubs/FavoriteClubsSection';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { LineSpacer } from '../../components/Layout/Layout';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const ClubScreen = () => {
  const navigation = useNavigation();
  const dispatch: Dispatch = useDispatch();
  const memberInfo = useSelector((state) => state.memberModel.member);
  const { scroll } = useScrollHeaderShadow({ navigation: navigation.dangerouslyGetParent() });

  const handleOpenGymTimeReservation = useCallback(() => {
    if (memberInfo)
      navigation.navigate(Routes.Webview, {
        uri: getGymTimeReservationUrl(memberInfo.id)
      });
  }, [navigation, memberInfo]);

  const handleNavigateToClubFinder = useCallback(() => {
    navigation.navigate(Routes.ClubFinder);
  }, [navigation]);

  const handleNavigateToLesson = useCallback(() => {
    navigation.navigate(Routes.LessonSchedule);
  }, [navigation]);

  useEffect(() => {
    if (memberInfo) dispatch.clubModel.getFavoriteClubs();
  }, [dispatch, memberInfo]);

  return (
    <ScrollView onScroll={(e) => scroll(e)} scrollEventThrottle={16}>
      <View testID="club" style={styles.clubContainer}>
        <View style={styles.headerContainer}>
          <Typography type="h1" uppercase>
            {formatMessage('Clubs')}
          </Typography>
        </View>

        <View style={styles.favoriteClubsContainer}>
          <FavoriteClubSection />
        </View>

        <View style={styles.actionsContainer}>
          <LineSpacer />
          <BFSecondaryButton
            title={formatMessage('Gymtime Reservation')}
            onPress={handleOpenGymTimeReservation}
            icon="external"
            secondIcon="clock"
          />
          <LineSpacer />
          <BFSecondaryButton
            title={formatMessage('Group Classes Schedule')}
            onPress={handleNavigateToLesson}
            icon="arrowRight"
            secondIcon="calendar"
          />
          <LineSpacer />
        </View>

        <View style={styles.clubFinderContainer}>
          <FastImage style={styles.clubFinderImage} source={mapBackgroundImage} />
          <View style={styles.clubFinderButtonContainer}>
            <BFButton
              style={styles.clubFinderButton}
              title={formatMessage('Club Finder')}
              icon="arrowRight"
              onPress={handleNavigateToClubFinder}
              wider
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ClubScreen;
