import React, {ReactElement} from 'react';
import {
  RootStackNavigationProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';

import {RouteProp} from '@react-navigation/core';
import {WebView} from 'react-native-webview';
import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}): string => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: RootStackNavigationProps<'WebView'>;
  route: RouteProp<RootStackParamList, 'WebView'>;
}

function Page({navigation, route}): ReactElement {
  navigation.setOptions({
    headerShown: true,
    title: '',
  });

  const {
    params: {uri},
  } = route;

  return (
    <Container>
      <WebView source={{uri}} />
    </Container>
  );
}

export default Page;
