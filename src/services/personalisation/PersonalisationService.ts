import env from '../../utils/environment';
import BFAxios from '../BFAxios';
import { IPersonalisationQuestionResponse, IPersonalisationResponse } from '../response-types';
import { IPersonalisationQuestionData } from '../../store/models/personalisation/personalisationModelAdapter';

const PersonalisationService = {
  getPersonalisation: async () => {
    const { data } = await BFAxios.get<IPersonalisationResponse>(
      `${env.BF_BACKEND_URL}/member/personalisation`
    );
    return data;
  },
  getQuestions: async () => {
    const { data } = await BFAxios.get<IPersonalisationQuestionResponse[]>(
      `${env.BF_BACKEND_URL}/member/questions`
    );
    return data;
  },
  updatePersonalisation: async ({ questions }: { questions: IPersonalisationQuestionData[] }) => {
    return BFAxios.put(`${env.BF_BACKEND_URL}/member/personalisation`, { questions });
  }
};

export default PersonalisationService;
