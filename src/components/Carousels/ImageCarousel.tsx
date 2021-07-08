import React from 'react';
import FlatCarousel, { HasKey } from './FlatCarousel';
import FastImage, { Source } from 'react-native-fast-image';
import { ListRenderItemInfo, View } from 'react-native';
import placeholderImage from '../../assets/images/placeholder/img_placeholder-square.png';
import styles from './image-carousel-style';

export type ImageCarouselProps = Source & HasKey;
const size = (300 - 2 * 8) / 2;

function render({ item }: ListRenderItemInfo<ImageCarouselProps>) {
  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: size, height: size }}
        source={item.uri ? item : placeholderImage}
      />
    </View>
  );
}

export default function ImageCarousel(props: { data: ImageCarouselProps[] }) {
  return (
    <FlatCarousel
      data={props.data}
      renderItem={render}
      itemWidth={size + 8 * 2}
      snapAlignment="center"
    />
  );
}
