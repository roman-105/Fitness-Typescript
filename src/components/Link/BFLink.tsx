import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from './bf-link-styles';

interface BFLinkProps {
  children?: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
}

const BFLink = ({ children, onPress = () => {}, style = {} }: BFLinkProps) => {
  return (
    <Text style={[styles.link, style]} onPress={onPress}>
      {children}
    </Text>
  );
};

export default BFLink;
