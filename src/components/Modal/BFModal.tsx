import React, { useCallback } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../Typography';
import styles from './bf-modal-styles';

function BFModal() {
  const { info } = useSelector((state) => state.modalModel);
  const {
    visible,
    title,
    subtitle,
    closeText,
    acceptText,
    onAccept = () => {},
    onClose = () => {}
  } = info;
  const dispatch: Dispatch = useDispatch();

  const handleOnClose = useCallback(() => {
    dispatch.modalModel.setInfo({ visible: false });
    onClose();
  }, [dispatch, onClose]);

  return (
    <Modal transparent visible={visible} animationType="fade" hardwareAccelerated>
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          {title && (
            <Typography fontFamily={'trebleHeavy'} fontSize={14} style={styles.title} uppercase>
              {title}
            </Typography>
          )}
          {subtitle && typeof subtitle === 'function' && subtitle()}
          {subtitle && typeof subtitle === 'string' && (
            <Typography fontFamily={'trebleRegular'} fontSize={13} lineHeight={22}>
              {subtitle}
            </Typography>
          )}
          <View style={styles.modalFooter}>
            {acceptText && (
              <TouchableOpacity style={styles.actions} onPress={onAccept}>
                <Typography fontFamily={'trebleRegular'} fontSize={14} light uppercase>
                  {acceptText}
                </Typography>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleOnClose} style={!acceptText && styles.actions}>
              <Typography fontFamily={'trebleRegular'} fontSize={14} light={!acceptText} uppercase>
                {closeText || 'Close'}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default BFModal;
