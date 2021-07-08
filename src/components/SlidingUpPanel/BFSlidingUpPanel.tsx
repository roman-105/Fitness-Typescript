import React, { useState, useEffect } from 'react';
import styles from './bf-sliding-up-panel-styles';
import { PANEL_HEIGHT, OPACITY_BACKGROUND } from './bf-sliding-up-panel-styles';
import { View, Animated, TouchableOpacity, Platform } from 'react-native';
import theme from '../../theme';
import useTimingAnimation from '../../utils/hooks/useTimingAnimation';
import { useNavigation } from '@react-navigation/native';

interface BFSlidingUpPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOverlayPress?: () => void;
}

const BFSlidingUpPanel = ({ isOpen, onOverlayPress, children }: BFSlidingUpPanelProps) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const animatedHeaderValue = useTimingAnimation({
    duration: 500,
    initialValue: 0,
    toValue: open ? 1 : 0
  });

  useEffect(() => {
    if (Platform.OS === 'ios')
      navigation.setOptions({
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0,
          backgroundColor: open ? OPACITY_BACKGROUND : theme.colors.primary.white
        }
      });
  }, [navigation, open]);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          open && styles.containerOpen,
          {
            bottom: animatedHeaderValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, PANEL_HEIGHT]
            })
          }
        ]}
      >
        <TouchableOpacity style={[styles.innerOverlay]} onPress={onOverlayPress} />
      </Animated.View>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            height: animatedHeaderValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, PANEL_HEIGHT]
            })
          }
        ]}
      >
        <View style={styles.contentContainer}>
          <View style={styles.contentTopMarkContainer}>
            <TouchableOpacity onPress={onOverlayPress} style={styles.contentTopMark} />
          </View>
          {children}
        </View>
      </Animated.View>
    </>
  );
};

export default BFSlidingUpPanel;
