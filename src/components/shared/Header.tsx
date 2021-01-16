import {IC_DOOBOOLAB, IC_DOOBOOLAB_DARK} from '../../utils/Icons';
import React, {FC, ReactElement, useState} from 'react';
import {ThemeType, useTheme} from '../../providers/ThemeProvider';
import styled, {css} from 'styled-components/native';

import ToggleSwitch from 'toggle-switch-react-native';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  width: 100%;
  padding: 0 24px;

  flex-direction: column;
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

const Logo = styled.Image`
  width: 180px;
  height: 66.54px;
  margin-top: 8px;
`;

const LinkWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin-right: 48px;
    `}
`;

const Link = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  padding: 20px;
`;

const SwitchWrapper = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      top: 24px;
    `}
`;

const Header: FC = () => {
  const navigation = useNavigation();
  const {theme, themeType} = useTheme();
  const [switchOn, setSwitchOn] = useState(themeType === ThemeType.DARK);

  const renderLink = (
    url: string,
    text: string,
    selected?: boolean,
  ): ReactElement => {
    return (
      <Link
        style={{marginRight: 20}}
        onPress={() => {
          navigation.navigate('');
        }}>
        <LinkText>{text}</LinkText>
      </Link>
    );
  };

  return (
    <Container>
      <Logo
        source={
          themeType === ThemeType.LIGHT ? IC_DOOBOOLAB : IC_DOOBOOLAB_DARK
        }
      />
      <LinkWrapper>
        {renderLink('', 'Story')}
        {renderLink('', 'Work')}
        {renderLink('', 'Contact')}
      </LinkWrapper>
      <SwitchWrapper>
        <ToggleSwitch
          isOn={switchOn}
          onToggle={(val: boolean) => setSwitchOn(val)}
          onColor={theme.text}
        />
      </SwitchWrapper>
    </Container>
  );
};

export default Header;
