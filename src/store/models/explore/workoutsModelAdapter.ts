import { IWorkoutsDataResponse } from '../../../services/response-types';

export interface IWorkoutsData extends IWorkoutsDataResponse {
  key: string;
}

const WorkoutsModelAdapter = {
  transformWorkoutsInfo: ({ workouts }: { workouts: IWorkoutsDataResponse[] }): IWorkoutsData[] => {
    const workoutsList: IWorkoutsData[] = [];
    for (const workout of workouts) {
      workoutsList.push({
        ...workout,
        key: workout.id
      });
    }
    return workoutsList;
  }
};

export default WorkoutsModelAdapter;
