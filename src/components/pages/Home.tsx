import React, {FC, useRef} from 'react';

import CommunitySection from '../templates/CommunitySection';
import ContactSection from '../templates/ContactSection';
import Footer from '../uis/Footer';
import Header from '../uis/Header';
import HeroSection from '../templates/HeroSection';
import PoweredBySection from '../templates/PoweredBySection';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {ScrollView} from 'react-native';
import StorySection from '../templates/StorySection';
import WorkSection from '../templates/WorkSection';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation<RootStackNavigationProps<'Home'>>();

  navigation.setOptions({
    title: 'dooboolab',
  });

  return (
    <Container>
      <Header scrollRef={scrollRef} />
      <ScrollView ref={scrollRef} style={{width: '100%'}}>
        <HeroSection
          onPressContactUs={() => {
            scrollRef?.current?.scrollTo({y: 2440});
          }}
          onPressSponsor={() => navigation.navigate('Sponsor')}
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
