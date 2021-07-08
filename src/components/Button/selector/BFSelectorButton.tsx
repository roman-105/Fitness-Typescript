import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRight } from '../../Icon';
import Typography from '../../Typography';
import styles from './bf-selector-button-styles';
import theme from '../../../theme';
import { ViewStyle } from 'react-native';

interface BFSelectorButtonProps {
  title: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const BFSelectorButton = ({ title, style, onPress }: BFSelectorButtonProps) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Typography style={styles.buttonText} fontFamily="trebleHeavy" fontSize={12} maxLines={1}>
        {title}
      </Typography>
      <ChevronRight style={styles.icon} fill={theme.colors.primary.asphaltGrey} />
    </TouchableOpacity>
  );
};

export default BFSelectorButton;
