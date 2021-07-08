import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import formatMessage from 'format-message';
import LoginHeroImg from '../../assets/images/login/login.jpg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Typography from '../../components/Typography';
import BFButton from '../../components/Button/BFButton';
import BFTextInput, { BFTextInputPassword } from '../../components/TextInput/BFTextInput';
import styles from './Login-style';
import { Routes } from '../../router/routes';
import BFAnalytics from '../../utils/tools/analytics';
import { NO_PERSONALISATION_ERROR } from '../../store/models/personalisation/personalisationModelAdapter';

const Login = () => {
  const [user, setUser] = useState('gymtest2020+be-comfort@gmail.com');
  const [pass, setPass] = useState('2000And23');
  const [failed, setFailed] = useState(false);
  const dispatch: Dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loading: {
      effects: {
        authModel: { Login: isLoading }
      }
    }
  } = useSelector((state) => state);

  async function tryToLog() {
    BFAnalytics.logEvent('submitLogin');
    setFailed(false);
    try {
      await dispatch.authModel.Login({ user, pass });
    } catch (e) {
      BFAnalytics.logEvent('triggerError', {
        view: 'login',
        type: 'authenticationCredentialsError'
      });
      return setFailed(true);
    }

    try {
      await dispatch.personalisationModel.getPersonalisation();
    } catch (err) {
      if (err.message === NO_PERSONALISATION_ERROR) {
        return navigation.navigate(Routes.Consent);
      }
    }

    navigation.reset({ index: 0, routes: [{ name: Routes.Main }] });
  }

  function handleSignUp() {
    BFAnalytics.logEvent('tapSignupLink');
    navigation.navigate(Routes.SignUp);
  }

  const forgotUrl = 'https://my.basic-fit.com/new-password-request';

  function handleForgot() {
    BFAnalytics.logEvent('tapPasswordRecoveryLink');
    const setEmailJS = `(function() {
      setTimeout(() => {
        document.getElementsByTagName('input')[0].value = '${user}'
      }, 1000)
    })();`;
    navigation.navigate(Routes.Webview, { uri: forgotUrl, injectedJS: setEmailJS });
  }

  return (
    <>
      <ScrollView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardDismissMode="on-drag"
          testID="Login"
        >
          <View style={styles.imageContainer}>
            <FastImage source={LoginHeroImg} style={styles.image} />
          </View>
          <View style={[styles.padding, styles.spacebetween]}>
            <View>
              <Typography type="h1" fontFamily="trebleHeavy" style={styles.header}>
                {formatMessage('Login')}
              </Typography>
              <Typography type="regularbfa">
                {formatMessage('Use your Basic-Fit member details to login.')}
              </Typography>
              <Typography type="regularbfa">
                {formatMessage('And remember to go for it!')}
              </Typography>
              <View style={styles.inputs}>
                <BFTextInput value={user} onChangeText={setUser} placeholder="Username" />
                <BFTextInputPassword value={pass} onChangeText={setPass} placeholder="Password" />
              </View>
              {failed && (
                <Typography style={styles.errorText} type="regularbfa">
                  {formatMessage(
                    'Either the email address or password you provided is incorrect. Please try again.'
                  )}
                </Typography>
              )}
              <TouchableOpacity onPress={handleForgot}>
                <Typography style={styles.alignEnd} type="regularbfa">
                  {formatMessage('Forgot password')}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={styles.padding}>
        <BFButton
          disabled={pass.length < 3 || user.length < 1 || isLoading}
          onPress={tryToLog}
          title={formatMessage('LOGIN')}
        />
        <BFButton onPress={handleSignUp} white title={formatMessage('SIGN UP')} />
      </View>
    </>
  );
};

export default Login;
