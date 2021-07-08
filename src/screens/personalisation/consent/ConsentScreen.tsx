import React, { useCallback } from 'react';
import Typography from '../../../components/Typography';
import formatMessage from 'format-message';
import { BFButton } from '../../../components/Button';
import { Container, Spacer } from '../../../components/Layout/Layout';
import styles from './consent-screen-styles';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';
import { ScrollView } from 'react-native-gesture-handler';
import { BASIC_FIT_WEBSITE_POLICY } from '../../../utils/constants';

const ConsentScreen = () => {
  const navigation = useNavigation();

  const handleAgreeConsent = useCallback(() => {
    navigation.reset({
      index: 1,
      routes: [{ name: Routes.Login }, { name: Routes.Onboarding }]
    });
  }, [navigation]);

  const handleOpenPrivacyPolicy = useCallback(() => {
    navigation.navigate(Routes.Webview, { uri: BASIC_FIT_WEBSITE_POLICY });
  }, [navigation]);

  return (
    <Container marginVertical={12} style={styles.container}>
      <ScrollView>
        <Typography type="h2">{formatMessage('Our privacy policy')}</Typography>
        <Spacer height={16} />
        <Typography type="regularbfa" lineHeight={24}>
          {formatMessage(
            'To use the Basic-Fit app, we make use of certain personal information from you. You can personalize the app as much as you like and you can always adjust your information in your Profile. Please read our'
          )}{' '}
          <Typography
            fontFamily="trebleHeavy"
            fontSize={14}
            lineHeight={24}
            onPress={handleOpenPrivacyPolicy}
            style={styles.privacyPolicyLink}
          >
            {formatMessage('privacy policy')}
          </Typography>{' '}
          {formatMessage(
            'if you want to know more about the processing of your personal data by Basic-Fit.'
          )}
        </Typography>
      </ScrollView>
      <BFButton
        style={styles.button}
        title={formatMessage('I agree')}
        onPress={handleAgreeConsent}
      />
    </Container>
  );
};

export default ConsentScreen;
