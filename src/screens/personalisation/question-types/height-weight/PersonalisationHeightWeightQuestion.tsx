import React, { useCallback } from 'react';
import { View } from 'react-native';
import styles from './personalisation-height-weight-questions-styles';
import BFScrollPickerField from '../../../../components/Fields/scroll-picker/BFScrollPickerField';
import { range } from '../../../../utils/utils';
import formatMessage from 'format-message';
import { useSelector, useDispatch } from 'react-redux';

interface PersonalisationHeighWeightSelectQuestionProps {
  question: string;
}

const PersonalisationHeighWeightSelectQuestion = ({
  question
}: PersonalisationHeighWeightSelectQuestionProps) => {
  const questions = useSelector((state) => state.personalisationModel.personalisation?.questions);
  const memberInfo = useSelector((state) => state.memberModel.member);

  const isFemale = memberInfo?.gender === 'female';
  const activeQuestion = questions?.find((addedQuestion) => addedQuestion.question === question);
  const answers = (activeQuestion?.answer as { height: number; weight: number }) ?? {};

  const dispatch: Dispatch = useDispatch();

  const handleAddAnswer = useCallback(
    (key: 'height' | 'weight', value: number) => {
      const filteredQuestions =
        questions?.filter((addedQuestion) => addedQuestion.question !== question) ?? [];
      const answersToAdd = { ...answers };
      answersToAdd[key] = value;

      dispatch.personalisationModel.setPersonalisationQuestions({
        questions: [...filteredQuestions, { question: question, answer: answersToAdd }]
      });
    },
    [dispatch, answers, question, questions]
  );

  return (
    <View style={styles.container}>
      <BFScrollPickerField
        style={styles.field}
        title={formatMessage('Height')}
        data={range(100, 230)}
        defaultValue={isFemale ? 165 : 180}
        units={formatMessage('cm')}
        value={answers.height}
        onChange={(height) => handleAddAnswer('height', height)}
      />
      <BFScrollPickerField
        style={styles.field}
        title={formatMessage('Weight')}
        data={range(40, 150)}
        defaultValue={isFemale ? 65 : 80}
        units={formatMessage('kg')}
        value={answers.weight}
        onChange={(weight) => handleAddAnswer('weight', weight)}
      />
    </View>
  );
};

export default PersonalisationHeighWeightSelectQuestion;
