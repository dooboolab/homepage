import 'react-native';

import React, {ReactElement} from 'react';

import RootProvider from '../src/providers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeType} from '../src/utils/theme';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <RootProvider initialThemeType={themeType || ThemeType.LIGHT}>
    {child}
  </RootProvider>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...obj,
});

export const TestSafeAreaProvider = ({children}): ReactElement => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}>
      {children}
    </SafeAreaProvider>
  );
};
