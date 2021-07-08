import { by, element } from 'detox';

const e2eUser = 'gymtest2020+LU-Comfort@gmail.com';
const e2ePass = '2000And25';

export async function doLoginRoutine() {
  const userField = element(by.id('Username'));
  const passField = element(by.id('Password'));
  const loginBtn = element(by.id('LOGIN'));

  await userField.replaceText(e2eUser);
  await passField.replaceText(e2ePass);
  // we need 2 taps. one to dismiss the keyboard
  // and another to actually tap the button
  await loginBtn.tap();
  await loginBtn.tap();
}
