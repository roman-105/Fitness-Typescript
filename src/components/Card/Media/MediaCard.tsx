import React from 'react';
import { View, ViewStyle } from 'react-native';
import Typography from '../../Typography';
import styles from './media-card-styles';
import SlashedCard from '../SlashedCard/SlashedCard';

export interface MediaCardProps {
  style?: ViewStyle;
  image?: {
    uri: string;
  };
  name: string;
  onPress: () => void;
}

const MediaCard = ({ style, image, name, onPress }: MediaCardProps) => {
  return (
    <SlashedCard
      image={image}
      imageHeight="80%"
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.infoContainer}>
        <Typography fontFamily="impact" uppercase maxLines={1}>
          {name}
        </Typography>
      </View>
    </SlashedCard>
  );
};

const areEqual = (prevProps: MediaCardProps, nextProps: MediaCardProps) =>
  prevProps.name === nextProps.name;

export default React.memo(MediaCard, areEqual);
