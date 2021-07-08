import React from 'react';
import { View, ViewStyle } from 'react-native';
import theme from '../../../theme';
import styles from './slashed-view-styles';

interface SlashedViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  borderEndColor?: string;
  top?: boolean;
  bottom?: boolean;
}

function SlashedView({
  children,
  style = {},
  backgroundColor = theme.colors.primary.white,
  borderEndColor = 'transparent',
  top = true,
  bottom = true
}: SlashedViewProps) {
  return (
    <>
      {top && <View style={[styles.triangleStart, { borderBottomColor: backgroundColor }]} />}
      <View style={[style, { backgroundColor }]}>{children}</View>
      {bottom && (
        <View
          style={[
            styles.triangleEnd,
            { borderLeftColor: backgroundColor, borderBottomColor: borderEndColor }
          ]}
        />
      )}
    </>
  );
}

export default SlashedView;
