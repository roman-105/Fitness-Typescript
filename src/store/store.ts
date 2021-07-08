import immerPlugin from '@rematch/immer';
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { models, RootModel } from './models/';
import { BFAxiosMiddleware } from '../services/BFAxiosMiddleware';

type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [immerPlugin(), loadingPlugin()],
  redux: {
    rootReducers: { RESET_APP: () => undefined },
    middlewares: [BFAxiosMiddleware]
  }
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel & FullModel>;
