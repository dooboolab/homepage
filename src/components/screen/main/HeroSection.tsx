import React, {FC} from 'react';

import styled from 'styled-components/native';
import {withScreen} from '../../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${({theme}): string => theme.text};
`;

type Props = {};

const HeroSection: FC<Props> = () => {
  return (
    <Container>
      <StyledText>HeroSection</StyledText>
    </Container>
  );
};

export default withScreen(HeroSection);
