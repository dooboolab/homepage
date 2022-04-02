import React, {FC} from 'react';
import styled, {css} from 'styled-components/native';

import {Button} from '../uis/Button';
import {IMG_SYMBOL} from '../../utils/Icons';
import {View} from 'react-native';
import {fbt} from 'fbt';
import {useAuthContext} from '../../providers/AuthProvider';
import {useTheme} from '../../providers/ThemeProvider';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 380px;
  align-self: stretch;
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
  font-weight: 500;

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
      max-width: 53%;
      text-align: flex-start;
    `}
`;

type Props = {
  onPressContactUs?: () => void;
  onPressSponsor?: () => void;
};

const HeroSection: FC<Props> = ({onPressContactUs, onPressSponsor}) => {
  const {theme, colors} = useTheme();

  const {
    state: {user},
  } = useAuthContext();

  return (
    <Container>
      <BackgroundImage
        source={IMG_SYMBOL}
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            onPress={onPressContactUs}
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
            text={fbt('Contact us', 'contact us')}
          />
          {user ? (
            <Button
              onPress={onPressSponsor}
              activeOpacity={0.7}
              style={{
                marginTop: 36,
                marginLeft: 12,
              }}
              styles={{
                container: {
                  backgroundColor: theme.primary,
                  paddingHorizontal: 40,
                  borderRadius: 20,
                  height: 40,
                },
                text: {
                  color: theme.textContrast,
                  fontFamily: 'avenir',
                  fontSize: 16,
                },
                hovered: {
                  opacity: 0.7,
                },
              }}
              text={fbt('Sponsor us', 'sponsor us')}
            />
          ) : null}
        </View>
      </BackgroundImage>
    </Container>
  );
};

export default HeroSection;
