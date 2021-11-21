import {ThemeProvider, ThemeType} from 'dooboo-ui';
import {dark, light} from '../utils/theme';

import {AuthProvider} from '../providers/AuthProvider';
import React from 'react';
import {useColorScheme} from 'react-native';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({children}: Props): React.ReactElement => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
      customTheme={{
        light,
        dark,
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
