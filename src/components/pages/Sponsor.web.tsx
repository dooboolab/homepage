import IAPCard, {IAPCardProps} from '../uis/IAPCard';
import {IC_COFFEE, IC_DOOBOO_IAP, IC_LOGO} from '../../utils/Icons';
import {Linking, Text, View} from 'react-native';
import RNIap, {Product, Subscription, useIAP} from 'react-native-iap';
import React, {FC, useCallback, useEffect, useState} from 'react';

import {Button} from '../uis/Button';
import Header from '../uis/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {colors} from '../../utils/theme';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '../../providers/ThemeProvider';
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
  navigation: RootStackNavigationProps<'Sponsor'>;
};

const Sponsor: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <Container>
      <Header hideMenus />
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: theme.accent,
            lineHeight: 30,
            fontSize: 20,
            textAlign: 'center',
          }}>
          <fbt desc="not supported in web">Not supported in web.</fbt>
          {'\n'}
          <fbt desc="try in ios or android">
            Please try this in iOS or Android app.
          </fbt>
        </Text>
        <Button
          onPress={() => {
            Linking.openURL('https://opencollective.com/dooboolab-community');
          }}
          text={fbt('Sponsor community', 'sponsor community')}
          style={{
            marginTop: 48,
            alignSelf: 'center',
            minWidth: 300,
            maxWidth: 500,
          }}
          styles={{
            container: {
              backgroundColor: theme.primary,
              borderRadius: 30,
              alignSelf: 'stretch',
              borderWidth: 0.3,
            },
            text: {
              paddingHorizontal: 20,
              paddingVertical: 8,
              color: theme.text,
            },
            hovered: {
              backgroundColor: colors.darkGray,
              borderColor: 'white',
            },
          }}
        />
        <Text
          style={{
            color: theme.placeholder,
            lineHeight: 30,
            fontSize: 16,
            textAlign: 'center',
            marginVertical: 8,
          }}>
          {fbt('OR', 'or')}
        </Text>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          text={fbt('Go back', 'go back')}
          style={{
            marginBottom: 80,
            alignSelf: 'center',
            minWidth: 300,
            maxWidth: 500,
          }}
          styles={{
            container: {
              borderRadius: 30,
              alignSelf: 'stretch',
              backgroundColor: theme.background,
              borderWidth: 0.3,
              borderColor: theme.text,
            },
            text: {
              paddingHorizontal: 20,
              paddingVertical: 8,
              color: theme.text,
            },
            hovered: {
              backgroundColor: colors.darkGray,
            },
          }}
        />
      </View>
    </Container>
  );
};

export default withScreen(Sponsor);
