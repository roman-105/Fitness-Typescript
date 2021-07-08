import React, { useRef, useEffect, useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity, Animated } from 'react-native';
import styles from './snackbar-styles';
import Typography from '../Typography';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../Icon';
import theme from '../../theme';

const SnackBar = () => {
  const yanim = useRef(new Animated.Value(500)).current; // Initial value for opacity: 0

  const { message } = useSelector((state) => state.snackbarModel);
  const dispatch: Dispatch = useDispatch();

  const handleOnClose = useCallback(() => {
    dispatch.snackbarModel.clear();
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      Animated.timing(yanim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        Animated.timing(yanim, {
          toValue: 500,
          duration: 500,
          delay: 3000,
          useNativeDriver: true
        }).start(handleOnClose);
      });
    }
  }, [yanim, message, handleOnClose]);

  return (
    (message && (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={styles.container}
      >
        <Animated.View style={{ transform: [{ translateY: yanim }] }}>
          <View style={styles.snackbar}>
            <View style={styles.innerContainer}>
              <Typography style={styles.text} type="regularbfa" light>
                {message}
              </Typography>
            </View>
            <TouchableOpacity style={styles.icon} onPress={handleOnClose}>
              <CloseIcon fill={theme.colors.primary.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    )) ||
    null
  );
};

export default SnackBar;
