import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import Router from '../../../src/router/Router';
import MainTabNavigator from '../../../src/router/MainTabNavigator';
import configureStore from 'redux-mock-store';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      dangerouslyGetState: () => ({ routes: [] }),
      dangerouslyGetParent: () => {},
      navigate: () => {},
      setOptions: () => {},
      reset: () => {}
    })
  };
});

jest.mock('@react-native-community/netinfo', () => {});

jest.mock('react-native-static-safe-area-insets', () => {
  const actualInsets = jest.requireActual('react-native-static-safe-area-insets');
  return {
    ...actualInsets,
    StaticSafeAreaInsets: () => ({
      safeAreaInsetsBottom: () => {},
      safeAreaInsetsTop: () => {}
    })
  };
});

jest.mock('react-native-share', () => {});

const mockStore = configureStore([]);

describe('BottomNavigation', () => {
  const initialStore = {
    screenModel: { screens: {} },
    appModel: { ui: {}, walkThrough: {} },
    authModel: {},
    memberModel: { member: {} }
  };
  let store = mockStore(initialStore);

  beforeEach(() => {
    jest.useFakeTimers();
    store = mockStore(initialStore);
    // @ts-ignore
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => ({
      appModel: {
        checkIfWalkThroughIsDone: jest.fn()
      },
      screenModel: {
        fetch: jest.fn()
      },
      authModel: {
        refreshAuthedAxios: jest.fn()
      },
      memberModel: {
        getMemberInfo: jest.fn()
      },
      modalModel: {
        setInfo: jest.fn()
      }
    }));
  });

  it('renders the correct element', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    );

    const textElement1 = getByText('Home');
    const textElement2 = getByText('Explore');
    const textElement3 = getByText('Progress');
    const textElement4 = getByText('Coach');
    const textElement5 = getByText('Clubs');

    await act(async () => {
      expect(textElement1).not.toBeNull();
      expect(textElement2).not.toBeNull();
      expect(textElement3).not.toBeNull();
      expect(textElement4).not.toBeNull();
      expect(textElement5).not.toBeNull();
    });
  });

  it('renders the content in the right order', async () => {
    const { toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <MainTabNavigator
            Home={() => <Text>mock1</Text>}
            Programs={() => <Text>mock2</Text>}
            Progress={() => <Text>mock3</Text>}
            Coach={() => <Text>mock4</Text>}
            Club={() => <Text>mock5</Text>}
          />
        </NavigationContainer>
      </Provider>
    );

    await act(async () => expect(toJSON()).toMatchSnapshot());
  });

  it('different color if the item is the active page', async () => {
    const { toJSON, getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <MainTabNavigator
            Home={() => <Text>mock1</Text>}
            Programs={() => <Text>mock2</Text>}
            Progress={() => <Text>mock3</Text>}
            Coach={() => <Text>mock4</Text>}
            Club={() => <Text>mock5</Text>}
          />
        </NavigationContainer>
      </Provider>
    );

    const secondTab = getByText('Explore');
    await act(async () => {
      await fireEvent.press(secondTab);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
