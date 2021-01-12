import * as React from 'react';

import {MediaProvider, useMedia} from '../MediaProvider';
import {RenderAPI, act, fireEvent, render} from '@testing-library/react-native';

import {View} from 'react-native';

const FakeChild = (): React.ReactElement => {
  return <View />;
};

describe('Rendering', () => {
  const component = (
    <MediaProvider>
      <FakeChild />
    </MediaProvider>
  );

  const testingLib: RenderAPI = render(component);

  it('component and snapshot matches', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interactions', () => {
  it('should setUser', async () => {
    const {getByTestId} = render(
      <MediaProvider>
        <FakeChild />
      </MediaProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
  });
});
