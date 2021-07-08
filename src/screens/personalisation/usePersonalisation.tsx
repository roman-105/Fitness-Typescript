import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonalisationHeader from './header/PersonalisationHeader';
import { Routes } from '../../router/routes';
import { IPersonalisationQuestion } from '../../store/models/personalisation/personalisationModelAdapter';

const usePersonalisation = (navigation: any, step: number) => {
  const dispatch: Dispatch = useDispatch();

  const {
    personalisationModel: { questions, personalisation },
    loading: {
      effects: {
        personalisationModel: { getQuestions: isLoadingQuestions }
      }
    }
  } = useSelector((state) => state);

  const question: IPersonalisationQuestion | null = useMemo(() => {
    if (step === 0) return null;
    return questions && questions.length >= step ? questions[step - 1] : null;
  }, [questions, step]);

  const total = useMemo(() => {
    return questions?.length ?? 0;
  }, [questions]);

  const handleGoForward = useCallback(() => {
    if (step === total) {
      dispatch.personalisationModel.updatePersonalisation();
      return navigation.reset({ index: 0, routes: [{ name: Routes.OnboardingConfirm }] });
    }

    navigation.navigate(Routes.Onboarding, {
      step: step + 1
    });
  }, [step, total, navigation, dispatch]);

  const handleSkip = useCallback(
    (stepProp: number) => {
      if (questions) {
        const currentQuestion = questions[stepProp - 1];
        const filteredQuestions =
          personalisation?.questions?.filter(
            (addedQuestion) => addedQuestion.question !== currentQuestion.administrativeTitle
          ) ?? [];

        dispatch.personalisationModel.setPersonalisationQuestions({
          questions: [...filteredQuestions]
        });
      }
      handleGoForward();
    },
    [handleGoForward, questions, dispatch, personalisation]
  );

  const handleGoBack = useCallback(() => {
    navigation.navigate(Routes.Onboarding, {
      step: step - 1
    });
  }, [navigation, step]);

  useEffect(() => {
    if (questions) {
      if (step === 0) {
        navigation.setOptions({ headerShown: false });
      } else {
        navigation.setOptions({
          headerShown: true,
          header: () => (
            <PersonalisationHeader
              onBackPress={handleGoBack}
              onSkipPress={() => handleSkip(step)}
              step={step}
              total={total}
            />
          )
        });
      }
    }
  }, [navigation, step, questions, total, handleSkip, handleGoBack]);

  useEffect(() => {
    dispatch.personalisationModel.getQuestions();
  }, [dispatch]);

  const showContinueButton: boolean | undefined = useMemo(() => {
    if (question) {
      const selectedQuestion = personalisation?.questions?.find(
        (adddedQuestion) => adddedQuestion.question === question.administrativeTitle
      );

      if (question.type === 'Height and Weight') {
        const answers = selectedQuestion?.answer as { height: number; weight: number };
        return selectedQuestion && Object.keys(answers).length === 2;
      }

      if (question.type === 'Slider') {
        return true;
      }

      if (question.type === 'Multiple Select') {
        return selectedQuestion !== undefined;
      }
    }
  }, [personalisation, question]);

  return { question, total, isLoadingQuestions, handleGoForward, showContinueButton };
};

export default usePersonalisation;
