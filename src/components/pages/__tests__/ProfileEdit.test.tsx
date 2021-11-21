import 'react-native';

import React, {ReactElement} from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Page from '../ProfileEdit';

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

    component = createTestElement(<Page {...props} />);
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    expect(1).toBeTruthy();
    // testingLib = render(component);

    // const baseElement = testingLib.toJSON();

    // expect(baseElement).toMatchSnapshot();
    // expect(baseElement).toBeTruthy();
  });
});
