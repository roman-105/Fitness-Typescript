import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { BFButton } from '../../../src/components/Button';

describe('BFButton', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<BFButton title="Button" />);

    const textElement = getByText('Button');

    expect(textElement).not.toBeNull();
  });
  it('click on it triggers onPress func', async () => {
    const onPressFn = jest.fn();
    const { getByText } = render(<BFButton title="Button" onPress={onPressFn} />);

    const textElement = getByText('Button');
    fireEvent.press(textElement);

    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(1);
  });

  it('snapshot', async () => {
    const { toJSON } = render(<BFButton title="Button" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
