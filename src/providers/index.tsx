import {ThemeProvider, ThemeType} from 'dooboo-ui';
import {dark, light} from '../utils/theme';

import {AppProvider} from './AppProvider';
import {AuthProvider} from '../providers/AuthProvider';
import React from 'react';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({children}: Props): React.ReactElement => {
  return (
    <ThemeProvider
      customTheme={{
        light,
        dark,
      }}>
      <AppProvider>
        <AuthProvider>{children}</AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
