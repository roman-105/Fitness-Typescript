import { StyleSheet } from 'react-native';

export const margin = 8;
export const normalWidth = 300;
export const smallWidth = (300 - margin * 2) / 2;

const styles: any = StyleSheet.create({
  normal: {
    overflow: 'visible',
    height: 250,
    width: 300,
    marginHorizontal: margin
  },
  small: {
    overflow: 'visible',
    height: 250 / 1.6,
    width: smallWidth,
    marginHorizontal: margin
  }
});

export default styles;
