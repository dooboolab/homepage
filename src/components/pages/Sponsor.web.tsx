import IAPCard, {IAPCardProps} from '../uis/IAPCard';
import {IC_COFFEE, IC_DOOBOO_IAP, IC_LOGO} from '../../utils/Icons';
import RNIap, {Product, Subscription, useIAP} from 'react-native-iap';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {Button} from '../uis/Button';
import Header from '../uis/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
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
        }}
      >
        <Text
          style={{
            color: theme.accent,
            lineHeight: 30,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          <fbt desc="not supported in web">Not supported in web.</fbt>
          {'\n'}
          <fbt desc="try in ios or android">
            Please try this in iOS or Android app.
          </fbt>
        </Text>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          text={fbt('Go back', 'go back')}
          style={{
            marginTop: 48,
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
              borderWidth: 1,
              borderColor: theme.text,
            },
            text: {
              paddingHorizontal: 20,
              paddingVertical: 8,
              color: theme.text,
            },
          }}
        />
      </View>
    </Container>
  );
};

export default withScreen(Sponsor);
