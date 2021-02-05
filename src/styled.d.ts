import 'styled-components';
import type {Theme} from './utils/theme';
import type {DoobooTheme, Theme as DoobooTheme} from 'dooboo-ui';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme, DoobooTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
