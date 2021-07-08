import { RootModel } from '../../../src/store/models';
import { healthModel, HealthModelState } from '../../../src/store/models/health';
import { keys } from '../../../src/store/models/health';
import HealthAdapter from '../../../src/store/models/health/healthAdapter';

const isAuthorizedStub = jest.spyOn(HealthAdapter, 'isAuthorized');
const authorizeStub = jest.spyOn(HealthAdapter, 'authorize');
const hasRequestedPermissionsStub = jest.spyOn(HealthAdapter, 'hasRequestedPermissions');
const isIOSAuthorizedStub = jest.spyOn(HealthAdapter, 'isIOSAuthorized');
const getDataStub = jest.spyOn(HealthAdapter, 'getData');
const disconnectStub = jest.spyOn(HealthAdapter, 'disconnect');

const rootModel: Pick<RootModel, 'healthModel'> = {
  healthModel: { ...healthModel }
};

let initialHealthState: HealthModelState = { ...healthModel.state };

describe('healthModel tests', () => {
  beforeEach(() => {
    rootModel.healthModel = require('../../../src/store/models/health').healthModel;
    initialHealthState = require('../../../src/store/models/health').healthModel.state;
  });

  afterEach(() => {
    isAuthorizedStub.mockReset();
    authorizeStub.mockReset();
    hasRequestedPermissionsStub.mockReset();
    isIOSAuthorizedStub.mockReset();
    getDataStub.mockReset();
    disconnectStub.mockReset();
  });

  describe('reducers', () => {
    it('setIsAuthorized should update isAuthorized and hasRequestedPermissions values', () => {
      const result: HealthModelState = rootModel.healthModel.reducers.setIsAuthorized(
        initialHealthState,
        { isAuthorized: true, hasRequestedPermissions: true }
      );
      expect(result.isAuthorized).toBeTruthy();
      expect(result.hasIOSRequestedPermissions).toBeTruthy();
    });
    it('storeData should update health data', () => {
      const dataToStore = [[{ value: 1 }], [], [{ value: 1 }], []];

      const result: HealthModelState = rootModel.healthModel.reducers.storeData(
        initialHealthState,
        dataToStore
      );

      expect(result.data[keys[0]]).toHaveLength(1);
      expect(result.data[keys[1]]).toHaveLength(0);
      expect(result.data[keys[2]]).toHaveLength(1);
      expect(result.data[keys[3]]).toHaveLength(0);
    });
    it('setIsDisconnected should update isDisconnected values', () => {
      const result: HealthModelState = rootModel.healthModel.reducers.setIsDisconnected(
        initialHealthState,
        { isDisconnected: true }
      );
      expect(result.isDisconnected).toBeTruthy();
    });
  });

  describe('effects', () => {
    it('isAuthorized should check if user is authorized', async () => {
      const dispatch: any = {
        healthModel: { setIsAuthorized: jest.fn() }
      };
      isAuthorizedStub.mockResolvedValue(true);
      hasRequestedPermissionsStub.mockResolvedValue(true);

      await rootModel.healthModel
        .effects(dispatch)
        // @ts-ignore
        .isAuthorized(false, { healthModel: { isAuthorized: true } });

      expect(isAuthorizedStub).toHaveBeenCalled();
      expect(hasRequestedPermissionsStub).toHaveBeenCalled();

      expect(dispatch.healthModel.setIsAuthorized).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsAuthorized).toHaveBeenCalledWith({
        isAuthorized: true,
        hasRequestedPermissions: true
      });
    });
    it('authorize should save true is user has been authorized', async () => {
      const dispatch: any = {
        healthModel: { setIsAuthorized: jest.fn(), setIsDisconnected: jest.fn() },
        snackbarModel: { report: jest.fn() }
      };
      authorizeStub.mockResolvedValue({ isAuthorized: true, hasRequestedPermissions: true });

      await rootModel.healthModel.effects(dispatch).authorize();

      expect(authorizeStub).toHaveBeenCalled();

      expect(dispatch.healthModel.setIsAuthorized).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsAuthorized).toHaveBeenCalledWith({
        isAuthorized: true,
        hasRequestedPermissions: true
      });
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalledWith({
        isDisconnected: false
      });
    });
    it('getData should get health data', async () => {
      const dispatch: any = {
        healthModel: { storeData: jest.fn() }
      };
      const data = [{ data: 1 }];
      getDataStub.mockResolvedValue(data);

      await rootModel.healthModel.effects(dispatch).getData();

      expect(getDataStub).toHaveBeenCalled();

      expect(dispatch.healthModel.storeData).toHaveBeenCalled();
      expect(dispatch.healthModel.storeData).toHaveBeenCalledWith(keys.map((_) => data));
    });
    it('disconnect should set isDisconnected and dispatch actions when android', async () => {
      const dispatch: any = {
        healthModel: { setIsDisconnected: jest.fn() },
        snackbarModel: { report: jest.fn() }
      };
      disconnectStub.mockResolvedValue({ isDisconnected: true, platform: 'android' });

      await rootModel.healthModel.effects(dispatch).disconnect();

      expect(disconnectStub).toHaveBeenCalled();

      expect(dispatch.snackbarModel.report).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalledWith({ isDisconnected: true });
    });
    it('disconnect should set isDisconnected and dispatch actions when ios', async () => {
      const dispatch: any = {
        healthModel: { setIsDisconnected: jest.fn() },
        modalModel: { setInfo: jest.fn() }
      };
      disconnectStub.mockResolvedValue({ isDisconnected: true, platform: 'ios' });

      await rootModel.healthModel.effects(dispatch).disconnect();

      expect(disconnectStub).toHaveBeenCalled();

      expect(dispatch.modalModel.setInfo).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalled();
      expect(dispatch.healthModel.setIsDisconnected).toHaveBeenCalledWith({ isDisconnected: true });
    });
  });
});
