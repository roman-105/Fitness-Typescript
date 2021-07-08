import React, { useMemo } from 'react';
import { View, TouchableOpacity, ViewStyle, Text } from 'react-native';
import placeholderImage from '../../../assets/images/placeholder/img_placeholder-square.png';
import styles from './slashed-card-styles';
import { ImageSlashed } from '../../ImageSlashed';

function SlashedImage(imageHeight: string, image?: { uri: string }, tag?: string) {
  return (
    <ImageSlashed
      source={image ? { uri: image } : placeholderImage}
      height={imageHeight}
      style={styles.slashed}
    >
      {tag ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ) : (
        <View />
      )}
    </ImageSlashed>
  );
}

export interface SlashedCardProps {
  image?: {
    uri: string;
  };
  imageHeight?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  tag?: string;
  children: React.ReactNode;
}

// Basic component to reuse for multiple cards (Training, Media, Nutrition, SuggestedTrainers...)
const SlashedCard = ({
  image,
  imageHeight = '60%',
  onPress = () => {},
  style = {},
  tag,
  children
}: SlashedCardProps) => {
  const memoImage = useMemo(() => SlashedImage(imageHeight, image, tag), [imageHeight, image, tag]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableZone}>
        {memoImage}
        <View style={styles.infoContainer}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};

export default SlashedCard;
