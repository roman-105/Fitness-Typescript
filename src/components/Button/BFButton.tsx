import React from 'react';
import { ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import Typography from '../Typography';
import { iconLookup } from '../Icon/index';
import styles from './bf-button-styles';
import theme from '../../theme';

interface BFButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  wider?: boolean;
  white?: boolean;
  margin?: number;
  icon?: 'arrowRight';
}

const BFButton = ({
  title,
  onPress = () => {},
  style,
  disabled,
  wider,
  white,
  icon,
  margin = 0
}: BFButtonProps) => {
  const IconComponent = icon ? iconLookup[icon] : null;

  return (
    <TouchableOpacity
      testID={title}
      onPress={onPress}
      style={[
        styles.button,
        { margin },
        disabled && styles.disabled,
        wider && styles.wider,
        white && styles.white,
        icon && styles.withIcon,
        style
      ]}
      disabled={disabled}
    >
      <Typography
        type="h1"
        fontFamily="trebleRegular"
        style={[styles.text, white && styles.whiteText]}
      >
        {title}
      </Typography>

      {IconComponent && <IconComponent fill={theme.colors.primary.white} />}
    </TouchableOpacity>
  );
};

export default BFButton;
