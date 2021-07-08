import { createModel } from '@rematch/core';
import { RootModel } from '..';
import BFErrorTracking from '../../../utils/tools/errorTracking';
import WorkoutsService from '../../../services/explore/WorkoutsService';
import WorkoutsModelAdapter, { IWorkoutsData } from './workoutsModelAdapter';
import { PAGE_SIZE } from '../../../utils/constants';

export interface workoutsModelState {
  singularWorkout?: IWorkoutsData[];
  recommendedWorkouts?: IWorkoutsData[];
  onDemandWorkouts?: IWorkoutsData[];
  latestWorkouts?: IWorkoutsData[];
  allWorkouts: {
    data?: IWorkoutsData[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems?: number;
      totalFilteredItems?: number;
    };
  };
}

export const workoutsModel = createModel<RootModel>()({
  state: {
    recommendedWorkouts: undefined,
    allWorkouts: {
      data: undefined,
      pagination: {
        page: 0,
        pageSize: PAGE_SIZE,
        totalItems: undefined,
        totalFilteredItems: undefined
      }
    },
    singularWorkout: undefined,
    onDemandWorkouts: undefined,
    latestWorkouts: undefined,
    page: 0
  } as workoutsModelState,
  reducers: {
    setRecommendedWorkouts: (state, workouts: IWorkoutsData[]): workoutsModelState => {
      state.recommendedWorkouts = workouts;
      return state;
    },
    setOnDemandWorkouts: (state, workouts: IWorkoutsData[]): workoutsModelState => {
      state.onDemandWorkouts = workouts;
      return state;
    },
    setLatestWorkouts: (state, workouts: IWorkoutsData[]): workoutsModelState => {
      state.latestWorkouts = workouts;
      return state;
    },
    addWorkouts: (
      state,
      {
        workouts,
        page,
        totalItems,
        hasFiltersApplied
      }: {
        workouts: IWorkoutsData[];
        page: number;
        totalItems: number;
        hasFiltersApplied?: boolean;
      }
    ): workoutsModelState => {
      if (page === 0) {
        state.allWorkouts.data = workouts;
      } else {
        state.allWorkouts.data = state.allWorkouts.data
          ? [...state.allWorkouts.data, ...workouts]
          : workouts;
      }
      state.allWorkouts.pagination.page = page;

      if (hasFiltersApplied) {
        state.allWorkouts.pagination.totalFilteredItems = totalItems;
      } else {
        state.allWorkouts.pagination.totalItems = totalItems;
      }
      return state;
    },
    setAllWorkoutsPage: (state, page: number): workoutsModelState => {
      state.allWorkouts.pagination.page = page;
      return state;
    },
    setSingularWorkouts: (state, workout: IWorkoutsData[]): workoutsModelState => {
      state.singularWorkout = workout;
      return state;
    }
  },
  effects: (dispatch) => ({
    async getRecommendedWorkouts(payload: { location: string }) {
      try {
        const { location } = payload;
        const recommendedWorkouts = WorkoutsModelAdapter.transformWorkoutsInfo({
          workouts: await WorkoutsService.getRecommendedWorkouts({ location })
        });

        dispatch.workoutsModel.setRecommendedWorkouts(recommendedWorkouts);
      } catch (err) {
        dispatch.workoutsModel.setRecommendedWorkouts([]);
        BFErrorTracking.recordError(err);
      }
    },
    async getOnDemandWorkouts(payload: { location: string }) {
      try {
        const { location } = payload;
        const response = await WorkoutsService.getAllWorkouts({
          location
        });
        const allWorkouts = WorkoutsModelAdapter.transformWorkoutsInfo({
          workouts: response.data
        });
        const onDemandWorkouts = allWorkouts.filter((workout) => {
          return workout?.audioWorkout === true || workout?.gxr === true;
        });

        dispatch.workoutsModel.setOnDemandWorkouts(onDemandWorkouts);
      } catch (err) {
        dispatch.workoutsModel.setOnDemandWorkouts([]);
        BFErrorTracking.recordError(err);
      }
    },
    async getLatestWorkouts(payload: { location: string }) {
      try {
        const { location } = payload;
        const response = await WorkoutsService.getAllWorkouts({
          location,
          sorted: true
        });
        const allWorkouts = WorkoutsModelAdapter.transformWorkoutsInfo({
          workouts: response.data
        });
        dispatch.workoutsModel.setLatestWorkouts(allWorkouts.slice(0, 3));
      } catch (err) {
        dispatch.workoutsModel.setLatestWorkouts([]);
        BFErrorTracking.recordError(err);
      }
    },
    async getAllWorkouts(payload: { location?: string; filters?: any; page: number }) {
      try {
        const { location, filters, page } = payload;
        const skip = page && PAGE_SIZE * page;

        dispatch.workoutsModel.setAllWorkoutsPage(page);

        const response = await WorkoutsService.getAllWorkouts({
          location,
          ...filters,
          skip,
          limit: PAGE_SIZE
        });

        const allWorkouts = WorkoutsModelAdapter.transformWorkoutsInfo({
          workouts: response.data
        });

        dispatch.workoutsModel.addWorkouts({
          workouts: allWorkouts ?? [],
          page: page,
          totalItems: response.totalItems,
          hasFiltersApplied: filters && Object.keys(filters).length > 0
        });
      } catch (err) {
        dispatch.workoutsModel.addWorkouts({
          workouts: [],
          page: 0,
          totalItems: 0,
          hasFiltersApplied: true
        });
        BFErrorTracking.recordError(err);
      }
    },
    async getSingularWorkout(payload: { ids: string }) {
      try {
        const { ids } = payload;
        const response = await WorkoutsService.getAllWorkouts({ ids });

        const singularWorkout = WorkoutsModelAdapter.transformWorkoutsInfo({
          workouts: response.data
        });

        dispatch.workoutsModel.setSingularWorkouts(singularWorkout);
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    }
  })
});
