import React, { ReactElement, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { HasKey } from '../../Carousels/FlatCarousel';
import styles from './FlatScroll-style';

export type FlatScrollItem = { item: ReactElement | null } & HasKey;

function renderItem({ item }: ListRenderItemInfo<FlatScrollItem>) {
  return item.item;
}

function keyExtractor(item: FlatScrollItem) {
  return item.key;
}

function addKey(item: ReactElement | null, index: number): FlatScrollItem {
  return { item, key: index.toString() };
}

export default function FlatScroll(props: {
  data: (ReactElement | null)[];
  contentContainerStyle?: any;
  horizontal?: boolean;
  style?: any;
  onScroll?: any;
}) {
  const items = useMemo(() => props.data.map(addKey), [props.data]);
  return (
    <FlatList
      style={props.style}
      keyExtractor={keyExtractor}
      contentContainerStyle={[
        !props.horizontal && styles.containerV,
        props.horizontal && styles.containerH,
        props.contentContainerStyle
      ]}
      horizontal={props.horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={items}
      renderItem={renderItem}
      onRefresh={() => {}}
      refreshing={false}
      onScroll={(e) => {
        if (props.onScroll) props.onScroll(e);
      }}
    />
  );
}
