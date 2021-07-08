import React, { useCallback, useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import styles from './bf-walkthrough-modal-styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../Typography';
import formatMessage from 'format-message';
import {
  ProfileWalkthroughIcon,
  HomeWalkthroughIcon,
  ProgressWalkthroughIcon,
  ExploreWalkthroughIcon,
  CoachWalkthroughIcon,
  ClubsWalkthroughIcon
} from '../../../components/Icon';

const data = [
  {
    title: 'Profile',
    text:
      'Manage everything regarding your membership, get support, make a gym reservation, invite your friends, and adjust your information to get the best experience.'
  },
  {
    title: 'Home',
    text:
      'Here is where it all starts. Find recommend programs and workouts or continue the ones you already started.'
  },
  {
    title: 'Explore ',
    text:
      'Find the newest workouts for in the club or at home and get inspired by delicious recipes and blogs from nutrition experts.'
  },
  {
    title: 'Progress',
    text:
      'See how you’re progressing over the weeks. Track your calories burned, workouts, and body composition and connect your health apps.'
  },
  {
    title: 'Coach',
    text:
      'Get tips and tricks from experts and find a personal trainer or physiotherapist. If you purchased the ‘Personal Online Coach’, you can find your plan here!'
  },
  {
    title: 'Clubs',
    text:
      'Find clubs, add them to your favorites, make a reservation, and check out the group classes schedule.'
  }
];

const BFWalkthroughModal = () => {
  const {
    walkThrough: { index, visible }
  } = useSelector((state) => state.appModel);
  const dispatch: Dispatch = useDispatch();

  const introSliderRef = useRef<AppIntroSlider<{ title: string; text: string }>>();

  useEffect(() => {
    if (visible && introSliderRef.current) introSliderRef.current.goToSlide(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <Typography fontFamily={'trebleHeavy'} fontSize={14} style={styles.title} uppercase>
          {item.title}
        </Typography>
        <Typography fontFamily={'trebleRegular'} fontSize={13} lineHeight={22}>
          {item.text}
        </Typography>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.actions}>
        <Typography fontFamily={'trebleRegular'} fontSize={14} light uppercase>
          {formatMessage('Go For It!')}
        </Typography>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.actions}>
        <Typography fontFamily={'trebleRegular'} fontSize={14} light uppercase>
          {formatMessage('Next')}
        </Typography>
      </View>
    );
  };

  const onSlideChange = (indexParam: number) => {
    dispatch.appModel.setWalkThrough({ index: indexParam });
  };

  const handleClose = useCallback(() => {
    dispatch.appModel.setWalkThrough({ visible: false });
    dispatch.modalModel.setInfo({
      visible: true,
      title: formatMessage('Are you sure?'),
      subtitle: formatMessage(
        'You can always do the app tour at a later time. Go to your Profile, click on the Settings icon on the right top and enjoy the ‘app tour’.'
      ),
      acceptText: formatMessage('Okay'),
      onAccept: () => {
        dispatch.appModel.finishWalkThrough();
        dispatch.modalModel.setInfo({ visible: false });
      },
      closeText: formatMessage('Stay'),
      onClose: () => {
        dispatch.modalModel.setInfo({ visible: false });
        dispatch.appModel.setWalkThrough({ visible: true });
      }
    });
  }, [dispatch]);

  return (
    <Modal transparent visible={visible} animationType="fade" hardwareAccelerated>
      <TouchableOpacity style={styles.touchable} onPress={() => handleClose()} />
      <View style={styles.modalContainer}>
        <AppIntroSlider
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          data={data}
          onSlideChange={onSlideChange}
          activeDotStyle={styles.dotActive}
          dotStyle={styles.dot}
          onDone={dispatch.appModel.finishWalkThrough}
          dotClickEnabled={true}
          ref={introSliderRef as any}
        />
      </View>
      <ProfileWalkthroughIcon style={styles.profileIcon} opacity={index === 0 ? 1 : 0} />
      <View style={styles.iconsContainer}>
        <HomeWalkthroughIcon opacity={index === 1 ? 1 : 0} />
        <ProgressWalkthroughIcon opacity={index === 2 ? 1 : 0} />
        <ExploreWalkthroughIcon opacity={index === 3 ? 1 : 0} />
        <CoachWalkthroughIcon opacity={index === 4 ? 1 : 0} />
        <ClubsWalkthroughIcon opacity={index === 5 ? 1 : 0} />
      </View>
    </Modal>
  );
};

export default BFWalkthroughModal;
