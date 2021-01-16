import React, {FC} from 'react';
import styled, {css} from 'styled-components/native';

import Button from '../../shared/Button';
import {IMG_SYMBOL} from '../../../utils/Icons';
import {fbt} from 'fbt';
import {useTheme} from '../../../providers/ThemeProvider';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 380px;
  align-self: stretch;
  margin-top: 10px;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin: 0;
    `}
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  padding: 0 24px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      align-items: flex-start;
      padding: 0 80px;
    `}
`;

const Title = styled.Text`
  font-size: 30px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: futura;
  font-weight: 300;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 42px;
      max-width: 53%;
      text-align: flex-start;
    `}
`;

const Description = styled.Text`
  margin-top: 12px;
  font-size: 16px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: avenir;
  font-weight: 300;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 20px;
      max-width: 50%;
      text-align: flex-start;
    `}
`;

type Props = {};

const HeroSection: FC<Props> = () => {
  const {theme, colors} = useTheme();

  return (
    <Container>
      <BackgroundImage
        source={{uri: IMG_SYMBOL}}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.7,
        }}>
        <Title>
          <fbt desc="hero title">Flexible innovation starts with dooboolab</fbt>
        </Title>
        <Description>
          <fbt desc="hero desription">
            We manage strong open source community for individuals, companies,
            and group of societies.
          </fbt>
        </Description>
        <Button
          activeOpacity={0.7}
          style={{
            marginTop: 36,
          }}
          styles={{
            container: {
              backgroundColor: colors.success,
              paddingHorizontal: 40,
              borderRadius: 20,
              height: 40,
            },
            text: {
              color: theme.text,
              fontFamily: 'avenir',
              fontSize: 16,
            },
            hovered: {
              backgroundColor: colors.darkGray,
            },
          }}
          text={fbt('Contact Us', 'contact us')}
        />
      </BackgroundImage>
    </Container>
  );
};

export default HeroSection;
