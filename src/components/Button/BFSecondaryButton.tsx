import React from 'react';
import { TouchableOpacity } from 'react-native';
import Typography from '../Typography';
import { iconLookup } from '../Icon/index';
import styles from './bf-secondary-button-styles';
import theme from '../../theme';

interface BFSecondaryButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: 'external' | 'arrowRight';
  secondIcon?: 'clock' | 'calendar';
}

const BFSecondaryButton = ({
  title,
  onPress = () => {},
  disabled,
  icon,
  secondIcon
}: BFSecondaryButtonProps) => {
  const IconComponent = icon ? iconLookup[icon] : null;
  const SecondIconComponent = secondIcon ? iconLookup[secondIcon] : null;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
      {SecondIconComponent && (
        <SecondIconComponent style={styles.secondIcon} fill={theme.colors.primary.asphaltGrey} />
      )}

      <Typography fontFamily="trebleHeavy" fontSize={14} style={styles.text}>
        {title}
      </Typography>
      {IconComponent &&
        (icon === 'external' ? (
          <IconComponent stroke={theme.colors.primary.orange} style={styles.icon} />
        ) : (
          <IconComponent fill={theme.colors.primary.orange} style={styles.icon} />
        ))}
    </TouchableOpacity>
  );
};

export default BFSecondaryButton;
