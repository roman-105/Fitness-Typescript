import { by, expect, element } from 'detox';
import Assertions from '../../utils/assertions';
import { Routes } from '../../../src/router/routes';
import { doLoginRoutine } from '../../utils/loginRoutine';

describe('Should do basic navigation', () => {
  beforeAll(async () => {
    await doLoginRoutine();
  });

  // throws signal 11 and crashes :(
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should go to For You tab from Home screen', async () => {
    await element(by.id('home-tab')).tap();
    await element(by.id('for-you-tab')).tap();
    await expect(element(by.id('for-you'))).toExist();
  });

  it('should go to Feed tab from Home screen', async () => {
    await element(by.id('home-tab')).tap();
    await element(by.id('feed-tab')).tap();
    await expect(element(by.id('feed'))).toExist();
  });

  it('should be able to navigate through header from Home screen', async () => {
    await element(by.id('home-tab')).tap();

    //check that top navigation displays the right options
    await Assertions.assertHeaderComposition(Routes.Home, ['profile', 'card', 'notifications']);

    //on tap profile icon check that user is redirected to the profile screen
    await element(by.id(`${Routes.Home}-header-icon-profile`)).tap();
    await expect(element(by.id('profile'))).toExist();
    await element(by.id('header-back-button')).tap();

    //on tap card icon check that user is redirected to the QR screen
    await element(by.id(`${Routes.Home}-header-icon-card`)).tap();
    await expect(element(by.id('qrscreen'))).toExist();
    await element(by.id('header-back-button')).tap();

    //on tap notification icon check that user is redirected to the notification screen
    await element(by.id(`${Routes.Home}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).tap();
  });

  it('should be able to navigate through header from Explore screen', async () => {
    await element(by.id('programs-tab')).tap();
    await expect(element(by.id('programs'))).toExist();
    await Assertions.assertHeaderComposition(Routes.Programs, [
      'profile',
      'search',
      'notifications'
    ]);
    await element(by.id(`${Routes.Programs}-header-icon-profile`)).tap();
    await expect(element(by.id('profile'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Programs}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Programs}-header-icon-search`)).tap();
    await expect(element(by.id('search'))).toExist();
    await element(by.id('header-back-button')).tap();
  });

  it('should be able to navigate through header from Progress screen', async () => {
    await element(by.id('progress-tab')).tap();
    await expect(element(by.id('progress'))).toExist();
    await Assertions.assertHeaderComposition(Routes.Progress, [
      'profile',
      'search',
      'notifications'
    ]);
    await element(by.id(`${Routes.Progress}-header-icon-profile`)).tap();
    await expect(element(by.id('profile'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Progress}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Progress}-header-icon-search`)).tap();
    await expect(element(by.id('search'))).toExist();
    await element(by.id('header-back-button')).tap();
  });

  it('should be able to navigate through header from Coach screen', async () => {
    await element(by.id('coach-tab')).tap();
    await expect(element(by.id('coach'))).toExist();
    await Assertions.assertHeaderComposition(Routes.Coach, ['profile', 'search', 'notifications']);

    await element(by.id(`${Routes.Coach}-header-icon-profile`)).tap();
    await expect(element(by.id('profile'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Coach}-header-icon-search`)).tap();
    await expect(element(by.id('search'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Coach}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).tap();
  });

  it('should be able to navigate through header from Club screen', async () => {
    await element(by.id('club-tab')).tap();
    await expect(element(by.id('club'))).toExist();

    // Top-header
    await Assertions.assertHeaderComposition(Routes.Club, ['profile', 'card', 'notifications']);
    await element(by.id(`${Routes.Club}-header-icon-profile`)).tap();
    await expect(element(by.id('profile'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Club}-header-icon-card`)).tap();
    await expect(element(by.id('qrscreen'))).toExist();
    await element(by.id('header-back-button')).tap();

    await element(by.id(`${Routes.Club}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).tap();
  });

  it('should be able to navigate through header from Profile screen', async () => {
    await element(by.id('home-tab')).tap();
    await element(by.id(`${Routes.Home}-header-icon-profile`)).tap();

    // assert
    await expect(element(by.id('profile'))).toExist();
    // Top-header
    await Assertions.assertHeaderComposition(Routes.Profile, ['settings', 'notifications']);

    await element(by.id(`${Routes.Profile}-header-icon-settings`)).tap();
    await expect(element(by.id('settings'))).toExist();
    await element(by.id('header-back-button')).atIndex(1).tap();

    await element(by.id(`${Routes.Profile}-header-icon-notifications`)).tap();
    await expect(element(by.id('notifications'))).toExist();
    await element(by.id('header-back-button')).atIndex(1).tap();
    await element(by.id('header-back-button')).tap();
  });
});
