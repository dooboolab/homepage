import 'react-native';

import * as React from 'react';

import {RenderAPI, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Shared from '../ContactSection';

let props: any;
let component: React.ReactElement;
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
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
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
    testingLib = render(component);
  });

  it('should simulate onClick', () => {
    expect(testingLib.toJSON()).toMatchSnapshot();
    // const btn = testingLib.queryByTestId('btn');
    // act(() => {
    //   fireEvent.press(btn);
    // });
    // expect(cnt).toBe(3);
  });
});
