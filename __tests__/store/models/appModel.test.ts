import { RootModel } from '../../../src/store/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WALKTHROUGH_COMPLETED_KEY,
  appModel,
  AppModelState
} from '../../../src/store/models/app/appModel';

const rootModel: Pick<RootModel, 'appModel'> = {
  appModel: { ...appModel }
};

let initialAppState: AppModelState = { ...appModel.state };

describe('appModel tests', () => {
  beforeEach(() => {
    rootModel.appModel = require('../../../src/store/models/app').appModel;
    initialAppState = require('../../../src/store/models/app').appModel.state;
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('reducers', () => {
    it('changeUI should update background and barStyle', () => {
      const result: AppModelState = rootModel.appModel.reducers.changeUI(initialAppState, {
        backgroundColor: 'red',
        barStyle: 'dark-content'
      });
      expect(result.ui.backgroundColor).toEqual('red');
      expect(result.ui.barStyle).toEqual('dark-content');
    });
    it('setWalkThrough should update walkThrough info', () => {
      const result: AppModelState = rootModel.appModel.reducers.setWalkThrough(initialAppState, {
        index: 2,
        visible: true
      });
      expect(result.walkThrough.index).toEqual(2);
      expect(result.walkThrough.visible).toEqual(true);
    });
    it('setWalkThrough should not update a field if it is not passed', () => {
      const result: AppModelState = rootModel.appModel.reducers.setWalkThrough(initialAppState, {
        visible: true
      });
      expect(result.walkThrough.index).toEqual(initialAppState.walkThrough.index);
      expect(result.walkThrough.visible).toEqual(true);
    });
  });

  describe('effects', () => {
    const dispatch: any = {
      appModel: { setWalkThrough: jest.fn() }
    };

    afterEach(() => {
      dispatch.appModel.setWalkThrough.mockReset();
    });

    it('finishWalkThrough should store a flag in async-storage', async () => {
      await rootModel.appModel.effects(dispatch).finishWalkThrough();

      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(WALKTHROUGH_COMPLETED_KEY, 'true');
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalled();
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalledWith({
        index: 0,
        visible: false,
        hasBeenDone: true
      });
    });

    it('checkIfWalkThroughIsDone should get the flag stored and save it in appModel', async () => {
      await AsyncStorage.clear();
      await AsyncStorage.setItem(WALKTHROUGH_COMPLETED_KEY, 'true');

      await rootModel.appModel.effects(dispatch).checkIfWalkThroughIsDone();

      expect(AsyncStorage.getItem).toHaveBeenCalled();
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalled();
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalledWith({ hasBeenDone: true });
    });
    it('checkIfWalkThroughIsDone should save false in appModel if no flag is stored', async () => {
      await AsyncStorage.clear();

      await rootModel.appModel.effects(dispatch).checkIfWalkThroughIsDone();

      expect(AsyncStorage.getItem).toHaveBeenCalled();
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalled();
      expect(dispatch.appModel.setWalkThrough).toHaveBeenCalledWith({ hasBeenDone: false });
    });
  });
});
