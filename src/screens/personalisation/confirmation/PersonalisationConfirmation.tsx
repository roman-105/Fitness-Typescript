import React, { useEffect } from 'react';
import BFLoader from '../../../components/Loader/BFLoader';
import Typography from '../../../components/Typography';
import { Container } from '../../../components/Layout/Layout';
import styles from './personalisation-confirmation-styles';
import formatMessage from 'format-message';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../router/routes';

const CONFIRMATION_DURATION = 1600; // Time to wait in this screen

const PersonalisationConfirmation = () => {
  const navigation = useNavigation();
  const questions =
    useSelector((state) => state.personalisationModel.personalisation?.questions) ?? [];

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: Routes.Main }] });
    }, CONFIRMATION_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={styles.container}>
      <Typography type="h2" fontSize={24}>
        {questions.length === 0
          ? formatMessage('Loading the app')
          : formatMessage('Personalising your app')}
      </Typography>
      <BFLoader />
    </Container>
  );
};

export default PersonalisationConfirmation;
