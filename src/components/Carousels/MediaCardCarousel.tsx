import React from 'react';
import FlatCarousel, { HasKey } from './FlatCarousel';
import MediaCard, { MediaCardProps } from '../Card/Media/MediaCard';
import { ListRenderItemInfo, View } from 'react-native';
import styles, { margin, smallWidth, normalWidth } from './media-card-carousel-style';
export type MediaCardCarouselProps = MediaCardProps & HasKey;

function renderCard({ item }: ListRenderItemInfo<MediaCardProps>, small: boolean) {
  return (
    <View style={small ? styles.small : styles.normal}>
      <MediaCard image={item.image} name={item.name} onPress={() => {}} />
    </View>
  );
}

export default function MediaCardCarousel(props: {
  data: MediaCardCarouselProps[];
  small?: boolean;
  testID?: string;
  onEndReached?: () => void;
}) {
  return (
    <FlatCarousel
      onEndReached={props.onEndReached}
      testID={props.testID}
      data={props.data}
      renderItem={(p) => renderCard(p, props.small ?? false)}
      itemWidth={(props.small ? smallWidth : normalWidth) + 2 * margin}
      snapAlignment="center"
    />
  );
}
