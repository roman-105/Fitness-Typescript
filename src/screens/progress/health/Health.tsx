import React from 'react';
import { View, Platform } from 'react-native';
import useHealth from './useHealth';
import formatMessage from 'format-message';
import Typography from '../../../components/Typography/Typography';
import styles from './health-styles';
import { GoogleFitIcon } from '../../../components/Icon';
import { AppleHealthIcon } from '../../../components/Icon';
import BFSwitch from '../../../components/Switch/BFSwitch';

const Health = () => {
  const { isAuthorized, handleAuthorize, isDisconnected } = useHealth();

  return (
    <View style={styles.container}>
      {!isAuthorized ||
        (isAuthorized && isDisconnected && (
          <Typography
            fontFamily={'trebleRegular'}
            fontSize={14}
            lineHeight={24}
            style={{ marginTop: 40 }}
          >
            {formatMessage('You are not connected to any health apps')}
          </Typography>
        ))}
      <View style={styles.switchContainer}>
        <View style={styles.app}>
          {Platform.OS === 'ios' ? <AppleHealthIcon /> : <GoogleFitIcon />}
          <Typography fontFamily={'trebleHeavy'} fontSize={14} style={{ marginLeft: 24 }}>
            {Platform.OS === 'ios' ? formatMessage('Apple health') : formatMessage('Google Fit')}
          </Typography>
        </View>
        <BFSwitch
          disabled={isAuthorized && !isDisconnected}
          value={isAuthorized && !isDisconnected}
          onValueChange={handleAuthorize}
        />
      </View>
      <Typography fontFamily={'trebleHeavy'} fontSize={14} uppercase>
        {formatMessage('About data sharing')}
      </Typography>
      <Typography
        fontFamily={'trebleRegular'}
        fontSize={14}
        lineHeight={24}
        style={{ marginTop: 8 }}
      >
        {formatMessage(
          'Your Basic-Fit app connects to the calories and movement data from your favorite health apps'
        )}
      </Typography>
    </View>
  );
};

export default Health;
