import 'styled-components';

import type {Theme as CustomTheme} from './utils/theme';
import {DoobooTheme} from 'dooboo-ui';

type CompositeTheme = DoobooTheme & CustomTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends CompositeTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
