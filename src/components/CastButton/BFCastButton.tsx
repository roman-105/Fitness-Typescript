import React, { useEffect, useState } from 'react';
import { CastButton } from 'react-native-google-cast';
import NetInfo from '@react-native-community/netinfo';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import formatMessage from 'format-message';
import { ChromecastIcon } from '../Icon';
import styles from './bf-cast-button-styles';
import useCastTool, { MediaType } from './useCastTool';

interface BFCastButtonProps {
  media: MediaType;
}

const BFCastButton = ({ media }: BFCastButtonProps) => {
  const [connection, setConnection] = useState('');
  const dispatch = useDispatch();
  useCastTool({ media });

  useEffect(() => {
    NetInfo.addEventListener((state) => setConnection(state.type));
  }, []);

  const handleModal = () => {
    dispatch.modalModel.setInfo({
      visible: true,
      subtitle: formatMessage('Please switch your connection to WiFi to be able to cast the video.')
    });
  };

  return (
    <View>
      {connection === 'wifi' ? (
        <View style={styles.castButtonContainer}>
          <CastButton style={styles.castButton} />
        </View>
      ) : (
        <TouchableOpacity style={styles.castButtonContainer} onPress={handleModal}>
          <ChromecastIcon width={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BFCastButton;
