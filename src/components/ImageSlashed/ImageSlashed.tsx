import React from 'react';
import FastImage, { Source } from 'react-native-fast-image';
import { ImageStyle, View, ViewStyle } from 'react-native';
import styles from './image-lashed-styles';

interface ImageSlashedProps {
  source: number | Source;
  height?: string | number;
  style?: ImageStyle & ViewStyle;
  children: React.ReactNode;
  slashOffset?: number;
}

function calcHeight(height: string | number, slashOffset: number): string | number {
  if (typeof height === 'string') {
    return height;
  }
  return height - slashOffset * 1.1;
}

const ImageSlashed = ({
  source,
  height = '35%',
  style = {},
  children,
  slashOffset = 0
}: ImageSlashedProps) => {
  if (typeof source === 'object' && source?.uri === null) {
    return null;
  }
  return (
    <FastImage
      style={[styles.photo, { height: calcHeight(height, slashOffset) }, style]}
      source={source}
      resizeMode="cover"
    >
      {children}
      <View
        style={{ ...styles.triangle, borderBottomColor: style.borderBottomColor, top: slashOffset }}
      />
    </FastImage>
  );
};

export default ImageSlashed;
