import React from 'react';
import { Switch, View } from 'react-native';
import theme from '../../theme';
import styles from './bf-switch-styles';
import { convertHexToRGBA } from '../../utils/index';
import Typography from '../Typography';

interface BFSwitchProps {
  title?: string;
  onValueChange?: () => void;
  disabled: boolean;
  value: boolean;
}

const BFSwitch = ({ title, onValueChange = () => {}, disabled, value }: BFSwitchProps) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: convertHexToRGBA(theme.colors.primary.jerseyGrey, 0.1),
          true: convertHexToRGBA(theme.colors.primary.orange, 0.3)
        }}
        thumbColor={
          disabled
            ? theme.colors.primary.orange
            : convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.4)
        }
        ios_backgroundColor={convertHexToRGBA(theme.colors.primary.jerseyGrey, 0.1)}
        onValueChange={onValueChange}
        value={value}
        style={styles.switch}
      />
      {title !== undefined && (
        <Typography fontFamily="regular" style={styles.text}>
          {title}
        </Typography>
      )}
    </View>
  );
};

export default BFSwitch;
