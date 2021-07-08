import React from 'react';
import { ViewStyle, TextStyle, TouchableOpacity, View } from 'react-native';
import Typography from '../Typography';
import styles from './bf-light-button-styles';
import { iconLookup } from '../Icon/index';
import theme from '../../theme';

interface BFButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  margin?: number;
  icon?: 'arrowRight';
  aditionalInfo?: string;
  uppercase?: boolean;
}

const BFButton = ({
  title,
  onPress = () => {},
  style,
  disabled,
  icon,
  margin = 0,
  aditionalInfo,
  uppercase = true
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
        icon && styles.withIcon,
        style
      ]}
      disabled={disabled}
    >
      <View style={styles.textContainer}>
        <Typography
          fontSize={14}
          fontFamily={'trebleHeavy'}
          style={styles.text}
          uppercase={uppercase}
        >
          {title}
        </Typography>

        {aditionalInfo && (
          <Typography
            fontSize={12}
            lineHeight={14}
            fontFamily="trebleRegular"
            style={styles.aditionalInfo}
          >
            {aditionalInfo}
          </Typography>
        )}
      </View>

      {IconComponent && <IconComponent fill={theme.colors.primary.orange} />}
    </TouchableOpacity>
  );
};

export default BFButton;
