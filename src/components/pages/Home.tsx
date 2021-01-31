import React, {FC, useRef} from 'react';

import CommunitySection from '../UI/organisms/CommunitySection';
import ContactSection from '../UI/organisms/ContactSection';
import Footer from '../UI/molecules/Footer';
import Header from '../UI/molecules/Header';
import HeroSection from '../UI/organisms/HeroSection';
import PoweredBySection from '../UI/organisms/PoweredBySection';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {ScrollView} from 'react-native';
import StorySection from '../UI/organisms/StorySection';
import WorkSection from '../UI/organisms/WorkSection';
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
