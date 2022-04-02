import {ThemeProvider, ThemeType} from './ThemeProvider';
import {dark, light} from '../utils/theme';

import {AuthProvider} from '../providers/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider
        initialThemeType={
          colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
        }
        customTheme={{
          light,
          dark,
        }}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
