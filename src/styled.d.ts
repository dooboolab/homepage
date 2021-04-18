import '@emotion/react';
import type {Theme as CustomTheme} from './utils/theme';
import {DoobooTheme} from 'dooboo-ui';

type CompositeTheme = DoobooTheme & CustomTheme;

declare module '@emotion/react' {
  export interface Theme extends CompositeTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
