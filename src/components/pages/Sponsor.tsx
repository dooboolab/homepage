import React, {FC} from 'react';

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
  navigation: RootStackNavigationProps<'Sponsor'>;
};

const Sponsor: FC<Props> = () => {
  return (
    <Container>
      <Header hideMenus />
      <StyledText>Sponsor</StyledText>
    </Container>
  );
};

export default withScreen(Sponsor);
