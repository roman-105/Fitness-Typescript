import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  text: {
    color: theme.colors.primary.asphaltGrey
  },
  h1: {
    fontFamily: theme.fonts.Heading.TrebleHeavy,
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38,
    textTransform: 'uppercase'
  },
  h2: {
    fontFamily: theme.fonts.Heading.TrebleHeavy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 34,
    textTransform: 'uppercase'
  },
  regularbfa: {
    fontFamily: theme.fonts.Heading.Double,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.1
  },
  l: {
    fontSize: 32
  },
  m: {
    fontSize: 16
  },
  light: {
    color: '#FFFFFF'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  impact: {
    fontFamily: theme.fonts.Impact
  },
  regular: {
    fontFamily: theme.fonts.Argumentum.Regular
  },
  bold: {
    fontFamily: theme.fonts.Argumentum.Bold
  },
  medium: {
    fontFamily: theme.fonts.Argumentum.Medium
  },
  thin: {
    fontFamily: theme.fonts.Argumentum.Thin
  },
  double: {
    fontFamily: theme.fonts.Heading.Double
  },
  trebleHeavy: {
    fontFamily: theme.fonts.Heading.TrebleHeavy
  },
  trebleRegular: {
    fontFamily: theme.fonts.Heading.TrebleRegular
  },
  trebleLight: {
    fontFamily: theme.fonts.Heading.TrebleLight
  },
  trebleExtraBold: {
    fontFamily: theme.fonts.Heading.TrebleExtraBold
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  }
});

export default styles;
