import {
  IPersonalisationQuestionDataResponse,
  IPersonalisationResponse
} from '../../../services/response-types';
import {
  IPersonalisationQuestionResponse,
  IPersonalisationAnswerResponse
} from '../../../services/response-types';

export interface IPersonalisationQuestion
  extends Omit<IPersonalisationQuestionResponse, 'answerOptions'> {
  answerOptions: IPersonalisationAnswer[];
}

export interface IPersonalisationQuestionData extends IPersonalisationQuestionDataResponse {}
export interface IPersonalisation {
  questions: IPersonalisationQuestionData[];
}

export interface IPersonalisationAnswer extends IPersonalisationAnswerResponse {}

export const NO_PERSONALISATION_ERROR = 'NO_PERSONALISATION_ERROR';

const PersonalisationAdapter = {
  transformPersonalisation: (personalisation: IPersonalisationResponse): IPersonalisation => {
    return {
      questions: personalisation.questions as IPersonalisationQuestionData[]
    };
  },
  transformQuestions: (
    questions: IPersonalisationQuestionResponse[]
  ): IPersonalisationQuestion[] => {
    const parsedQuestions = questions.map((question) => {
      return {
        ...question,
        answerOptions: question.answerOptions as IPersonalisationAnswer[]
      };
    });

    return parsedQuestions.sort((a, b) => (a.administrativeTitle > b.administrativeTitle ? 1 : -1));
  }
};

export default PersonalisationAdapter;
