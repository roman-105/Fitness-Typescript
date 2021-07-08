import React from 'react';
import LottieView from 'lottie-react-native';
import { ViewStyle } from 'react-native';
import styles from './bf-loader';

import WhiteLoader from '../../assets/images/loaders/loader-white-bg/loader.json';
import OrangeLoader from '../../assets/images/loaders/loader-orange-bg/loader.json';
import { Center } from '../Layout/Layout';

interface BFLoaderProps {
  style?: ViewStyle;
  color?: 'black' | 'orange';
}

const BFLoader = ({ color, style }: BFLoaderProps) => {
  return (
    <Center style={styles.loaderContainer}>
      <LottieView
        style={[styles.loader, style]}
        source={color === 'orange' ? OrangeLoader : WhiteLoader}
        autoPlay
        loop
      />
    </Center>
  );
};

export default BFLoader;
