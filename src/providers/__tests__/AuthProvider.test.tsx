import * as React from 'react';

import {AuthProvider, useAuthContext} from '../AuthProvider';
import {Button, View} from 'react-native';
import {RenderAPI, act, fireEvent, render} from '@testing-library/react-native';

const FakeChild = (): React.ReactElement => {
  const {setUser} = useAuthContext();

  return (
    <View>
      <Button
        testID="BUTTON"
        onPress={(): void =>
          // @ts-ignore
          setUser({
            displayName: 'displayName',
          })
        }
        title="Button"
      />
    </View>
  );
};

describe('Rendering', () => {
  const component = (
    <AuthProvider>
      <FakeChild />
    </AuthProvider>
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
      <AuthProvider>
        <FakeChild />
      </AuthProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
  });
});
