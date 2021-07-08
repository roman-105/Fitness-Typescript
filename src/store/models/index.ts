import { Models } from '@rematch/core';
import { screenModel } from './screens';
import { snackbarModel } from './snackbarModel';
import { fullSearchModel } from './full-search/fullSearchModel';
import { healthModel } from './health/healthModel';
import { authModel } from './authModel';
import { appModel } from './app/appModel';
import { memberModel } from './member/memberModel';
import { clubModel } from './club/clubModel';
import { workoutsModel } from './explore/workoutsModel';
import { modalModel } from './modalModel';
import { personalisationModel } from './personalisation/personalisationModel';

export interface RootModel extends Models<RootModel> {
  snackbarModel: typeof snackbarModel;
  screenModel: typeof screenModel;
  healthModel: typeof healthModel;
  authModel: typeof authModel;
  appModel: typeof appModel;
  memberModel: typeof memberModel;
  clubModel: typeof clubModel;
  workoutsModel: typeof workoutsModel;
  fullSearchModel: typeof fullSearchModel;
  modalModel: typeof modalModel;
  personalisationModel: typeof personalisationModel;
}

export const models: RootModel = {
  snackbarModel,
  screenModel,
  healthModel,
  appModel,
  authModel,
  memberModel,
  clubModel,
  workoutsModel,
  modalModel,
  personalisationModel,
  fullSearchModel
};
