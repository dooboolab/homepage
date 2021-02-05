import {Button, ThemeType, useTheme} from 'dooboo-ui';
import {Description, SubDescription, Title} from '../UI/Typography';
import {
  IC_DOOBOO_UI,
  IC_DOOBOO_UI_DARK,
  IC_HACKATALK,
  IC_HACKATALK_DARK,
  IC_WECOUNT,
} from '../../utils/Icons';
import {Linking, Platform, View} from 'react-native';
import React, {FC, ReactElement} from 'react';
import styled, {css} from 'styled-components/native';

import {fbt} from 'fbt';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  align-self: stretch;
  padding: 80px 0;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectWrapper = styled.View`
  margin-top: 40px;
  min-height: 360px;
  width: 80%;

  flex-direction: column;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex-direction: row;
    `}
`;

const ProjectContainer = styled.View`
  flex: 1;
  align-self: stretch;
  min-height: 200px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.paper};
  margin: 10px 20px;
  padding: 28px 0;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      min-height: 300px;
    `}
`;

const ProjectImage = styled.Image`
  width: 120px;
  height: 30px;
`;

type ProjectProps = {
  image: ReactElement;
  description: string;
  onViewMore?: () => void;
};

const Project: FC<ProjectProps> = ({image, description, onViewMore}) => {
  const {colors, theme} = useTheme();

  const renderViewMoreButton = (
    text: string,
    onPress?: () => void,
  ): ReactElement => {
    return (
      <Button
        onPress={onPress}
        style={{alignSelf: 'center'}}
        styles={{
          container: {
            backgroundColor: theme.paper,
            borderColor: colors.success,
            borderWidth: 2,
            paddingHorizontal: 20,
            borderRadius: 12,
            height: 26,

            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            paddingVertical: 0,
            color: colors.success,
            fontFamily: 'avenir',
            fontSize: 10,
            textAlign: 'center',
            alignSelf: 'center',
            paddingBottom: Platform.select({
              web: 0,
              default: 12,
            }),
          },
          hovered: {
            backgroundColor: theme.background,
          },
        }}
        text={text}
      />
    );
  };

  return (
    <ProjectContainer>
      {image}
      <SubDescription>{description}</SubDescription>
      {(onViewMore &&
        renderViewMoreButton(fbt('View more', 'view more'), onViewMore)) || (
        <View />
      )}
    </ProjectContainer>
  );
};

type Props = {};

const WorkSection: FC<Props> = () => {
  const {themeType} = useTheme();

  return (
    <Container>
      <Title>
        <fbt desc="work">Work</fbt>
      </Title>
      <Description style={{marginTop: 40}}>
        <fbt desc="work desc">
          Below are what we are currently working on. We wish to get together
          with many other great people around the world.
        </fbt>
      </Description>
      <ProjectWrapper>
        <Project
          image={
            <ProjectImage
              style={{
                width: 40,
                height: 40,
              }}
              source={IC_WECOUNT}
              resizeMode="cover"
            />
          }
          description="Comming Soon!"
          // onViewMore={() => Alert.alert('Comming Soon!')}
        />
        <Project
          image={
            <ProjectImage
              source={
                themeType === ThemeType.LIGHT ? IC_DOOBOO_UI : IC_DOOBOO_UI_DARK
              }
              resizeMode="cover"
            />
          }
          description={fbt(
            'Universal react-native UI frameworks that work on iOS, android and web.',
            'dooboo-ui desc',
          )}
          onViewMore={() =>
            Linking.openURL('https://github.com/dooboolab/dooboo-ui')
          }
        />
        <Project
          image={
            <ProjectImage
              source={
                themeType === ThemeType.LIGHT ? IC_HACKATALK : IC_HACKATALK_DARK
              }
              resizeMode="cover"
            />
          }
          description={fbt(
            // eslint-disable-next-line max-len
            'It is an open source chat app built with Expo. It has been developed to share the development stack with many developers around the world.',
            'hackatalk desc',
          )}
          onViewMore={() =>
            Linking.openURL('https://github.com/dooboolab/hackatalk')
          }
        />
      </ProjectWrapper>
    </Container>
  );
};

export default WorkSection;
