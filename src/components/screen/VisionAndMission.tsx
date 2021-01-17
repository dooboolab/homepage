import React, {FC} from 'react';

import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

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

type Props = {
  navigation: RootStackNavigationProps<'VisionAndMission'>;
};

const VisionAndMission: FC<Props> = () => {
  return (
    <Container>
      <StyledText>VisionAndMission</StyledText>
    </Container>
  );
};

export default withScreen(VisionAndMission);
