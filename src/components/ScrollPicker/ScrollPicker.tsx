import React, { useState, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import ScrollPickerItem from './ScrollPickerItem';
import styles from './scroll-picker-styles';
import { convertHexToRGBA } from '../../utils/index';
import theme from '../../theme';

interface ScrollPickerProps {
  style?: ViewStyle;
  itemHeight: number;
  onValueChange: (value: any) => void;
  decoration?: React.ReactNode;
  children: React.ReactNode;
}

const ScrollPicker = ({
  style,
  itemHeight,
  onValueChange,
  decoration,
  children
}: ScrollPickerProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [active, setActive] = useState<Record<any, any>>({});
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const value: Record<any, any> = {};
    React.Children.forEach(children, (child: any) => {
      if (child) {
        const { id, data = [], defaultValue } = child.props;
        if (defaultValue !== undefined && data.indexOf(defaultValue) !== -1) {
          value[id] = defaultValue;
        } else {
          const [firstValue] = data;
          value[id] = firstValue;
        }
      }
    });
    setActive(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayout = (evt: any) => {
    setHeight(evt.nativeEvent.layout.height);
    setReady(true);
  };

  const onItemValueChange = ({ id, value }: { id: any; value: any }) => {
    if (active[id] !== value) {
      setActive({ [id]: value });
      onValueChange(value);
    }
  };

  const renderChildren = () =>
    React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        itemHeight,
        padding: (height - itemHeight) / 2,
        onValueChange: onItemValueChange
      })
    );

  const renderMask = () => (
    <View style={styles.mask} pointerEvents="none">
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: (height - itemHeight) / 2,
          borderBottomWidth: 1,
          borderColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.24),
          backgroundColor: convertHexToRGBA(theme.colors.primary.white, 0.5)
        }}
      />
      {decoration}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: (height - itemHeight) / 2,
          borderTopWidth: 1,
          borderColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.24),
          backgroundColor: convertHexToRGBA(theme.colors.primary.white, 0.5)
        }}
      />
    </View>
  );

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {ready && renderChildren()}
      {height > 0 && renderMask()}
    </View>
  );
};

ScrollPicker.Item = ScrollPickerItem;

export default ScrollPicker;
