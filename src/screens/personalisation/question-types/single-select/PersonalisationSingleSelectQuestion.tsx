import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightIcon } from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import { IPersonalisationAnswer } from '../../../../store/models/personalisation/personalisationModelAdapter';
import theme from '../../../../theme';
import styles from './personalisation-single-questions-styles';
import { LineSpacer } from '../../../../components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

interface PersonalisationSingleSelectQuestionProps {
  question: string;
  options: IPersonalisationAnswer[];
  onPressAnswer: () => void;
}

const PersonalisationSingleSelectQuestion = ({
  question,
  options,
  onPressAnswer
}: PersonalisationSingleSelectQuestionProps) => {
  const dispatch: Dispatch = useDispatch();
  const questions =
    useSelector((state) => state.personalisationModel.personalisation?.questions) ?? [];

  const handleOnAddAnswer = useCallback(
    (option: IPersonalisationAnswer) => {
      if (questions) {
        const filteredQuestions = questions.filter(
          (addedQuestion) => addedQuestion.question !== question
        );
        dispatch.personalisationModel.setPersonalisationQuestions({
          questions: [...filteredQuestions, { question: question, answer: option.id }]
        });
      }
      onPressAnswer();
    },
    [questions, dispatch, question, onPressAnswer]
  );

  return (
    <>
      {options?.map((option) => {
        return (
          <View key={option.id}>
            <TouchableOpacity style={styles.container} onPress={() => handleOnAddAnswer(option)}>
              <View style={styles.firstRowContainer}>
                <View style={styles.titleContainer}>
                  {option.image && (
                    <FastImage style={styles.iconImage} source={{ uri: option.image.url }} />
                  )}
                  <Typography fontFamily="trebleHeavy" fontSize={14} lineHeight={22}>
                    {option.title}
                  </Typography>
                </View>
                <ArrowRightIcon fill={theme.colors.primary.orange} />
              </View>
              {option.description && (
                <Typography type="regularbfa" fontSize={12} lineHeight={20}>
                  {option.description}
                </Typography>
              )}
            </TouchableOpacity>
            <LineSpacer />
          </View>
        );
      })}
    </>
  );
};

export default PersonalisationSingleSelectQuestion;
