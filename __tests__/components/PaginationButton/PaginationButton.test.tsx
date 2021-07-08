import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaginationButton } from '../../../src/components/PaginationButton';

describe('PaginationButton', () => {
  it.skip('when it can show more renders correctly and click on it triggers onPress func', async () => {
    // Ripple not captured
    const onPressFn = jest.fn();
    const { getByText } = render(
      <PaginationButton hasMore={true} content="recipe" onPress={onPressFn} />
    );

    const textElement = getByText('Show more');
    fireEvent.press(textElement);

    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(1);
  });

  it('when it can not show more renders correctly and click on it not triggers onPress func', async () => {
    const onPressFn = jest.fn();
    const { getByText } = render(
      <PaginationButton hasMore={false} content="recipe" onPress={onPressFn} />
    );

    const textElement = getByText('There are no more recipe to show.');
    expect(textElement).not.toBeNull();
    expect(onPressFn).toHaveBeenCalledTimes(0);
  });
  it('dosent show when we hide it', async () => {
    const onPressFn = jest.fn();
    const { toJSON } = render(
      <PaginationButton hide hasMore={false} content="recipe" onPress={onPressFn} />
    );
    expect(toJSON()).toBeNull();
  });
  it('passes snapshot testing on hasmore true', async () => {
    const onPressFn = jest.fn();
    const { toJSON } = render(
      <PaginationButton hasMore={true} content="recipe" onPress={onPressFn} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('passes snapshot testing on hasmore false', async () => {
    const onPressFn = jest.fn();
    const { toJSON } = render(
      <PaginationButton hasMore={false} content="recipe" onPress={onPressFn} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
