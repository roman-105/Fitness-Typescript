import { by, expect, element } from 'detox';
import { doLoginRoutine } from '../../../utils/loginRoutine';

describe('should open deeplinks', () => {
  it('should login automatically', async () => {
    await doLoginRoutine();
    await expect(element(by.id('home-tab'))).toExist();
  });
});
