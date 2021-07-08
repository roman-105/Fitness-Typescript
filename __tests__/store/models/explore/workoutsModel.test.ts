import { RootModel } from '../../../../src/store/models/index';
import { workoutsModel, workoutsModelState } from '../../../../src/store/models/explore';
import BFAxios from '../../../../src/services/BFAxios';
import MockAdapter from 'axios-mock-adapter';
import { workoutsResponseMock } from '../../../../__testConstants__/workoutsResponseMock';
import { IWorkoutsData } from '../../../../src/store/models/explore/workoutsModelAdapter';
import BFErrorTracking from '../../../../src/utils/tools/errorTracking';
import WorkoutsModelAdapter from '../../../../src/store/models/explore/workoutsModelAdapter';

const recordErrorStub = jest.spyOn(BFErrorTracking, 'recordError');

const transformWorkoutsStub = jest.spyOn(WorkoutsModelAdapter, 'transformWorkoutsInfo');

const BFAxiosMock = new MockAdapter(BFAxios);

const rootModel: Pick<RootModel, 'workoutsModel'> = {
  workoutsModel: { ...workoutsModel }
};

const workout = workoutsResponseMock as IWorkoutsData;
const workouts = [workout];

let initialWorkoutsState: workoutsModelState = { ...workoutsModel.state };

describe('workoutsModel tests', () => {
  beforeEach(() => {
    rootModel.workoutsModel = require('../../../../src/store/models/explore').workoutsModel;
    initialWorkoutsState = {
      recommendedWorkouts: undefined,
      singularWorkout: undefined,
      allWorkouts: {
        data: undefined,
        pagination: {
          page: 0,
          pageSize: 100,
          totalItems: undefined
        }
      }
    };
  });

  afterEach(() => {
    BFAxiosMock.reset();
    recordErrorStub.mockReset();
    transformWorkoutsStub.mockReset();
  });

  describe('reducers', () => {
    it('setRecommendedClub should store recommended workouts data', () => {
      const result: workoutsModelState = rootModel.workoutsModel.reducers.setRecommendedWorkouts(
        initialWorkoutsState,
        workouts
      );

      expect(result.recommendedWorkouts).toHaveLength(workouts.length);
      expect(result.recommendedWorkouts).not.toBeUndefined();
    });
    it('setSingularWorkouts should store the singular workout', () => {
      const result: workoutsModelState = rootModel.workoutsModel.reducers.setSingularWorkouts(
        initialWorkoutsState,
        workouts
      );

      expect(result.singularWorkout).toHaveLength(1);
    });
  });

  describe('effects', () => {
    it('getRecommendedWorkouts should request and store recommended workout data', async () => {
      const dispatch: any = { workoutsModel: { setRecommendedWorkouts: jest.fn() } };
      BFAxiosMock.onGet(/workouts\/recommended/).reply(200, workouts);
      transformWorkoutsStub.mockReturnValue(workouts);

      await rootModel.workoutsModel.effects(dispatch).getRecommendedWorkouts({ location: 'Club' });

      expect(dispatch.workoutsModel.setRecommendedWorkouts).toHaveBeenCalled();
      expect(dispatch.workoutsModel.setRecommendedWorkouts).not.toHaveBeenCalledWith([]);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getRecommendedWorkouts should store an empty array request fails', async () => {
      const dispatch: any = { workoutsModel: { setRecommendedWorkouts: jest.fn() } };
      BFAxiosMock.onGet(/workouts\/recommended/).reply(500);

      await rootModel.workoutsModel.effects(dispatch).getRecommendedWorkouts({ location: 'Club' });

      expect(dispatch.workoutsModel.setRecommendedWorkouts).toHaveBeenCalled();
      expect(dispatch.workoutsModel.setRecommendedWorkouts).toHaveBeenCalledWith([]);
      expect(recordErrorStub).toHaveBeenCalled();
    });
    it('getSingularWorkout should get singular workout info', async () => {
      const dispatch: any = { workoutsModel: { setSingularWorkouts: jest.fn() } };
      BFAxiosMock.onGet(/workouts/).reply(200, [workout]);
      transformWorkoutsStub.mockReturnValue([workout]);

      await rootModel.workoutsModel.effects(dispatch).getSingularWorkout({ ids: workout.id });

      expect(dispatch.workoutsModel.setSingularWorkouts).toHaveBeenCalled();
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getSingularWorkout should not store clubInfo if request fails', async () => {
      const dispatch: any = { workoutsModel: { setSingularWorkouts: jest.fn() } };
      BFAxiosMock.onGet(/workouts/).reply(500);

      await rootModel.workoutsModel.effects(dispatch).getSingularWorkout({ ids: workout.id });

      expect(dispatch.workoutsModel.setSingularWorkouts).not.toHaveBeenCalled();
      expect(recordErrorStub).toHaveBeenCalled();
    });
  });
});
