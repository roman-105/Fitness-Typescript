import { createModel } from '@rematch/core';
import { RootModel } from '..';
import PersonalisationService from '../../../services/personalisation/PersonalisationService';
import {
  IPersonalisationQuestion,
  IPersonalisation,
  NO_PERSONALISATION_ERROR
} from './personalisationModelAdapter';
import BFErrorTracking from '../../../utils/tools/errorTracking';
import PersonalisationAdapter from './personalisationModelAdapter';
import { IPersonalisationQuestionData } from './personalisationModelAdapter';

export interface PersonalisationModelState {
  personalisation?: IPersonalisation;
  questions?: IPersonalisationQuestion[];
}

export const personalisationModel = createModel<RootModel>()({
  state: {
    personalisation: undefined,
    questions: undefined
  } as PersonalisationModelState,
  reducers: {
    setPersonalisation: (
      state,
      { personalisation }: { personalisation: IPersonalisation }
    ): PersonalisationModelState => {
      state.personalisation = personalisation;
      return state;
    },
    setQuestions: (
      state,
      { questions }: { questions: IPersonalisationQuestion[] }
    ): PersonalisationModelState => {
      state.questions = questions;
      return state;
    },
    setPersonalisationQuestions: (
      state,
      { questions }: { questions: IPersonalisationQuestionData[] }
    ): PersonalisationModelState => {
      state.personalisation = {
        ...state.personalisation,
        questions: questions
      };
      return state;
    }
  },
  effects: (dispatch) => ({
    getPersonalisation: async () => {
      try {
        const personalisation = PersonalisationAdapter.transformPersonalisation(
          await PersonalisationService.getPersonalisation()
        );
        dispatch.personalisationModel.setPersonalisation({ personalisation });
      } catch (err) {
        // No personalisation found
        if (err.response.status === 404) {
          throw new Error(NO_PERSONALISATION_ERROR);
        }
        BFErrorTracking.recordError(err);
      }
    },
    getQuestions: async () => {
      try {
        const questions = PersonalisationAdapter.transformQuestions(
          await PersonalisationService.getQuestions()
        );
        dispatch.personalisationModel.setQuestions({ questions });
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    },
    updatePersonalisation: async (_, rootState) => {
      try {
        const questions = rootState.personalisationModel.personalisation?.questions ?? [];
        await PersonalisationService.updatePersonalisation({ questions: questions });
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    }
  })
});
