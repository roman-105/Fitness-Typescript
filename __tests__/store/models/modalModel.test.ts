import { RootModel } from '../../../src/store/models';
import { modalModel, modalState } from '../../../src/store/models/modalModel';

const rootModel: Pick<RootModel, 'modalModel'> = {
  modalModel: { ...modalModel }
};

let initialmodalState: modalState = { ...modalModel.state };

describe('modalModel tests', () => {
  beforeEach(() => {
    rootModel.modalModel = require('../../../src/store/models/modalModel').modalModel;
    initialmodalState = require('../../../src/store/models/modalModel').modalModel.state;
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('reducers', () => {
    it('setInfo should update info state', () => {
      const result: modalState = rootModel.modalModel.reducers.setInfo(initialmodalState, {
        visible: true,
        title: 'Are you sure?'
      });
      expect(result.info).toEqual({ visible: true, title: 'Are you sure?' });
    });
  });

  describe('effects', () => {
    const dispatch: any = {
      modalModel: { setInfo: jest.fn(), setWalkthroughVisibility: jest.fn() }
    };

    it('report should save the info in the state by calling the reducer', () => {
      rootModel.modalModel
        .effects(dispatch)
        .report({ info: { visible: true, title: 'Are you sure?' } });

      expect(dispatch.modalModel.setInfo).toHaveBeenCalled();
      expect(dispatch.modalModel.setInfo).toHaveBeenCalledWith({
        visible: true,
        title: 'Are you sure?'
      });
    });
  });
});
