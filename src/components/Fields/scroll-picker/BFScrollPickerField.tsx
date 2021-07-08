import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, ViewStyle } from 'react-native';
import styles from './bf-scroll-picker-field-styles';
import ScrollPicker from '../../ScrollPicker/ScrollPicker';
import Typography from '../../Typography';
import formatMessage from 'format-message';
import { Spacer } from '../../Layout/Layout';

const ITEM_HEIGHT = 40;

interface BFScrollPickerFieldProps {
  style?: ViewStyle;
  title: string;
  data: any[];
  units: string;
  defaultValue: number;
  value?: number;
  onChange: (value: number) => void;
}

function BFScrollPickerField({
  style,
  title,
  data,
  units,
  defaultValue,
  value,
  onChange
}: BFScrollPickerFieldProps) {
  const [visible, setVisible] = useState(false);
  const [tmpValue, setTmpValue] = useState(defaultValue);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    onChange(tmpValue);
  };

  return (
    <>
      <Modal transparent visible={visible} animationType="fade" hardwareAccelerated>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Typography uppercase fontFamily="trebleHeavy" fontSize={20}>
              {title}
            </Typography>
            <Spacer height={24} />
            <ScrollPicker
              decoration={
                <View style={{ ...styles.decorationContainer, height: ITEM_HEIGHT }}>
                  <Typography>{units}</Typography>
                </View>
              }
              itemHeight={ITEM_HEIGHT}
              style={styles.picker}
              onValueChange={setTmpValue}
            >
              <ScrollPicker.Item
                id={title}
                data={data}
                itemHeight={ITEM_HEIGHT}
                defaultValue={value || defaultValue}
                renderItem={({ item }: { item: any }) => (
                  <View style={styles.optionWrapper}>
                    <Typography>{item}</Typography>
                  </View>
                )}
              />
            </ScrollPicker>
            <Spacer height={24} />
            <TouchableOpacity style={styles.action} onPress={closeModal}>
              <Typography>{formatMessage('Done')}</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={style} onPress={openModal}>
        <Typography style={[!value && styles.placeholder]}>
          {value ? `${value} ${units}` : title}
        </Typography>
      </TouchableOpacity>
    </>
  );
}

export default BFScrollPickerField;
