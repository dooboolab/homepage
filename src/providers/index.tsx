import {ThemeProvider, ThemeType} from 'dooboo-ui';
import {dark, light} from '../utils/theme';

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
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
