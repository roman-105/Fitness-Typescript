import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckIcon } from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import { IPersonalisationAnswer } from '../../../../store/models/personalisation/personalisationModelAdapter';
import theme from '../../../../theme';
import styles from './personalisation-multiple-questions-styles';
import { Spacer } from '../../../../components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '../../../../store/store';
import FastImage from 'react-native-fast-image';
interface PersonalisationMultipleSelectQuestionProps {
  question: string;
  options: IPersonalisationAnswer[];
}

const PersonalisationMultipleSelectQuestion = ({
  question,
  options
}: PersonalisationMultipleSelectQuestionProps) => {
  const questions = useSelector((state) => state.personalisationModel.personalisation?.questions);
  const dispatch: Dispatch = useDispatch();

  const handleAddAnswer = useCallback(
    (option: IPersonalisationAnswer) => {
      let newValue: string[] | null = [];
      const addedQuestion = questions?.find(
        (adddedQuestion) => adddedQuestion.question === question
      );

      const filteredAnswers =
        questions?.filter((adddedQuestion) => adddedQuestion.question !== question) ?? [];

      if (!addedQuestion)
        return dispatch.personalisationModel.setPersonalisationQuestions({
          questions: [...filteredAnswers, { question: question, answer: [option.id] }]
        });

      const answers = addedQuestion.answer as string[];

      if (answers.length === 1) {
        newValue = answers[0] === option.id ? null : [...answers, option.id];
      } else {
        newValue = answers.includes(option.id)
          ? answers.filter((answer) => answer !== option.id)
          : [...answers, option.id];
      }

      if (!newValue)
        return dispatch.personalisationModel.setPersonalisationQuestions({
          questions: filteredAnswers
        });

      return dispatch.personalisationModel.setPersonalisationQuestions({
        questions: [...filteredAnswers, { question: question, answer: newValue }]
      });
    },
    [questions, question, dispatch]
  );

  return (
    <>
      {options?.map((option) => {
        const isOptionSelected =
          questions?.find((addedQuestion) => {
            if (addedQuestion.question === question) {
              const answers = addedQuestion.answer as string[];
              return answers.includes(option.id);
            }
          }) !== undefined;

        return (
          <View key={option.id}>
            <TouchableOpacity
              key={option.id}
              style={[styles.container, isOptionSelected && styles.containerSelected]}
              onPress={() => handleAddAnswer(option)}
            >
              {!isOptionSelected && option.image && (
                <FastImage style={styles.backgroundImage2} source={{ uri: option.image.url }} />
              )}
              <View style={styles.titleContainer}>
                <Typography
                  style={[isOptionSelected && styles.textSelected]}
                  fontFamily="trebleHeavy"
                  fontSize={14}
                  lineHeight={22}
                >
                  {option.title}
                </Typography>
                {isOptionSelected && <CheckIcon fill={theme.colors.primary.white} />}
              </View>
            </TouchableOpacity>
            <Spacer height={8} />
          </View>
        );
      })}
    </>
  );
};

export default PersonalisationMultipleSelectQuestion;
