import React from 'react';
import FastImage, { Source } from 'react-native-fast-image';
import { ImageStyle, View, ViewStyle } from 'react-native';
import styles from './image-media-slashed-styles';

interface ImageMediaSlashedProps {
  source: number | Source;
  height?: string | number;
  style?: ImageStyle & ViewStyle;
  children: React.ReactNode;
}

const ImageMediaSlashed = ({
  source,
  height = '35%',
  style = {},
  children
}: ImageMediaSlashedProps) => (
  <FastImage style={[styles.photo, { height }, style]} source={source} resizeMode="cover">
    {children}
    <View style={{ ...styles.triangle, borderBottomColor: style.borderBottomColor }} />
  </FastImage>
);

export default ImageMediaSlashed;
