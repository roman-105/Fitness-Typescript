import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  RemoteMediaClient,
  useRemoteMediaClient,
  CastContext,
  Device
} from 'react-native-google-cast';
import formatMessage from 'format-message';
import { Routes } from '../../router/routes';
import BFAnalytics from '../../utils/tools/analytics';
import GoogleCast from 'react-native-google-cast';

const ANDROID_ERROR_WHEN_STOP = 'unknown status code: 2154';

export interface MediaType {
  contentUrl: string;
  streamDuration: number;
  metadata: {
    images: {
      url: string;
    }[];
    title: string;
  };
}

const useCastTool = ({ media }: { media: MediaType }) => {
  const client: RemoteMediaClient | null = useRemoteMediaClient();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const deviceRef = useRef<Device>();

  useEffect(() => {
    const sessionManager = GoogleCast.getSessionManager();

    const onSessionEndedListener = sessionManager.onSessionEnded((_, error) => {
      // Android is throwing a message when session ends correctly
      if (error && error !== ANDROID_ERROR_WHEN_STOP) {
        dispatch.modalModel.setInfo({
          visible: true,
          subtitle: formatMessage('Oops, your device got disconnected.')
        });

        BFAnalytics.logStreamingEvent('triggerError', {
          type: 'castingConnectionError'
        });

        return;
      }

      BFAnalytics.logStreamingEvent('disconnectCastingDevice', {
        targetType: deviceRef.current?.modelName ?? 'undefined'
      });
    });

    const onSessionStartFailed = sessionManager.onSessionStartFailed(() => {
      dispatch.modalModel.setInfo({
        visible: true,
        subtitle: formatMessage(
          'Oops, something went wrong. We were not able to connect. Please try again.'
        )
      });

      BFAnalytics.logStreamingEvent('triggerError', {
        type: 'castingConnectionError'
      });
    });

    return () => {
      onSessionEndedListener.remove();
      onSessionStartFailed.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    if (client) {
      const castMedia = async () => {
        const currentCastSession = await CastContext.getSessionManager().getCurrentCastSession();
        const device = await currentCastSession?.getCastDevice();
        deviceRef.current = device;

        BFAnalytics.logStreamingEvent('connectCastingDevice', {
          targetType: device?.modelName ?? 'undefined'
        });

        client.loadMedia({
          autoplay: true,
          mediaInfo: {
            ...media
          }
        });
        navigation.navigate(Routes.CastController, { client, media });
      };

      castMedia();
    }
  }, [client, navigation, media]);
};

export default useCastTool;
