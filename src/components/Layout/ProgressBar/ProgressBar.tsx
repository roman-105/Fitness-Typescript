import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './progress-bar-styles';

interface ProgressBarProps {
  style?: ViewStyle;
  progress: {
    step: number;
    total: number;
  };
}

function ProgressBar({ style = {}, progress: { step, total } }: ProgressBarProps) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={{ ...styles.progress, width: `${Math.round((step / total) * 100)}%` }} />
    </View>
  );
}

export default ProgressBar;
