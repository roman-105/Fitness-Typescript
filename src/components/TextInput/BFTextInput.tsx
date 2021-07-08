import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Typography from '../Typography';
import styles from './BFTextInput-style';

export interface BFTextInputI {
  placeholder: string;
  onChangeText?: (text: string) => void;
  style?: object;
  value: string;
}

export default function ({ placeholder, onChangeText, style, value }: BFTextInputI) {
  return (
    <TextInput
      testID={placeholder}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={'#31313688'}
      style={[styles.input, styles.padding, style]}
      onChangeText={onChangeText}
    />
  );
}

export function BFTextInputPassword({ placeholder, onChangeText, style, value }: BFTextInputI) {
  const [hidden, setHidden] = useState(true);

  function toggle() {
    setHidden(!hidden);
  }

  return (
    <View style={styles.input}>
      <TextInput
        testID={placeholder}
        secureTextEntry={hidden}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#31313688'}
        style={[styles.passtext, styles.padding, style]}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.padding} onPress={toggle}>
        <Typography align="right" type="regularbfa">
          {hidden ? 'Show' : 'Hide'}
        </Typography>
      </TouchableOpacity>
    </View>
  );
}
