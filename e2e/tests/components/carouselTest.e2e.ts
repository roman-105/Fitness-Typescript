import { by, expect, element } from 'detox';
import { doLoginRoutine } from '../../utils/loginRoutine';

describe('Should scroll', () => {
  beforeAll(async () => {
    await doLoginRoutine();
  });

  it('should scroll carousel correctly', async () => {
    await element(by.id('home-tab')).tap();
    await element(by.id('for-you-tab')).tap();
    const carousel = element(by.id('first-carousel'));
    for (let i = 0; i < 5; i++) {
      await carousel.scroll(320, 'right');
    }
    // just check if the carousel didnt broke, so is still visible
    await expect(carousel).toBeVisible();
  });
});
