import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from './typography-styles';

interface TypographyProps {
  [key: string]: any;
  type?: 'h1' | 'h2' | 'regularbfa';
  light?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  align?: 'left' | 'center' | 'right';
  fontFamily?:
    | 'regular'
    | 'bold'
    | 'medium'
    | 'thin'
    | 'double'
    | 'trebleHeavy'
    | 'trebleRegular'
    | 'trebleLight'
    | 'trebleExtraBold'
    | 'impact';
  size?: 'l' | 'm' | 's';
  style?: TextStyle[] | TextStyle;
  maxLines?: number;
  children: React.ReactNode;
  fontSize?: number;
  lineHeight?: number;
  testID?: string;
  onPress?: () => void;
}

// properties that we dont want to map
const blacklist = ['testID', 'children', 'maxLines', 'style', 'light', 'uppercase', 'capitalize'];

const Typography = (props: TypographyProps) => {
  const computedStyle = Object.keys(props)
    .filter((key) => !blacklist.includes(key))
    .reduce((acc, key) => ({ ...acc, ...styles[props[key] ?? {}] }), props.text);

  return (
    <Text
      testID={props.testID}
      style={[
        computedStyle,
        props.style,
        props.fontSize && { fontSize: props.fontSize },
        props.lineHeight && { lineHeight: props.lineHeight },
        props.uppercase && styles.uppercase,
        props.capitalize && styles.capitalize,
        props.light && styles.light
      ]}
      numberOfLines={props.maxLines}
      ellipsizeMode={props.maxLines ? 'tail' : undefined}
      onPress={props.onPress}
    >
      {props.children}
    </Text>
  );
};

export default Typography;
