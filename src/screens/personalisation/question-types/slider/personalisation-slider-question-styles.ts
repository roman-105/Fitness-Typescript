import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const styles: any = StyleSheet.create({
  legendContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  legendText: {
    color: '#808080'
  },
  optionDetailsContainer: {
    marginVertical: 32,
    height: 82
  },
  optionTitle: {
    color: theme.colors.primary.orange,
    marginBottom: 8
  }
});

export default styles;
