import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const margin = 8;
export const normalWidth = 300;
export const smallWidth = (300 - margin * 2) / 2;
export const size = 206;

const styles: any = StyleSheet.create({
  container: {
    overflow: 'visible',
    height: 206,
    width: 206,
    marginHorizontal: margin,
    marginTop: margin,
    backgroundColor: theme.colors.primary.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 4
  }
});

export default styles;
