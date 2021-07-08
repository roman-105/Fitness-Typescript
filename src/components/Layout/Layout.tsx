import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import theme from '../../theme';
import { convertHexToRGBA } from '../../utils/index';

interface Row {
  children: ReactNode;
  marginBottom?: number;
  style?: ViewStyle;
}

interface IsParent {
  children: ReactNode;
  style?: ViewStyle;
}

interface Spacer {
  height?: number;
  width?: number;
}

interface FullFlex {
  children: ReactNode;
  style?: ViewStyle;
}

interface Container extends ViewProps {
  children: ReactNode;
  marginVertical?: number;
  style?: ViewStyle;
}

interface LineSpacer {
  dark?: boolean;
  marginVertical?: number;
}

const styles = StyleSheet.create({
  lineSpace: { backgroundColor: theme.colors.primary.jerseyGrey, height: 1 },
  lineSpaceDark: { backgroundColor: convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.2) },
  row: { flexDirection: 'row' },
  center: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  fullFlex: { flex: 1 },
  container: { marginHorizontal: theme.margins.external },
  selfCenter: { alignSelf: 'center' }
});

export function Row({ children, marginBottom = 0, style }: Row) {
  return <View style={[styles.row, { marginBottom: marginBottom }, style]}>{children}</View>;
}

export function Center({ children, style }: IsParent) {
  return <View style={[styles.center, style]}>{children}</View>;
}

export function SelfCenter({ children, style }: IsParent) {
  return <View style={[styles.selfCenter, style]}>{children}</View>;
}

export function Spacer({ height = 0, width = 0 }: Spacer) {
  return <View style={{ height, width }} />;
}

export function FullFlex({ children, style }: IsParent) {
  return <View style={[styles.fullFlex, style]}>{children}</View>;
}

export function LineSpacer({ dark, marginVertical }: LineSpacer) {
  return <View style={[styles.lineSpace, dark && styles.lineSpaceDark, { marginVertical }]} />;
}

export function Container({ testID, children, marginVertical, style }: Container) {
  return (
    <View testID={testID} style={[styles.container, { marginVertical }, style]}>
      {children}
    </View>
  );
}
