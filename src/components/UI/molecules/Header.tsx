import {Button, ThemeType, useTheme} from 'dooboo-ui';
import type {FC, ReactElement, RefObject} from 'react';
import {IC_DOOBOOLAB, IC_DOOBOOLAB_DARK} from '../../../utils/Icons';
import {Platform, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import styled, {css} from 'styled-components/native';

import Hoverable from '../../../utils/Hoverable';
import ToggleSwitch from 'toggle-switch-react-native';
import {fbt} from 'fbt';
import firebase from 'firebase';
import {useAuthContext} from '../../../providers/AuthProvider';
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
    css`
      width: 112px;
      height: 48px;
      align-self: stretch;
    `}
`;

const LinkWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;

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
  color: ${({theme}) => theme.text};
`;

const SignOutWrapper = styled.View`
  position: absolute;
  left: 20px;
  top: 25px;
  width: 80px;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      left: undfined;
      right: 80px;
      top: 25px;
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
        <LinkTouch
          style={{marginHorizontal: 10}}
          activeOpacity={0.7}
          onPress={onPress}>
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
  const navigation = useNavigation();
  const {theme, changeThemeType, themeType, media} = useTheme();
  const [switchOn, setSwitchOn] = useState(themeType === ThemeType.DARK);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

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
        {!hideMenus && (
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
          <Button
            loading={isSigningOut}
            onPress={async () => {
              setIsSigningOut(true);
              await firebase.auth().signOut();
              setIsSigningOut(false);
            }}
            text={fbt('Logout', 'logout')}
            indicatorColor={theme.accent}
            styles={{
              container: {
                borderRadius: 20,
                backgroundColor: theme.background,
                borderWidth: 1,
                borderColor: theme.negative,
                height: 24,
                width: 68,
              },
              text: {
                fontSize: 11,
                paddingHorizontal: 0,
                color: theme.negative,
                paddingBottom: Platform.select({
                  web: 2,
                  default: 12,
                }),
              },
            }}
          />
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
                height: 24,
                width: 68,
              },
              text: {
                fontSize: 11,
                paddingHorizontal: 0,
                color: theme.accent,
                paddingBottom: Platform.select({
                  web: 2,
                  default: 12,
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
