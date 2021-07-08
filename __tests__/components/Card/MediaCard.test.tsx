import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { MediaCard } from '../../../src/components/Card';

describe('MediaCard', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<MediaCard name="Media card" onPress={() => {}} />);

    const textElement = getByText('Media card');

    expect(textElement).not.toBeNull();
  });
  it('click on it triggers onPress func', async () => {
    const onPressFn = jest.fn();
    const { getByText } = render(<MediaCard name="Media card" onPress={onPressFn} />);

    const textElement = getByText('Media card');
    fireEvent.press(textElement);

    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(1);
  });

  it('snapshot', async () => {
    const { toJSON } = render(<MediaCard name="Media card" onPress={() => {}} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
