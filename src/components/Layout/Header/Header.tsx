import React from 'react';
import { View } from 'react-native';
import styles from './header-styles';
import Typography from '../../Typography';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  withMargin?: boolean;
}

function Header({ title, subtitle, withMargin }: HeaderProps) {
  return (
    <View style={[styles.infoContainer, withMargin && styles.padding]}>
      {title && (
        <Typography type="h2" uppercase style={styles.title}>
          {title}
        </Typography>
      )}
      {subtitle && <Typography fontFamily="regular">{subtitle}</Typography>}
    </View>
  );
}

export default Header;
