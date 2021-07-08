import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import * as reactRedux from 'react-redux';
import SignUp from '../../src/screens/login/SignUp';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigation } from '@react-navigation/native';

let mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      dangerouslyGetState: () => ({ routes: [] }),
      navigate: mockedNavigate,
      setOptions: () => {},
      reset: () => {}
    })
  };
});

const mockStore = configureStore([]);
let store = mockStore({});

describe('SignUp tests', () => {
  beforeEach(() => {
    mockedNavigate = jest.fn();
    jest.useFakeTimers();
    store = mockStore({});
    // @ts-ignore
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => ({
      screenModel: {
        fetch: jest.fn()
      }
    }));
  });

  it('should render just fine', async () => {
    const { toJSON } = render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should open webview on signup tapped', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const button = getByText('SIGN UP');
    fireEvent.press(button);
    const navigation = useNavigation();
    expect(navigation.navigate).toBeCalledWith('WEBVIEW', {
      uri: 'https://www.basic-fit.com/en-nl/subscription/club'
    });
  });
});
