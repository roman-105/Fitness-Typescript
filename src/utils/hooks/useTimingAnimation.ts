import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { BF_DEFAULT_TIMING_ANIMATION_DURATION } from '../constants';

interface TimingAnimationProps {
  initialValue?: number;
  toValue: number;
  duration?: number;
}

const useTimingAnimation = ({
  initialValue = 1,
  toValue,
  duration = BF_DEFAULT_TIMING_ANIMATION_DURATION
}: TimingAnimationProps) => {
  const value = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const anim = Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: false
    });
    anim.start();
  }, [value, toValue, duration]);

  return value;
};

export default useTimingAnimation;
