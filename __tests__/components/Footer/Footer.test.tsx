// @ts-nocheck
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { FooterFromConfig } from '../../../src/components/Footer';

jest.mock('react-native-svg', () => {
  return { __esModule: true, SvgUri: () => <></> };
});

const footerConfigMock = [
  {
    label: 'Hello, Im a mock #1',
    type: 'External',
    link: 'google.com',
    icon: 'im a mock :)'
  },
  {
    label: 'Hello, Im a mock #2',
    type: 'Internal',
    link: 'QR',
    icon: 'im a mock :)'
  },
  {
    label: 'Hello, Im a mock #3',
    type: 'Internal',
    link: 'PROFILE',
    icon: 'im a mock :)'
  },
  {
    label: 'Hello, Im a mock #4',
    type: 'Internal',
    link: 'google.com',
    icon: 'im a mock :)'
  }
];

const InvalidfooterConfigMock = [
  {
    label: 'Hello, Im a mock #1',
    type: 'External',
    link: null,
    icon: 'im a mock :)'
  },
  {
    label: 'Hello, Im a mock #2',
    type: 'Internal',
    link: 'route non existant',
    icon: 'im a mock :)'
  }
];

describe('Footer', () => {
  it('renders the correct content', async () => {
    const { toJSON } = render(
      <FooterFromConfig
        config={footerConfigMock}
        navigation={{ navigate: jest.fn }}
        dispatch={{ snackbarModel: { report: jest.fn } }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('taps the right button / check internal external behaviour', async () => {
    const navigationFn = jest.fn();

    const { getByText } = render(
      <FooterFromConfig
        config={footerConfigMock}
        navigation={{ navigate: navigationFn }}
        dispatch={{ snackbarModel: { report: jest.fn } }}
      />
    );

    const externalLink = getByText('Hello, Im a mock #1');
    const internalLink1 = getByText('Hello, Im a mock #2');
    const internalLink2 = getByText('Hello, Im a mock #3');

    await fireEvent.press(externalLink);
    expect(navigationFn).toHaveBeenLastCalledWith(
      'WEBVIEW',
      expect.objectContaining({ deeplink: expect.stringContaining('google.com') })
    );
    await fireEvent.press(internalLink1);
    expect(navigationFn).toHaveBeenLastCalledWith('QR');
    await fireEvent.press(internalLink2);
    expect(navigationFn).toHaveBeenLastCalledWith('PROFILE');
  });

  it('taps the right button / reports errors', async () => {
    const dispatch = jest.fn();

    const { getByText } = render(
      <FooterFromConfig
        config={InvalidfooterConfigMock}
        navigation={{ navigate: jest.fn }}
        dispatch={{ snackbarModel: { report: dispatch } }}
      />
    );

    const externalLink = getByText('Hello, Im a mock #1');
    const internalLink1 = getByText('Hello, Im a mock #2');

    await fireEvent.press(externalLink);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({ message: expect.stringContaining('no link') })
    );
    await fireEvent.press(internalLink1);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({ message: expect.stringContaining('no screen') })
    );
  });

  it('dosent renders when no childrens are present', () => {
    const { toJSON } = render(
      <FooterFromConfig
        navigation={{ navigate: jest.fn }}
        dispatch={{ snackbarModel: { report: jest.fn } }}
      />
    );
    expect(toJSON()).toBeNull();
  });

  it('renders from a config and no more than 3 items', () => {
    const { queryByText } = render(
      <FooterFromConfig
        config={footerConfigMock}
        navigation={{ navigate: jest.fn }}
        dispatch={{ snackbarModel: { report: jest.fn } }}
      />
    );

    const additionalButton = queryByText('Hello, Im a mock #4');
    expect(additionalButton).toBeNull();
  });
});
