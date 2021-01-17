import React, {FC, useRef} from 'react';

import CommunitySection from './CommunitySection';
import ContactSection from './ContactSection';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';
import HeroSection from './HeroSection';
import PoweredBySection from './PoweredBySection';
import {RootStackNavigationProps} from '../../navigation/RootStackNavigator';
import {ScrollView} from 'react-native';
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
  navigation: RootStackNavigationProps<'Home'>;
};

const Page: FC<Props> = () => {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <Container>
      <Header scrollRef={scrollRef} />
      <ScrollView ref={scrollRef}>
        <HeroSection
          onPressContactUs={() => {
            scrollRef?.current?.scrollTo(2440);
          }}
        />
        <StorySection />
        <CommunitySection />
        <WorkSection />
        <ContactSection />
        <PoweredBySection />
        <Footer />
      </ScrollView>
    </Container>
  );
};

export default withScreen(Page);
