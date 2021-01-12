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

export const defaultThemeType: ThemeType = ThemeType.LIGHT;

interface Props {
  children?: ReactElement;
  initialThemeType?: ThemeType;
}

function ThemeProvider({
  children,
  initialThemeType = defaultThemeType,
}: Props): ReactElement {
  const isMobile = useMediaQuery({maxWidth: 767});
  const isTablet = useMediaQuery({minWidth: 767, maxWidth: 992});
  const isDesktop = useMediaQuery({minWidth: 992});

  const [themeType, setThemeType] = useState(initialThemeType);

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    setThemeType(newThemeType);
  };

  let theme: DefaultTheme = themeType === ThemeType.DARK ? dark : light;

  const media = {
    isMobile,
    isTablet,
    isDesktop,
  };

  return (
    <Provider
      value={{
        themeType,
        changeThemeType,
        theme,
      }}>
      <OriginalThemeProvider theme={{...theme, ...media}}>
        {children}
      </OriginalThemeProvider>
    </Provider>
  );
}

export {useCtx as useTheme, ThemeProvider, ThemeType};
