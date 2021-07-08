import React, { useCallback } from 'react';
import { View, TextInput, ViewStyle } from 'react-native';
import theme from '../../../theme';
import { convertHexToRGBA } from '../../../utils/index';
import styles from './bf-search-input-styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '../../Icon';

interface BFSearchInputProps {
  onChangeText: (textValue: string) => void;
  value: string;
  style?: ViewStyle;
  placeholder?: string;
  clearable?: boolean;
}

const BFSearchInput = ({
  onChangeText,
  value,
  style,
  placeholder,
  clearable
}: BFSearchInputProps) => {
  const handleClearInput = useCallback(() => {
    onChangeText('');
  }, [onChangeText]);

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={(textValue: string) => {
          onChangeText(textValue);
        }}
        placeholder={placeholder}
        placeholderTextColor={convertHexToRGBA(theme.colors.primary.asphaltGrey, 0.5)}
      />
      {clearable && value !== '' && (
        <TouchableOpacity style={styles.clearIconContainer} onPress={handleClearInput}>
          <CloseIcon fill={theme.colors.primary.asphaltGrey} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BFSearchInput;
