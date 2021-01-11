import {IC_DOOBOOLAB, IC_DOOBOOLAB_DARK} from '../../utils/Icons';
import React, {FC} from 'react';
import {ThemeType, useThemeContext} from '../../providers/ThemeProvider';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  padding: 0 24px;

  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 180px;
  height: 66.54px;
`;

const Header: FC = () => {
  const {themeType} = useThemeContext();

  return (
    <Container>
      <Logo
        source={
          themeType === ThemeType.LIGHT ? IC_DOOBOOLAB : IC_DOOBOOLAB_DARK
        }
      />
    </Container>
  );
};

export default Header;
