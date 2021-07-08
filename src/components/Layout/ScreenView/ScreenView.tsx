import React from 'react';
import { ScrollView, SafeAreaView, View, StatusBar, ViewStyle } from 'react-native';
import styles, { stylesFullWidth } from './screen-view-styles';
import theme from '../../../theme';
import ProgressBar from '../ProgressBar/ProgressBar';
import Header from '../Header/Header';

interface ScreenViewProps {
  style?: ViewStyle;
  header?: any;
  footer?: any;
  children?: React.ReactNode;
  progress?: {
    step: number;
    total: number;
  };
  fullWidth?: boolean;
}

function ScreenView({ style, header, footer, children, progress, fullWidth }: ScreenViewProps) {
  const mergedStyles = { ...styles };

  if (fullWidth) {
    Object.keys(mergedStyles).forEach((key) => {
      if (stylesFullWidth[key]) {
        mergedStyles[key] = { ...mergedStyles[key], ...stylesFullWidth[key] };
      }
    });
  }

  return (
    <View style={mergedStyles.container}>
      <StatusBar backgroundColor={theme.colors.ui.background} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {progress && <ProgressBar progress={progress} style={mergedStyles.progressBar} />}
        {header}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...mergedStyles.scrollContainer, ...style }}
        >
          {children}
        </ScrollView>
        {footer}
      </SafeAreaView>
    </View>
  );
}

ScreenView.header = Header;

export default ScreenView;
