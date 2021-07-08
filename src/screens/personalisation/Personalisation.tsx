import React from 'react';
import PersonalisationSplash from './splash/PersonalisationSplash';
import BFLoader from '../../components/Loader/BFLoader';
import usePersonalisation from './usePersonalisation';
import { ScreenView } from '../../components/Layout';
import Typography from '../../components/Typography/Typography';
import { Container, Spacer } from '../../components/Layout/Layout';
import PersonalisationSingleSelectQuestion from './question-types/single-select/PersonalisationSingleSelectQuestion';
import { IPersonalisationQuestion } from '../../store/models/personalisation/personalisationModelAdapter';
import PersonalisationHeighWeightSelectQuestion from './question-types/height-weight/PersonalisationHeightWeightQuestion';
import PersonalisationMultipleSelectQuestion from './question-types/multiple-select/PersonalisationMultipleSelectQuestion';
import PersonalisationSliderQuestion from './question-types/slider/PersonalisationSliderQuestion';
import BFButton from '../../components/Button/BFButton';
import formatMessage from 'format-message';
import styles from './personalisation-styles';

interface PersonalisationProps {
  navigation: any;
  route?: {
    params?: {
      step?: number;
    };
  };
}

const questionTypeLookUp: Record<
  IPersonalisationQuestion['type'],
  (question: IPersonalisationQuestion, onContinue: () => void) => React.ReactNode
> = {
  'Single Select': (question, onContinue) => (
    <PersonalisationSingleSelectQuestion
      question={question.administrativeTitle}
      options={question.answerOptions}
      onPressAnswer={onContinue}
    />
  ),
  'Multiple Select': (question) => (
    <PersonalisationMultipleSelectQuestion
      question={question.administrativeTitle}
      options={question.answerOptions}
    />
  ),
  'Height and Weight': (question) => (
    <PersonalisationHeighWeightSelectQuestion question={question.administrativeTitle} />
  ),
  Slider: (question) => (
    <PersonalisationSliderQuestion
      question={question.administrativeTitle}
      options={question.answerOptions}
    />
  )
};

const Personalisation = ({ navigation, route }: PersonalisationProps) => {
  const step = route?.params?.step ?? 0;
  const {
    question,
    total,
    isLoadingQuestions,
    handleGoForward,
    showContinueButton
  } = usePersonalisation(navigation, step);

  if (step === 0) {
    if (isLoadingQuestions) return <BFLoader />;
    return <PersonalisationSplash numQuestions={total} onPress={handleGoForward} />;
  }

  if (!question) return <BFLoader />;

  return (
    <>
      <ScreenView fullWidth progress={{ step: step, total: total }}>
        <Container>
          <Typography type="h2" fontSize={24}>
            {question.question}
          </Typography>
          <Spacer height={8} />
          {question.explaination && (
            <Typography fontFamily="trebleRegular" fontSize={14} lineHeight={22}>
              {question.explaination}
            </Typography>
          )}
          <Spacer height={24} />
          {questionTypeLookUp[question.type](question, handleGoForward)}
        </Container>
      </ScreenView>
      {showContinueButton && (
        <>
          <Spacer height={84} />
          <BFButton
            style={styles.button}
            title={step === total ? formatMessage('Finalise') : formatMessage('Continue')}
            onPress={handleGoForward}
          />
        </>
      )}
    </>
  );
};

export default Personalisation;
