import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';
import clubPlaceholder from '../../../assets/images/club/club_placeholder.jpg';
import BFHeaderImageScrollView from '../../../components/HeaderImageScrollView/BFHeaderImageScrollView';
import Typography from '../../../components/Typography/Typography';
import { IClub } from '../../../store/models/club/clubModelAdapter';
import { Container, LineSpacer, Spacer } from '../../../components/Layout/Layout';
import ClubSingularActionBar from './action-bar/ClubSingularActionBar';
import ClubSingularBasicInfo from './basic-info/ClubSingularBasicInfo';
import styles from './club-singular-styles';
import ClubSingularServices from './services/ClubSingularServices';
import ClubSingularOpeningHours from './opening-hours/ClubSingularOpeningHours';
import ClubSingularLocalisation from './localisation/ClubSingularLocalisation';
import { BFButton } from '../../../components/Button';
import formatMessage from 'format-message';
import { View } from 'react-native';
import ClubSingularSpecialNote from './special-note/ClubSingularSpecialNote';
import { useSelector, useDispatch } from 'react-redux';
import BFLoader from '../../../components/Loader/BFLoader';

interface ClubSingularProps {
  route?: {
    params?: {
      // ClubID is used when opening a shared link
      clubId?: IClub['clubId'];
    };
  };
}

const ClubSingular = ({ route }: ClubSingularProps) => {
  const clubId = route?.params?.clubId;
  const {
    clubModel: { singularClub },
    loading: {
      effects: {
        clubModel: { getSingularClubInfo: isLoading }
      }
    }
  } = useSelector((state) => state);
  const dispatch: Dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNavigateToLesson = useCallback(() => {
    navigation.navigate(Routes.LessonSchedule);
  }, [navigation]);

  useEffect(() => {
    if (clubId) {
      dispatch.clubModel.getSingularClubInfo({ clubId: clubId });
    }
  }, [clubId, dispatch]);

  if (isLoading || !singularClub) {
    return <BFLoader />;
  }

  return (
    <>
      <BFHeaderImageScrollView
        minHeight={64}
        maxHeight={200}
        imageSource={
          singularClub.clubImage?.url ? { uri: singularClub.clubImage.url } : clubPlaceholder
        }
        fixedTitle={singularClub.name}
        TagComponent={
          singularClub.isHomeClub && (
            <View style={styles.homeClubTag}>
              <Typography type="regularbfa" light fontSize={12} lineHeight={20}>
                {formatMessage('Home club')}
              </Typography>
            </View>
          )
        }
        TitleComponent={
          <Container marginVertical={20}>
            {singularClub.specialOccasion && (
              <>
                <ClubSingularSpecialNote
                  title={singularClub.specialOccasionTitle ?? ''}
                  description={singularClub.specialOccasionDescription ?? ''}
                />
                <Spacer height={16} />
              </>
            )}
            <Typography type="h2">{singularClub.name}</Typography>
          </Container>
        }
      >
        {/* Favorites and share actions */}
        <ClubSingularActionBar club={singularClub} />

        {/* Club basic info */}
        <ClubSingularBasicInfo style={styles.basicInfoContainer} club={singularClub} />
        <Container marginVertical={8}>
          <LineSpacer dark />
        </Container>

        {/* Club services */}
        <ClubSingularServices services={singularClub.services} />
        <Container marginVertical={8}>
          <LineSpacer dark />
        </Container>

        {/* Club opening hours */}
        <ClubSingularOpeningHours
          hours={singularClub.hours}
          holidayHours={singularClub.holidayHours}
        />
        <Container marginVertical={8}>
          <LineSpacer dark />
        </Container>
        <Spacer height={8} />

        {/* Club map view */}
        <ClubSingularLocalisation club={singularClub} />

        {/* Extra bottom space */}
        <Spacer height={80} />
      </BFHeaderImageScrollView>
      <Container style={styles.floatingButton} marginVertical={16}>
        <BFButton
          title={formatMessage('View group class schedule')}
          onPress={handleNavigateToLesson}
        />
      </Container>
    </>
  );
};

export default ClubSingular;
