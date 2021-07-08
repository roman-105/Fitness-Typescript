import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Login from '../../src/screens/login/Login';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../src/router/routes';

let mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      dangerouslyGetState: () => ({ routes: [] }),
      navigate: mockNavigate,
      setOptions: () => {},
      reset: () => {}
    })
  };
});

const mockStore = configureStore([]);
let store = mockStore({});

describe('Login tests', () => {
  beforeEach(() => {
    mockNavigate = jest.fn();
    const mockedLogin = jest.fn();
    const mockedIsLoading = false;
    jest.useFakeTimers();
    store = mockStore({});
    // @ts-ignore
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => ({
      authModel: {
        Login: mockedLogin
      }
    }));
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => ({
      loading: {
        effects: {
          authModel: { Login: mockedIsLoading }
        }
      }
    }));
  });

  it('should render just fine', async () => {
    const { toJSON } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should have login button disabled', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const button = getByText('LOGIN');
    await fireEvent.press(button);
    const dispatch = reactRedux.useDispatch();
    expect(dispatch.authModel.Login).not.toBeCalled();
  });

  it('should have login button enabled', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const user = getByTestId('Username');
    const password = getByTestId('Password');
    const button = getByText('LOGIN');
    await fireEvent.changeText(user, 'mockeUser123');
    await fireEvent.changeText(password, 'mockuser123');
    await fireEvent.press(button);
    const dispatch = reactRedux.useDispatch();
    expect(dispatch.authModel.Login).toBeCalledWith({
      pass: 'mockuser123',
      user: 'mockeUser123'
    });
  });

  it('should go to signin page on sigin tapped', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const button = getByText('SIGN UP');
    await fireEvent.press(button);
    const navigation = useNavigation();
    expect(navigation.navigate).toBeCalledWith(Routes.SignUp);
  });

  it('should go to webview on forgot passw tapped', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const button = getByText('Forgot password');
    await fireEvent.press(button);
    const navigation = useNavigation();
    expect(navigation.navigate).toBeCalledWith('WEBVIEW', {
      uri: 'https://my.basic-fit.com/new-password-request',
      injectedJS: expect.any(String)
    });
  });
});
