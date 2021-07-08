import React, { useState, useCallback, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import ChipItem from './ChipItem';
import styles from './chip-list-styles';

export interface Item {
  id: string;
  title: string;
}

interface ChipListProps {
  style?: ViewStyle;
  items: Item[];
  onChange?: (item: Item[]) => void;
  max?: number;
}

const ChipsList = ({ style, items, onChange = () => {}, max = 50 }: ChipListProps) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const getListItem = useCallback((item, selected, handleItemClick) => {
    return (
      <ChipItem
        item={item}
        selected={selected}
        onClick={handleItemClick}
        key={item.id}
        style={styles.chip}
      />
    );
  }, []);

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems, onChange]);

  const handleClickItem = useCallback(
    (item, selected) => {
      if (selected) {
        if (selectedItems.length < max) {
          setSelectedItems([...selectedItems, item]);
        }
      } else {
        setSelectedItems(selectedItems.filter((el) => el.id !== item.id));
      }
    },
    [max, selectedItems]
  );
  return (
    <View style={[styles.container, style]}>
      {items.map((item) =>
        getListItem(
          item,
          selectedItems.some((el) => el.id === item.id),
          handleClickItem
        )
      )}
    </View>
  );
};

export default ChipsList;
