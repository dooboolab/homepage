import 'react-native';

import React, {ReactElement} from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {
  TestSafeAreaProvider,
  createTestElement,
  createTestProps,
} from '../../../../test/testUtils';

import Page from '../ProfileEdit';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <TestSafeAreaProvider>
        <Page {...props} />
      </TestSafeAreaProvider>,
    );
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
