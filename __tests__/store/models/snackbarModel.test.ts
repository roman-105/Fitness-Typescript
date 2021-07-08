import { RootModel } from '../../../src/store/models';
import { snackbarModel, SnackbarState } from '../../../src/store/models/snackbarModel';

const rootModel: Pick<RootModel, 'snackbarModel'> = {
  snackbarModel: { ...snackbarModel }
};

let initialSnackbarState: SnackbarState = { ...snackbarModel.state };

describe('snackbarModel tests', () => {
  beforeEach(() => {
    rootModel.snackbarModel = require('../../../src/store/models/snackbarModel').snackbarModel;
    initialSnackbarState = require('../../../src/store/models/snackbarModel').snackbarModel.state;
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('reducers', () => {
    it('setMessage should update message state', () => {
      const result: SnackbarState = rootModel.snackbarModel.reducers.setMessage(
        initialSnackbarState,
        'Test'
      );
      expect(result.message).toEqual('Test');
    });
  });

  describe('effects', () => {
    const dispatch: any = {
      snackbarModel: { setMessage: jest.fn() }
    };

    it('report should save the message in the state by calling the reducer', () => {
      rootModel.snackbarModel.effects(dispatch).report({ message: 'Test' });

      expect(dispatch.snackbarModel.setMessage).toHaveBeenCalled();
      expect(dispatch.snackbarModel.setMessage).toHaveBeenCalledWith('Test');
    });
    it('clear should remove the actual message stored', () => {
      rootModel.snackbarModel.effects(dispatch).clear();

      expect(dispatch.snackbarModel.setMessage).toHaveBeenCalled();
      expect(dispatch.snackbarModel.setMessage).toHaveBeenCalledWith(undefined);
    });
  });
});
