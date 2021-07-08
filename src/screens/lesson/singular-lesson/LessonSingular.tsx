import React, { useCallback, useEffect } from 'react';
import { BFHeaderImageScrollView } from '../../../components/HeaderImageScrollView';
import placeHolderImage from '../../../assets/images/placeholder/class_image_placeholder.jpg';
import { View, Linking } from 'react-native';
import formatMessage from 'format-message';
import Typography from '../../../components/Typography';
import styles from './lesson-singular-styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightIcon } from '../../../components/Icon';
import LessonSingularActionBar from './action-bar/LessonSingularActionBar';
import LessonSingularAbout from './about/LessonSingularAbout';
import { useSelector, useDispatch } from 'react-redux';
import BFLoader from '../../../components/Loader/BFLoader';
import { IClubLessonSingular, IClubSingular } from '../../../store/models/club/clubModelAdapter';
import { Container, Spacer } from '../../../components/Layout/Layout';
import theme from '../../../theme';
import BFButton from '../../../components/Button/BFButton';
import { useNavigation } from '@react-navigation/native';
import { getGymTimeReservationUrl } from '../../../utils/sso/SSOUtils';
import { Routes } from '../../../router/routes';
import LessonSingularLocation from './location/LessonSingularLocation';
import DateUtils from '../../../utils/dateUtils';
import { BF_ADDON_LIVE_CLASSES, BF_MEMBERSHIP_URL } from '../../../utils/constants';
import { BFLightButton } from '../../../components/Button';

const TagComponent = ({ singularLesson }: { singularLesson: IClubLessonSingular }) => {
  const isLive = singularLesson.kind === 'LGX';

  return (
    <View style={[styles.defaultTag, isLive && styles.liveTag]}>
      {isLive ? (
        <Typography type="regularbfa" capitalize fontSize={12} lineHeight={20}>
          {formatMessage('Live')}
        </Typography>
      ) : (
        <Typography type="regularbfa" light uppercase={!isLive} fontSize={12} lineHeight={20}>
          {formatMessage('GXR')}
        </Typography>
      )}
    </View>
  );
};

const TitleComponent = ({
  singularLesson,
  singularClub,
  canDoLiveClasses
}: {
  singularLesson: IClubLessonSingular;
  singularClub: IClubSingular;
  canDoLiveClasses: boolean;
}) => {
  const handlePressMembershipUpgrade = () => {
    Linking.openURL(BF_MEMBERSHIP_URL);
  };

  return (
    <Container marginVertical={16}>
      {!canDoLiveClasses && singularLesson.kind === 'LGX' && (
        <TouchableOpacity style={styles.membershipWrapper} onPress={handlePressMembershipUpgrade}>
          <Typography type="regularbfa" style={styles.membershipText}>
            {formatMessage('Please upgrade your membership to participate')}
          </Typography>
          <ArrowRightIcon style={styles.membershipIcon} fill={theme.colors.primary.asphaltGrey} />
        </TouchableOpacity>
      )}
      <View style={styles.mainDataComponentRow}>
        <Typography type="regularbfa">
          {`${DateUtils.formatSingularLessonDateTitle(singularLesson.startDate)} · ${
            singularLesson.formattedTime ?? ''
          }`}
        </Typography>
      </View>
      <Typography type="h2" style={styles.titleComponent}>
        {singularLesson.title}
      </Typography>
      <Typography type="regularbfa" uppercase>
        {singularClub.name}
      </Typography>
    </Container>
  );
};

interface LessonSingularProps {
  route?: {
    params?: {
      // clubID is used when opening a shared link
      clubId?: IClubSingular['clubId'];
      // lessonId is used when opening a shared link
      lessonId?: IClubLessonSingular['id'];
    };
  };
}

const LessonsSingular = ({ route }: LessonSingularProps) => {
  const clubId = route?.params?.clubId;
  const lessonId = route?.params?.lessonId;
  const dispatch: Dispatch = useDispatch();

  const addons = useSelector((state) => state.memberModel.member?.addOns);

  const canDoLiveClasses = addons?.includes(BF_ADDON_LIVE_CLASSES) ?? false;

  useEffect(() => {
    if (clubId && lessonId) {
      dispatch.clubModel.getSingularClubInfo({ clubId });
      dispatch.clubModel.getSingularClubLesson({ clubId, lessonId });
    }
  }, [clubId, lessonId, dispatch]);

  const {
    clubModel: { singularLesson, singularClub }
  } = useSelector((state) => state);

  const memberInfo = useSelector((state) => state.memberModel.member);
  const navigation = useNavigation();

  const handleOpenGymTimeReservation = useCallback(() => {
    if (memberInfo)
      navigation.navigate(Routes.Webview, {
        uri: getGymTimeReservationUrl(
          memberInfo.id,
          singularClub?.clubId,
          singularLesson?.startDate.valueOf()
        )
      });
  }, [navigation, memberInfo, singularClub, singularLesson]);

  if (!singularLesson || !singularClub) return <BFLoader />;

  return (
    <>
      <BFHeaderImageScrollView
        minHeight={64}
        maxHeight={200}
        imageSource={singularLesson.image ? { uri: singularLesson.image } : placeHolderImage}
        fixedTitle={singularLesson.title}
        TagComponent={<TagComponent singularLesson={singularLesson} />}
        TitleComponent={
          <TitleComponent
            singularLesson={singularLesson}
            singularClub={singularClub}
            canDoLiveClasses={canDoLiveClasses}
          />
        }
      >
        <Container marginVertical={8}>
          <LessonSingularActionBar lesson={singularLesson} club={singularClub} />
        </Container>

        {singularLesson.kind !== 'LGX' && (
          <Container marginVertical={8}>
            <BFLightButton
              title={formatMessage('Do this workout at home')}
              icon="arrowRight"
              uppercase={false}
            />
          </Container>
        )}

        {singularLesson.description ? (
          <Container marginVertical={16}>
            <LessonSingularAbout description={singularLesson.description} />
          </Container>
        ) : null}

        <Container marginVertical={8}>
          <LessonSingularLocation club={singularClub} />
        </Container>

        {/* Extra bottom space */}
        {canDoLiveClasses && <Spacer height={80} />}
      </BFHeaderImageScrollView>

      {canDoLiveClasses && (
        <Container marginVertical={8}>
          <BFButton
            style={styles.floatingButton}
            title={formatMessage('Reserve gymtime')}
            onPress={handleOpenGymTimeReservation}
          />
        </Container>
      )}
    </>
  );
};

export default LessonsSingular;
