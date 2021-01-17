import React, {FC} from 'react';

import Header from './Header';
import HeroSection from './HeroSection';
import {RootStackNavigationProps} from '../../navigation/RootStackNavigator';
import StorySection from './StorySection';
import styled from 'styled-components/native';
import {withScreen} from '../../../utils/wrapper';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

type Props = {
  navigation: RootStackNavigationProps<'Main'>;
};

const Page: FC<Props> = () => {
  return (
    <Container>
      <Header />
      <HeroSection />
      <StorySection />
    </Container>
  );
};

export default withScreen(Page);
