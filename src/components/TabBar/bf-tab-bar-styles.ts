import { StyleSheet, Dimensions, ViewStyle } from 'react-native';
import theme from '../../theme';

const styles: any = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'white',
    borderBottomColor: theme.colors.shadow,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tabInnerContainer: {
    paddingHorizontal: 16,
    marginTop: 16
  },
  tabs: {
    flexDirection: 'row'
  },
  tabSize: ((numTabs: number): ViewStyle => ({
    width: Dimensions.get('screen').width / numTabs
  })) as any,
  indicator: {
    height: 2,
    backgroundColor: theme.colors.primary.orange,
    elevation: 2,
    top: 0
  },
  tabTextActive: {
    color: theme.colors.primary.orange,
    textAlign: 'center',
    paddingBottom: 12
  },
  tabTextInactive: {
    textAlign: 'center',
    paddingBottom: 12,
    color: theme.colors.black
  }
});

export default styles;
