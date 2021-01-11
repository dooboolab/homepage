import React, {FC} from 'react';

import Header from '../shared/Header';
import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
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
  navigation: RootStackNavigationProps<'Main'>;
};

const Page: FC<Props> = () => {
  return (
    <Container>
      <Header />
      <StyledText>Main</StyledText>
    </Container>
  );
};

export default withScreen(Page);
