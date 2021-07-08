import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

interface SubItemProps {
  item: string | number;
  index: number;
  height: number;
  render: Function;
  onPress: Function;
}

function SubItem({ item, index, height, render, onPress }: SubItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.center, { height }]}
      onPress={() => onPress(index)}
    >
      {render({ item, index })}
    </TouchableOpacity>
  );
}

interface ScrollPickerItemProps {
  id: string | number;
  data: any[];
  flex?: number;
  onValueChange?: (data: any) => void;
  itemHeight: number;
  renderItem: Function;
  defaultValue: string | number;
}

function ScrollPickerItem({
  id,
  onValueChange,
  flex,
  itemHeight,
  data,
  renderItem,
  defaultValue
}: ScrollPickerItemProps) {
  const svRef = useRef();
  const [adjustingScroll, setAdjustingScroll] = useState(false);

  const scrollToIndex = (index: number, animated = true) => {
    if (svRef && svRef.current) {
      // @ts-ignore
      svRef.current.scrollToIndex({ index, animated });
    }
  };

  const calcIndex = (y: any) => {
    const index = Math.round(y / itemHeight);
    // Return the number between min (0) and max (data.length - 1)
    return Math.min(Math.max(index, 0), data.length - 1);
  };

  const onScroll = (evt: any) => {
    const curY = evt.nativeEvent.contentOffset.y;
    if (curY <= 0 && onValueChange) {
      onValueChange({ id, index: 0, value: data[0] });
    }
  };

  const onBeginDrag = () => {
    setAdjustingScroll(false);
  };

  const onPressSubItem = (index: number) => {
    const newIndex = index - 1;
    scrollToIndex(newIndex);
    setAdjustingScroll(true);
    if (onValueChange) onValueChange({ id, newIndex, value: data[newIndex] });
  };

  const onScrollEnd = (evt: any) => {
    const curY = evt.nativeEvent.contentOffset.y;
    let toIndex;
    if (curY % itemHeight !== 0) {
      toIndex = calcIndex(curY);
      setAdjustingScroll(true);
      scrollToIndex(toIndex);
    } else if (!adjustingScroll) {
      toIndex = curY / itemHeight;
      setAdjustingScroll(false);
    }
    if (toIndex && onValueChange) {
      onValueChange({ id, index: toIndex, value: data[toIndex] });
    }
  };

  const formatedData = [
    { key: 'header', value: 'header', hide: true },
    ...data,
    { key: 'footer', value: 'footer', hide: true }
  ];

  return (
    <FlatList
      data={formatedData}
      renderItem={({ item, index }) => {
        if (item && item.hide) {
          return <View style={{ height: itemHeight }} />;
        }
        return (
          <SubItem
            item={item.value ? item.value : item}
            index={index}
            height={itemHeight}
            render={renderItem}
            onPress={onPressSubItem}
          />
        );
      }}
      keyExtractor={(item) => {
        if (typeof item === 'number') {
          return item.toString();
        }
        if (item && item.key) {
          return item.key;
        }
        return item;
      }}
      // @ts-ignore
      ref={svRef}
      getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
      style={{ flex }}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      bounces={false}
      initialNumToRender={5}
      initialScrollIndex={data.indexOf(defaultValue)}
      contentContainerStyle={{ ...styles.container }}
      onScroll={onScroll}
      onScrollBeginDrag={onBeginDrag}
      snapToAlignment="end"
      snapToInterval={10}
      onMomentumScrollEnd={onScrollEnd}
      windowSize={61}
      maxToRenderPerBatch={30}
    />
  );
}

export default ScrollPickerItem;
