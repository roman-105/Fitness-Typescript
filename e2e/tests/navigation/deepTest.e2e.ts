import { by, expect, element, device } from 'detox';

describe('should open deeplinks', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('open deeplinks to other screens', async () => {
    await device.openURL({ url: 'bfa://tests' });
    await expect(element(by.id('tests'))).toExist();
  });
  it('open deeplinks to webviews', async () => {
    await device.openURL({ url: 'bfa://my.basic-fit.com/membership' });
    await expect(element(by.id('webview'))).toExist();
  });
});
