import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SlashedCard } from '../../../src/components/Card';
import { Text } from 'react-native';

describe('SlashedCard', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<SlashedCard children={<Text>Card content</Text>} />);

    const textElement = getByText('Card content');

    expect(textElement).not.toBeNull();
  });
  it('click on it triggers onPress func', async () => {
    const onPressFn = jest.fn();
    const { getByText } = render(
      <SlashedCard children={<Text>Card content</Text>} onPress={onPressFn} />
    );

    const textElement = getByText('Card content');
    fireEvent.press(textElement);

    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(1);
  });

  it('snapshot', async () => {
    const { toJSON } = render(<SlashedCard children={<Text>Card content</Text>} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
