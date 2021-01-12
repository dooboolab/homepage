import {IC_DOOBOOLAB, IC_DOOBOOLAB_DARK} from '../../utils/Icons';
import React, {FC} from 'react';
import {ThemeType, useTheme} from '../../providers/ThemeProvider';
import styled, {css} from 'styled-components/native';

import {useMedia} from '../../providers/MediaProvider';

const Container = styled.View<{isTablet: boolean}>`
  width: 100%;
  padding: 0 24px;

  flex-direction: row;
  align-items: center;

  ${({isTablet}) =>
    isTablet &&
    css`
      padding: 0 60px;
    `}
`;

const Logo = styled.Image`
  width: 180px;
  height: 66.54px;
`;

const Header: FC = () => {
  const {themeType} = useTheme();
  const {isTablet} = useMedia();

  return (
    <Container isTablet={isTablet}>
      <Logo
        source={
          themeType === ThemeType.LIGHT ? IC_DOOBOOLAB : IC_DOOBOOLAB_DARK
        }
      />
    </Container>
  );
};

export default Header;
