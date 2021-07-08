import React, { useMemo, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { IPersonalisationAnswer } from '../../../../store/models/personalisation/personalisationModelAdapter';
import Slider from '@react-native-community/slider';
import theme from '../../../../theme';
import Typography from '../../../../components/Typography';
import formatMessage from 'format-message';
import styles from './personalisation-slider-question-styles';
import { convertHexToRGBA } from '../../../../utils/index';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../../../components/Layout/Layout';

interface PersonalisationSliderQuestionProps {
  question: string;
  options: IPersonalisationAnswer[];
}

const PersonalisationSliderQuestion = ({
  question,
  options
}: PersonalisationSliderQuestionProps) => {
  const questions = useSelector((state) => state.personalisationModel.personalisation?.questions);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const addedQuestion = questions?.find((q) => q.question === question);
    const filteredAnswers =
      questions?.filter((adddedQuestion) => adddedQuestion.question !== question) ?? [];
    if (!addedQuestion && options.length > 0) {
      dispatch.personalisationModel.setPersonalisationQuestions({
        questions: [...filteredAnswers, { question: question, answer: options[0].id }]
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionSelected = useMemo(() => {
    const addedQuestion = questions?.find((q) => q.question === question);

    if (addedQuestion)
      return options.find((option) => option.id === addedQuestion.answer) ?? options[0];

    return options[0];
  }, [questions, options, question]);

  const handleChangeAnswer = useCallback(
    (index: number) => {
      const newAnswer = options[index];
      const filteredAnswers =
        questions?.filter((adddedQuestion) => adddedQuestion.question !== question) ?? [];

      dispatch.personalisationModel.setPersonalisationQuestions({
        questions: [...filteredAnswers, { question: question, answer: newAnswer.id }]
      });
    },
    [options, dispatch, question, questions]
  );

  return (
    <Container marginVertical={8}>
      <View style={styles.optionDetailsContainer}>
        <Typography
          style={styles.optionTitle}
          fontFamily="trebleHeavy"
          fontSize={16}
          lineHeight={22}
        >
          {optionSelected.title}
        </Typography>
        {optionSelected.description && (
          <Typography type="regularbfa" maxLines={3}>
            {optionSelected.description}
          </Typography>
        )}
      </View>

      <View style={styles.legendContainer}>
        <Typography type="regularbfa" fontSize={12} style={styles.legendText}>
          {formatMessage('Low')}
        </Typography>
        <Typography type="regularbfa" fontSize={12} style={styles.legendText}>
          {formatMessage('High')}
        </Typography>
      </View>

      <Slider
        value={options.findIndex((option) => option.id === optionSelected.id)}
        minimumValue={0}
        step={1}
        maximumValue={options.length - 1}
        thumbTintColor={theme.colors.primary.orange}
        minimumTrackTintColor={theme.colors.primary.orange}
        maximumTrackTintColor={convertHexToRGBA(theme.colors.primary.orange, 0.5)}
        onValueChange={handleChangeAnswer}
      />
    </Container>
  );
};

export default PersonalisationSliderQuestion;
