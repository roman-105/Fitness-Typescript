import React, { ReactElement, useState } from 'react';
import { Text, View } from 'react-native';
import { MediaCard } from '../../../components/Card';
import { MediaCardCarouselProps } from '../../../components/Carousels/MediaCardCarousel';
import FlatScroll from '../../../components/Layout/FlatScroll/FlatScroll';
import styles from './feed-styles';
import { PaginationButton } from '../../../components/PaginationButton';

export default function FeedScreen() {
  const mediaItems: MediaCardCarouselProps[] = [
    { image: undefined, name: 'Hello there! #1', onPress: () => {}, key: '1' },
    { image: undefined, name: 'Hello there! #2', onPress: () => {}, key: '2' }
  ];

  function refreshKeys(list: MediaCardCarouselProps[]): MediaCardCarouselProps[] {
    return list.map((item, index) => ({ ...item, key: index.toString() }));
  }

  const [infList, infListSet] = useState<MediaCardCarouselProps[]>(mediaItems);

  const screenItems: ReactElement[] = [
    <View testID="feed">
      <Text>Example pagination button</Text>
    </View>,
    <View>
      {infList.map((item: MediaCardCarouselProps) => (
        <MediaCard
          style={styles.mediaCardItem}
          key={item.key}
          name={item.name}
          onPress={item.onPress}
        />
      ))}
      <PaginationButton
        content="recipe"
        onPress={() => infListSet(refreshKeys(infList.concat(mediaItems)))}
        hasMore={infList.length < 5}
      />
    </View>
  ];

  return <FlatScroll data={screenItems} />;
}
