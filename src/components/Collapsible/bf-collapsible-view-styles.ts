import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  iconCollapsed: {
    transform: [{ rotate: '90deg' }]
  },
  iconNotCollapsed: {
    transform: [{ rotate: '-90deg' }]
  }
});

export default styles;
