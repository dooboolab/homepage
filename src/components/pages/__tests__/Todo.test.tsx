import 'react-native';

import React, {ReactElement} from 'react';
import {RenderAPI, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Page from '../Todo';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

jest.mock('@react-navigation/native', () => {
  return {
    // @ts-ignore
    ...jest.requireActual('@react-navigation/native'),
    createNavigatorFactory: jest.fn(),
    useNavigation: (): Record<string, unknown> => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps({
      navigation: {
        setOptions: jest.fn(),
      },
    });

    component = createTestElement(<Page {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps({
      navigation: {
        setOptions: jest.fn(),
      },
    });

    component = createTestElement(<Page {...props} />);
    testingLib = render(component);
  });

  it('should simulate onClick', () => {
    expect(testingLib.toJSON()).toMatchSnapshot();
    // const btn = testingLib.queryByTestId('btn');
    // act(() => {
    //   fireEvent.press(btn);
    //   fireEvent.press(btn);
    // });
    // expect(cnt).toBe(3);
  });
});
