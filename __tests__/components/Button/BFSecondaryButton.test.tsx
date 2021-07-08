import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { BFSecondaryButton } from '../../../src/components/Button';

describe('BFSecondaryButton', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<BFSecondaryButton title="Button" />);

    const textElement = getByText('Button');

    expect(textElement).not.toBeNull();
  });

  it('click on it triggers onPress func', async () => {
    const onPressFn = jest.fn();
    const { getByText } = render(<BFSecondaryButton title="Button" onPress={onPressFn} />);

    const textElement = getByText('Button');
    fireEvent.press(textElement);

    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(1);
  });

  it('snapshot', async () => {
    const { toJSON } = render(<BFSecondaryButton title="Button" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
