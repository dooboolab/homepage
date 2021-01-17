import Header, {EmptyHeader} from './Header';
import React, {FC} from 'react';

import CommunitySection from './CommunitySection';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import {RootStackNavigationProps} from '../../navigation/RootStackNavigator';
import StorySection from './StorySection';
import WorkSection from './WorkSection';
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
      <EmptyHeader />
      <HeroSection />
      <StorySection />
      <CommunitySection />
      <WorkSection />
      <ContactSection />
      <Header />
    </Container>
  );
};

export default withScreen(Page);
