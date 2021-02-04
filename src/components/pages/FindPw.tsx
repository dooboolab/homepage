import React, {FC} from 'react';

import {EditText} from 'dooboo-ui';
import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StyledText = styled.Text`
  color: ${({theme}): string => theme.text};
`;

type Props = {
  navigation: RootStackNavigationProps<'FindPw'>;
};

const FindPw: FC<Props> = () => {
  return (
    <Container>
      <Header hideMenus />
      <StyledText>FindPw</StyledText>
    </Container>
  );
};

export default withScreen(FindPw);
