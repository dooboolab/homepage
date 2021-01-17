import React, {FC} from 'react';
import styled, {css} from 'styled-components/native';

import Button from '../../shared/Button';
import {fbt} from 'fbt';
import {useTheme} from '../../../providers/ThemeProvider';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 448px;
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

const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: futura;
  font-weight: 700;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 40px;
    `}
`;

const SubTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: futura;
  font-weight: 700;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 28px;
    `}
`;

const Description = styled.Text`
  margin-top: 40px;
  font-size: 18px;
  line-height: 165%;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: avenir;
  font-weight: 300;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 20px;
    `}
`;

type Props = {};

const StorySection: FC<Props> = () => {
  const {theme, colors} = useTheme();

  return (
    <Container>
      <Title>
        <fbt desc="story">Story</fbt>
      </Title>
      <Description>
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
        }}>
        <fbt desc="vision and mission">Vision & mission</fbt>
      </SubTitle>
      <Description>
        <fbt desc="story desc">
          dooboolab wishes to help out those who are in trouble of making better
          society. We are a group of experts who contribute to various platforms
          and open source projects to work publicly for creating benefits.
        </fbt>
      </Description>
      <Button
        style={{marginTop: 28}}
        styles={{
          text: {
            color: colors.success,
            fontSize: 14,
          },
        }}
        text={fbt('view more >', 'view more')}
      />
    </Container>
  );
};

export default StorySection;
