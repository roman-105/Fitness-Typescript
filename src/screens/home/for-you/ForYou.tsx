import React, { useState, ReactElement } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import {
  MediaCardCarousel,
  MediaCardCarouselProps,
  ImageCarouselProps,
  ImageCarousel
} from '../../../components/Carousels';
import FlatScroll from '../../../components/Layout/FlatScroll/FlatScroll';
import { BFButton } from '../../../components/Button';
import { share } from '../../../utils/share';
import { PaginationButton } from '../../../components/PaginationButton';

export default function ForYouScreen() {
  const mediaItems: MediaCardCarouselProps[] = [
    { image: undefined, name: 'Hello there! #1', onPress: () => {}, key: '1' },
    { image: undefined, name: 'Hello there! #2', onPress: () => {}, key: '2' },
    { image: undefined, name: 'Hello there! #3', onPress: () => {}, key: '3' },
    { image: undefined, name: 'Hello there! #4', onPress: () => {}, key: '4' }
  ];

  const imageItems: ImageCarouselProps[] = [
    { key: '1', uri: undefined },
    { key: '2', uri: undefined },
    { key: '3', uri: undefined },
    { key: '4', uri: undefined },
    { key: '5', uri: undefined },
    { key: '6', uri: undefined }
  ];

  function refreshKeys(list: MediaCardCarouselProps[]): MediaCardCarouselProps[] {
    return list.map((item, index) => ({ ...item, key: index.toString() }));
  }

  const [infList, infListSet] = useState(mediaItems);

  const screenItems: (ReactElement | null)[] = [
    <View testID="for-you">
      <Text>Hello there</Text>
    </View>,
    <View style={{ padding: 16 }}>
      <BFButton title="Share here!" onPress={() => share('Workout', 'mock-link', undefined)} />
    </View>,
    <MediaCardCarousel
      testID="first-carousel"
      data={infList}
      onEndReached={() => {
        infListSet(refreshKeys(infList.concat(infList)));
      }}
    />,
    <MediaCardCarousel data={mediaItems} small />,
    <MediaCardCarousel data={mediaItems} />,
    <MediaCardCarousel data={mediaItems} small />,
    <ImageCarousel data={imageItems} />,
    <PaginationButton content="recipe" onPress={() => {}} hasMore={true} />
  ];

  return <FlatScroll data={screenItems} />;
}
