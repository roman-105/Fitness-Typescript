import React, { useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import {
  Device,
  RemoteMediaClient,
  useCastSession,
  CastContext,
  CastState
} from 'react-native-google-cast';
import LinearGradient from 'react-native-linear-gradient';
import styles from './cast-controller-styles';
import theme from '../../theme';
import Typography from '../Typography';
import FastImage from 'react-native-fast-image';
import {
  Backward15Icon,
  CastIcon,
  CloseIcon,
  FastForward15Icon,
  PauseIcon,
  PlayIcon
} from '../Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { secondsToMinutesString } from '../../utils/utils';
import useDarkBackground from '../../utils/hooks/useDarkBackground';
import GoogleCast from 'react-native-google-cast';
import { MediaType } from '../CastButton/useCastTool';
import BFAnalytics from '../../utils/tools/analytics';

interface CastControllerProps {
  route: {
    params: {
      client: RemoteMediaClient;
      media: MediaType;
    };
  };
}

const CastController = ({
  route: {
    params: { client, media }
  }
}: CastControllerProps) => {
  useDarkBackground();
  const castSession = useCastSession();

  const navigation = useNavigation();
  const [mediaProgress, setMediaProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [castDevice, setCastDevice] = useState<Device>();

  useEffect(() => {
    const getCastDevice = async () => {
      const castDeviceInstance = await castSession?.getCastDevice();
      setCastDevice(castDeviceInstance);
    };

    getCastDevice();
  }, [castSession]);

  useEffect(() => {
    const mediaStatusListener = client.onMediaStatusUpdated((mediaStatus) => {
      setIsPlaying(mediaStatus?.playerState === 'playing');
    });
    const mediaProgressListener = client.onMediaProgressUpdated((progress) => {
      setMediaProgress(progress);
    });
    const mediaPlaybackEndedListener = client.onMediaPlaybackEnded(() => {
      BFAnalytics.logStreamingEvent('stopWorkout', {});
      navigation.goBack();
    });

    const subscription = GoogleCast.onCastStateChanged((castState: CastState) => {
      if (castState === CastState.NOT_CONNECTED) {
        navigation.goBack();
      }
    });

    return () => {
      mediaStatusListener.remove();
      mediaProgressListener.remove();
      mediaPlaybackEndedListener.remove();
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const handleOnClose = useCallback(() => {
    BFAnalytics.logStreamingEvent('stopWorkout', {});
    client.stop();
    navigation.goBack();
  }, [client, navigation]);

  const handleOnPlay = useCallback(
    (isPlayingProp: boolean) => {
      BFAnalytics.logStreamingEvent('togglePlay', {
        mode: isPlayingProp ? 'pause' : 'play'
      });
      if (isPlayingProp) {
        return client.pause();
      }
      client.play();
    },
    [client]
  );

  const handleSeek = useCallback(
    (newPosition: number, target: 'forwardButton' | 'backwardsButton' | 'timeline') => {
      BFAnalytics.logStreamingEvent('adaptTime', {
        target: target,
        direction: mediaProgress > newPosition ? 'backwards' : 'forward'
      });
      client.seek({ position: newPosition });
    },
    [client, mediaProgress]
  );

  const handleOnShowCastDialog = useCallback(() => {
    CastContext.showCastDialog();
  }, []);

  return (
    <LinearGradient
      colors={theme.colors.refreshColors.asphaltGreyGradient}
      style={styles.backgroundContainer}
    >
      <View style={styles.topLine} />
      <View style={styles.bottomLine} />
      <View style={styles.container}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.closeButton} onPress={handleOnClose}>
            <CloseIcon fill={theme.colors.primary.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainers}>
          <View style={styles.innerTopContainer}>
            <Typography
              style={styles.mediaTitle}
              fontFamily="impact"
              fontSize={32}
              lineHeight={36}
              uppercase
            >
              {media.metadata.title}
            </Typography>
            {media.metadata.images.length !== 0 && (
              <FastImage
                style={styles.image}
                source={{ uri: media.metadata.images[0].url }}
                resizeMode="cover"
              />
            )}
          </View>
          <View style={styles.innerBottomContainer}>
            <View style={styles.bottomControls}>
              <View style={styles.progressBarContainer}>
                <Typography
                  style={styles.durationText}
                  fontFamily="regular"
                  fontSize={12}
                  lineHeight={12}
                >
                  {secondsToMinutesString(mediaProgress)}
                </Typography>
                <Typography
                  style={styles.durationText}
                  fontFamily="regular"
                  fontSize={12}
                  lineHeight={12}
                >
                  {secondsToMinutesString(media.streamDuration)}
                </Typography>
              </View>
              <Slider
                value={mediaProgress}
                minimumValue={0}
                maximumValue={media.streamDuration}
                thumbTintColor={theme.colors.primary.orange}
                minimumTrackTintColor={theme.colors.primary.orange}
                maximumTrackTintColor={theme.colors.primary.white}
                onSlidingComplete={(newPosition) => handleSeek(newPosition, 'timeline')}
              />
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleSeek(mediaProgress - 15, 'backwardsButton')}>
                  <Backward15Icon fill={theme.colors.primary.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOnPlay(isPlaying)}>
                  {isPlaying ? (
                    <PauseIcon fill={theme.colors.primary.white} />
                  ) : (
                    <PlayIcon fill={theme.colors.primary.white} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSeek(mediaProgress + 15, 'forwardButton')}>
                  <FastForward15Icon fill={theme.colors.primary.white} />
                </TouchableOpacity>
              </View>
            </View>
            {castDevice && (
              <TouchableOpacity
                style={styles.castConnectionBottomButton}
                onPress={handleOnShowCastDialog}
              >
                <CastIcon fill={theme.colors.primary.white} />
                <Typography
                  style={styles.castConnectionBottomButtonText}
                  fontFamily="regular"
                  fontSize={14}
                  lineHeight={14}
                >
                  {castDevice.friendlyName}
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CastController;
