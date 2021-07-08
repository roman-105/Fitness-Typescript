import React from 'react';
import { ScrollView } from 'react-native';
import { BFButton } from '../../components/Button';
import { Row, Spacer, SelfCenter } from '../../components/Layout/Layout';
import Typography from '../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import Image from 'react-native-fast-image';
import addOnsImage from '../../assets/images/login/add-ons.jpg';
import homeclubsImage from '../../assets/images/login/homeclubs.jpg';
import membershipImage from '../../assets/images/login/membership.jpg';
import styles from './SignUp-style';
import { Routes } from '../../router/routes';
import locale, { country } from '../../utils/i18n/locale';
import BFAnalytics from '../../utils/tools/analytics';
import formatMessage from 'format-message';
import useScrollHeaderShadow from '../../utils/hooks/useScrollHeaderShadow';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { scroll } = useScrollHeaderShadow({ navigation: navigation });

  function getSignInUrl() {
    return `https://www.basic-fit.com/${locale}-${country ?? 'nl'}/subscription/club`;
  }

  function handleSignUp() {
    BFAnalytics.logEvent('tapSignupButton');
    navigation.navigate(Routes.Webview, { uri: getSignInUrl() });
  }

  return (
    <>
      <ScrollView
        style={styles.flex}
        testID="SignUp"
        contentContainerStyle={styles.container}
        onScroll={(e) => scroll(e)}
        scrollEventThrottle={16}
      >
        <Typography type="h1">{formatMessage('Sign Up')}</Typography>
        <Spacer height={20} />
        <Typography type="regularbfa">
          {formatMessage(
            "Become a Basic-Fit member! In all our clubs (800+) you can find the newest equipment and the free Basic-Fit app gives you endless exercises, training schedules and virtual classes. Choose the membership that suits you the most and add Extra's to make it 100% fit your needs."
          )}
        </Typography>
        <Spacer height={24} />
        <Row marginBottom={8}>
          <Image source={homeclubsImage} style={styles.image} />
          <SelfCenter style={styles.margin}>
            <Typography type="regularbfa" size="m">
              {formatMessage('Select a home club')}
            </Typography>
          </SelfCenter>
        </Row>
        <Row marginBottom={8}>
          <Image source={membershipImage} style={styles.image} />
          <SelfCenter style={styles.margin}>
            <Typography type="regularbfa" size="m">
              {formatMessage('Choose a membership')}
            </Typography>
          </SelfCenter>
        </Row>
        <Row marginBottom={8}>
          <Image source={addOnsImage} style={styles.image} />
          <SelfCenter style={styles.margin}>
            <Typography type="regularbfa" size="m">
              {formatMessage('Add Extra’s')}
            </Typography>
          </SelfCenter>
        </Row>
      </ScrollView>
      <BFButton style={styles.marginButton} onPress={handleSignUp} title="SIGN UP" />
    </>
  );
};

export default SignUpScreen;
