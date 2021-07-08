import React from 'react';
import { View, ViewStyle } from 'react-native';
import Typography from '../Typography';
import styles from './bftag-styles';

interface BFTagProps {
  title: string;
  style?: ViewStyle;
  orangeColor?: boolean;
}

const BFTag = ({ title, style, orangeColor }: BFTagProps) => {
  return (
    <View style={orangeColor ? [styles.tagContainerOrange, style] : [styles.tagContainer, style]}>
      <Typography type="regularbfa" fontSize={12} style={orangeColor ? styles.text : {}}>
        {title}
      </Typography>
    </View>
  );
};

export default BFTag;
