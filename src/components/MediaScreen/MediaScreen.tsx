import React from 'react';
import { View, Text } from 'react-native';
import { BFVideo } from '../Video';
import FastImage from 'react-native-fast-image';
import styles from './media-screen-styles';

interface Item {
  image: string;
  video: string;
}

export enum MediaType {
  'GIF',
  'VIDEO',
  'IMAGE'
}

interface MediaScreenProps {
  route: {
    params: {
      item: Item;
      type: MediaType;
    };
  };
}

const getPlayerByType = (type: MediaType, item: Item) => {
  switch (type) {
    case MediaType.GIF:
    case MediaType.IMAGE:
      return (
        <FastImage
          source={{
            uri: item.image
          }}
          style={styles[MediaType[type].toLowerCase()]}
        />
      );
    case MediaType.VIDEO:
      return <BFVideo video={item.video} />;
    default:
      return <Text>ERROR - Not Implemented</Text>;
  }
};

const MediaScreen = ({ route }: MediaScreenProps) => {
  const { item, type } = route.params;
  return <View style={styles.container}>{getPlayerByType(type, item)}</View>;
};

export default MediaScreen;
