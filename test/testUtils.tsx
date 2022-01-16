import 'react-native';

import React, {ReactElement} from 'react';

import RootProvider from '../src/providers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeType} from '../src/utils/theme';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <SafeAreaProvider>
    <RootProvider initialThemeType={themeType}>{child}</RootProvider>
  </SafeAreaProvider>
);

export const createTestProps = (
  obj?: object,
  moreScreenProps?: object,
): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  screenProps: {
    changeThemeType: jest.fn(),
    ...moreScreenProps,
  },
  ...obj,
});
