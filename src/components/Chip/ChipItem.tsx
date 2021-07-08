import React, { useCallback } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Typography from '../Typography/Typography';
import styles from './chip-item-styles';
import { Item } from './ChipList';

interface ChipItemProps {
  style?: ViewStyle;
  item: Item;
  selected?: boolean;
  onClick: (item: Item, selected: boolean) => void;
}

const ChipItem = ({ style, item, selected, onClick }: ChipItemProps) => {
  const handleClick = useCallback(() => {
    onClick(item, !selected);
  }, [onClick, item, selected]);

  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.selected : {}, style]}
      onPress={handleClick}
    >
      <Typography fontFamily="medium" light={selected}>
        {item.title}
      </Typography>
    </TouchableOpacity>
  );
};

export default ChipItem;
