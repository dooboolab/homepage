import React, {FC, useRef} from 'react';

import CommunitySection from './Home/CommunitySection';
import ContactSection from './Home/ContactSection';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import HeroSection from './Home/HeroSection';
import PoweredBySection from './Home/PoweredBySection';
import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import {ScrollView} from 'react-native';
import StorySection from './Home/StorySection';
import WorkSection from './Home/WorkSection';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

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
      <ScrollView ref={scrollRef} style={{width: '100%'}}>
        <HeroSection
          onPressContactUs={() => {
            scrollRef?.current?.scrollTo({y: 2440});
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
