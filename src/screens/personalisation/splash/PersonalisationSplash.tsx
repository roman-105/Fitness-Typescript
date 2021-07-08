import React from 'react';
import { View } from 'react-native';
import personalisationSplash from '../../../assets/images/personalisation/personalisationSplash.png';
import FastImage from 'react-native-fast-image';
import styles from './personalisation-splash-styles';
import Typography from '../../../components/Typography/Typography';
import formatMessage from 'format-message';
import { Container } from '../../../components/Layout/Layout';
import { BFButton } from '../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

interface PersonalisationSplashProps {
  numQuestions: number;
  onPress: () => void;
}

const PersonalisationSplash = ({ numQuestions, onPress }: PersonalisationSplashProps) => {
  return (
    <>
      <FastImage style={styles.image} source={personalisationSplash} />
      <ScrollView>
        <Container>
          <Typography type="h1">{formatMessage('Yesss,\nGet started')}</Typography>
          <View style={styles.subTitle}>
            <Typography type="regularbfa">
              {formatMessage(
                'To make sure your experience is the best it can be, we need to get to know you a little bit better! Start your personalisation journey below.'
              )}
            </Typography>
          </View>
        </Container>
      </ScrollView>
      <Container>
        <BFButton title={formatMessage('Get started')} icon="arrowRight" onPress={onPress} />
        <Typography style={styles.smallText} type="regularbfa">{`${numQuestions} ${formatMessage(
          'questions, about 1 minute to complete'
        )}`}</Typography>
      </Container>
    </>
  );
};

export default PersonalisationSplash;
