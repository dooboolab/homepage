import {Appearance, Platform} from 'react-native';
import {
  DefaultTheme,
  ThemeProvider as OriginalThemeProvider,
} from 'styled-components/native';
import React, {ReactElement, useState} from 'react';
import {ThemeType, dark, light} from '../utils/theme';

import createCtx from '../utils/createCtx';
import {useMediaQuery} from 'react-responsive';

interface Context {
  themeType: ThemeType;
  theme: DefaultTheme;
  changeThemeType: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: ReactElement;
  initialThemeType?: ThemeType;
}

function ThemeProvider({children, initialThemeType}: Props): ReactElement {
  const isMobile = useMediaQuery({maxWidth: 767});
  const isTablet = useMediaQuery({minWidth: 767, maxWidth: 992});
  const isDesktop = useMediaQuery({minWidth: 992});

  const colorScheme = Appearance.getColorScheme();

  const isDarkMode = Platform.select({
    // web: window.matchMedia('(prefers-color-scheme: dark)').matches,
    default: colorScheme === 'dark',
  });

  const defaultThemeType = isDarkMode ? ThemeType.DARK : ThemeType.LIGHT;

  const [themeType, setThemeType] = useState(
    initialThemeType || defaultThemeType,
  );

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    setThemeType(newThemeType);
  };

  const defaultTheme = themeType === ThemeType.DARK ? dark : light;

  const media = {
    isMobile,
    isTablet,
    isDesktop,
  };

  const theme: DefaultTheme = {...defaultTheme, ...media};

  return (
    <Provider
      value={{
        themeType,
        changeThemeType,
        theme: defaultTheme,
      }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>
  );
}

export {useCtx as useTheme, ThemeProvider, ThemeType};
