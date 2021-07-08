import env from '../../utils/environment';
import BFAxios from '../BFAxios';
import { IWorkoutsDataResponse } from '../response-types';
import QS from 'qs';

const WorkoutsService = {
  getAllWorkouts: async ({
    location,
    ids,
    goal,
    level,
    category,
    bodyPart,
    minDuration,
    maxDuration,
    skip,
    limit,
    sorted
  }: {
    location?: string;
    ids?: string;
    goal?: string;
    level?: string;
    category?: string;
    bodyPart?: string;
    minDuration?: number;
    maxDuration?: number;
    skip?: number;
    limit?: number;
    sorted?: boolean;
  }): Promise<{ data: IWorkoutsDataResponse[]; totalItems: number }> => {
    const response = await BFAxios.get<IWorkoutsDataResponse[]>(`${env.BF_BACKEND_URL}/workouts`, {
      params: {
        location,
        ids,
        goal,
        level,
        category,
        bodyPart,
        minDuration,
        maxDuration,
        skip,
        limit,
        sorted
      },
      paramsSerializer: (params) => QS.stringify(params, { arrayFormat: 'repeat' })
    });
    return {
      data: response.data,
      totalItems: response?.headers ? parseInt(response.headers['total-items'], 10) : 0
    };
  },
  getRecommendedWorkouts: async ({
    location
  }: {
    location?: string;
  }): Promise<IWorkoutsDataResponse[]> => {
    const { data } = await BFAxios.get<IWorkoutsDataResponse[]>(
      `${env.BF_BACKEND_URL}/workouts/recommended`,
      {
        params: { location }
      }
    );
    return data;
  }
};

export default WorkoutsService;
