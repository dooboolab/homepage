import {Description, SubTitle} from '../../ui/Text';
import {IMG_GRAPHQL_SEOUL, IMG_RN_SEOUL} from '../../../utils/Icons';
import React, {FC, ReactElement} from 'react';
import styled, {css} from 'styled-components/native';

import Button from '../../shared/Button';
import {Linking} from 'react-native';
import {fbt} from 'fbt';
import {useTheme} from '../../../providers/ThemeProvider';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  align-self: stretch;
  padding: 80px 0;
  background-color: ${({theme}): string => theme.paper};

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin: 0;
    `}
`;

const CommunityWrapper = styled.View`
  padding: 36px 80px;

  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Community = styled.View`
  padding: 0 12px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const CommunityBackground = styled.ImageBackground`
  width: 280px;
  height: 280px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      align-items: flex-start;
    `}
`;

type Props = {};

const StorySection: FC<Props> = () => {
  const {theme, colors} = useTheme();

  const renderViewMoreButton = (
    text: string,
    onPress?: () => void,
  ): ReactElement => {
    return (
      <Button
        onPress={onPress}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 40,
        }}
        styles={{
          container: {
            borderColor: colors.success,
            borderWidth: 2,
            paddingHorizontal: 20,
            borderRadius: 12,
            height: 24,
          },
          text: {
            color: colors.success,
            fontFamily: 'avenir',
            fontSize: 10,
          },
          hovered: {
            backgroundColor: colors.darkGray,
          },
        }}
        text={text}
      />
    );
  };

  return (
    <Container>
      <SubTitle style={{color: theme.primary}}>
        <fbt desc="community">Community</fbt>
      </SubTitle>
      <Description style={{marginTop: 36}}>
        <fbt desc="community desc">
          Here are communities we are driving to collaborate with great people
          outside the company.
        </fbt>
      </Description>
      <CommunityWrapper>
        <Community>
          <CommunityBackground source={IMG_RN_SEOUL} resizeMode="contain">
            {renderViewMoreButton(fbt('View more', 'view more'), () => {
              Linking.openURL(
                'https://github.com/react-native-seoul/community-resource',
              );
            })}
          </CommunityBackground>
        </Community>
        <Community>
          <CommunityBackground source={IMG_GRAPHQL_SEOUL} resizeMode="contain">
            {renderViewMoreButton(fbt('View more', 'view more'), () => {
              Linking.openURL('https://medium.com/graphql-seoul');
            })}
          </CommunityBackground>
        </Community>
      </CommunityWrapper>
    </Container>
  );
};

export default StorySection;
