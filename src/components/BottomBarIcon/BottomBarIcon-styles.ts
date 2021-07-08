import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    elevation: 1
  },
  label: { marginTop: -8 }
});
