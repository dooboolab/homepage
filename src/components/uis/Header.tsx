import type {FC, ReactElement, RefObject} from 'react';
import {IC_DOOBOOLAB, IC_DOOBOOLAB_DARK, IC_GUEST} from '../../utils/Icons';
import {Image, Platform, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ThemeType, useTheme} from '../../providers/ThemeProvider';
import styled, {css} from 'styled-components/native';

import {Button} from './Button';
import Hoverable from '../../utils/Hoverable';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import ToggleSwitch from 'toggle-switch-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fbt} from 'fbt';
import firebase from 'firebase/app';
import {useAuthContext} from '../../providers/AuthProvider';
import {useNavigation} from '@react-navigation/native';

//eslint-disable-next-line
fbt;

const Container = styled.View`
  align-self: stretch;
  padding: 0 24px;
  background-color: ${({theme}) => theme.background};

  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}
`;

const LogoTouch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 124px;
  height: 52px;
  margin: 12px 0;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    //! Adhoc: Putting `css` underneath cause typing errors
    //!        which happens in `Image` tag.
    `
      width: 112px;
      height: 48px;
      align-self: stretch;
    `}
`;

const LinkWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin-right: 140px;
      margin-bottom: 0px;
    `}
`;

const LinkTouch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.Text`
  font-size: 18px;
  padding: 0 28px;
  color: ${({theme}) => theme.accent};
`;

const SignOutWrapper = styled.View`
  position: absolute;
  left: 20px;
  top: 22px;
  width: 80px;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      left: undfined;
      right: 64px;
      top: 20px;
    `}
`;

const SwitchWrapper = styled.View`
  position: absolute;
  right: 20px;
  top: 25px;
`;

type LinkProps = {
  onPress?: () => void;
  text: string;
};

const Link: FC<LinkProps> = ({onPress, text}): ReactElement => {
  const {theme} = useTheme();

  return (
    <Hoverable>
      {(isHovered) => (
        <LinkTouch style={{padding: 12}} activeOpacity={0.7} onPress={onPress}>
          <LinkText
            style={
              isHovered && {
                color: theme.heading,
                textDecorationLine: 'underline',
              }
            }>
            {text}
          </LinkText>
        </LinkTouch>
      )}
    </Hoverable>
  );
};

type Props = {
  scrollRef?: RefObject<ScrollView>;
  hideMenus?: boolean;
};

const Header: FC<Props> = ({scrollRef, hideMenus}) => {
  const navigation = useNavigation<RootStackNavigationProps<'Home'>>();
  const {theme, changeThemeType, themeType, media} = useTheme();
  const [switchOn, setSwitchOn] = useState(themeType === ThemeType.DARK);

  const {
    state: {user},
  } = useAuthContext();

  return (
    <Container>
      <Hoverable>
        {(isHovered) => (
          <LogoTouch
            style={{alignSelf: 'center'}}
            onPress={() =>
              hideMenus
                ? navigation.navigate('Home')
                : scrollRef?.current?.scrollTo({y: 0})
            }>
            <Logo
              style={[
                isHovered && {
                  shadowColor: theme.primary,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.24,
                  shadowRadius: 16,
                },
              ]}
              source={
                themeType === ThemeType.LIGHT ? IC_DOOBOOLAB : IC_DOOBOOLAB_DARK
              }
            />
          </LogoTouch>
        )}
      </Hoverable>
      <LinkWrapper>
        {user && (
          <>
            <Link
              text={fbt('Todo', 'todo')}
              onPress={() => {
                navigation.navigate('Todo');
              }}
            />
          </>
        )}
        {!user && !hideMenus && (
          <>
            <Link
              text={fbt('Story', 'story')}
              onPress={() => {
                scrollRef?.current?.scrollTo({y: 400});
              }}
            />
            <Link
              text={fbt('Work', 'work')}
              onPress={() => {
                scrollRef?.current?.scrollTo({y: 1720});
              }}
            />
            <Link
              text={fbt('Contact', 'contact')}
              onPress={() => {
                scrollRef?.current?.scrollTo({y: 2420});
              }}
            />
          </>
        )}
      </LinkWrapper>
      <SignOutWrapper>
        {user ? (
          <Hoverable>
            {(isHovered) => (
              <TouchableOpacity
                style={{marginHorizontal: 10, marginTop: 4}}
                onPress={() => {
                  navigation.navigate('ProfileEdit');
                }}>
                <Image
                  style={{
                    opacity: isHovered ? 0.7 : 1,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                  }}
                  source={
                    user.photoURL
                      ? {
                          uri: user.photoURL,
                        }
                      : IC_GUEST
                  }
                />
              </TouchableOpacity>
            )}
          </Hoverable>
        ) : (
          <Button
            onPress={() => navigation.navigate('SignIn')}
            text={fbt('Sign In', 'sign in')}
            styles={{
              container: {
                borderRadius: 20,
                backgroundColor: theme.background,
                borderWidth: 1,
                borderColor: theme.accent,
                width: 68,
              },
              text: {
                fontSize: 11,
                paddingHorizontal: 0,
                color: theme.accent,
                paddingBottom: Platform.select({
                  ios: 0,
                  android: 0,
                  default: 2,
                }),
              },
            }}
          />
        )}
      </SignOutWrapper>
      <SwitchWrapper>
        <ToggleSwitch
          isOn={switchOn}
          onToggle={(val: boolean) => {
            setSwitchOn(val);
            changeThemeType();
          }}
          onColor={theme.textContrast}
        />
      </SwitchWrapper>
    </Container>
  );
};

export default Header;
