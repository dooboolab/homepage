import {Button, useTheme} from 'dooboo-ui';
import {Description, SubTitle, Title} from '../uis/Typography';
import React, {FC} from 'react';
import styled, {css} from 'styled-components/native';

import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import {useNavigation} from '@react-navigation/native';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  align-self: stretch;
  padding: 80px 0;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin: 0;
    `}
`;

type Props = {};

const StorySection: FC<Props> = () => {
  const {theme, colors} = useTheme();
  const navigation = useNavigation<RootStackNavigationProps<'CodeOfConduct'>>();

  return (
    <Container>
      <Title>
        <fbt desc="story">Story</fbt>
      </Title>
      <Description style={{marginTop: 40}}>
        <fbt desc="story desc">
          We aim to find the IT services that the world needs. The goal is to
          consistently find and commercialize ideas that have the potential to
          change the market.
        </fbt>
      </Description>
      <SubTitle
        style={{
          marginTop: 68,
          color: theme.primary,
        }}
      >
        <fbt desc="vision and mission">Vision & Mission</fbt>
      </SubTitle>
      <Description style={{marginTop: 40}}>
        <fbt desc="story desc">
          dooboolab wishes to help out those who are in trouble of making better
          society. We are a group of experts who contribute to various platforms
          and open source projects to work publicly for creating benefits.
        </fbt>
      </Description>
      <Button
        style={{marginTop: 28}}
        styles={{
          container: {
            backgroundColor: theme.background,
          },
          text: {
            color: colors.success,
            fontSize: theme.isDesktop ? 18 : 14,
          },
        }}
        onPress={() => navigation.navigate('VisionAndMission')}
        text={fbt('view more >', 'view more')}
      />
    </Container>
  );
};

export default StorySection;
