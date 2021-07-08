import React from 'react';
import VideoPlayer from 'react-native-video-player';
import styles from './bf-video-styles';
import { ViewStyle } from 'react-native';

interface BFVideoProps {
  video: string;
  style?: ViewStyle;
}

const BFVideo = ({ video, style = {} }: BFVideoProps) => {
  return (
    <VideoPlayer
      video={{
        uri: video
      }}
      style={[styles.video, style]}
    />
  );
};

export default BFVideo;
