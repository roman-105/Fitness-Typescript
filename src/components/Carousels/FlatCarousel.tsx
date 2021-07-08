import React, { MutableRefObject } from 'react';

import { FlatList, ListRenderItem } from 'react-native';

export type HasKey = { key: string };

export interface FlatCarouselProps<T extends HasKey> {
  carouselRef?: MutableRefObject<FlatList<T> | undefined>;
  data: T[];
  renderItem: ListRenderItem<T>;
  onEndReached?: () => void;
  keyExtractor?: (item: T) => string;
  itemWidth: number;
  snapAlignment: 'start' | 'center' | 'end';
  testID?: string;
}

function defaultKeyExtractor(item: HasKey) {
  return item.key;
}

function defaultOnEndReached() {}

/**
 * FlatCarousel component based on FlatList.
 * This component has some defaults for easy of use and includes snap horizontal behaviour.
 * @param props FlatCarouselProps. Everything you would expect from a FlatList.
 */
export default function FlatCarousel<T extends HasKey>(props: FlatCarouselProps<T>) {
  const {
    data,
    renderItem,
    itemWidth,
    snapAlignment,
    keyExtractor = defaultKeyExtractor,
    onEndReached = defaultOnEndReached,
    testID
  } = props;

  return (
    <FlatList
      // @ts-ignore
      ref={props.carouselRef}
      testID={testID}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={5}
      windowSize={5}
      horizontal
      getItemLayout={(_, index: number) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index: index
      })}
      onEndReached={onEndReached}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // snapping
      snapToAlignment={snapAlignment}
      snapToInterval={itemWidth}
      decelerationRate={'fast'}
      pagingEnabled
    />
  );
}
