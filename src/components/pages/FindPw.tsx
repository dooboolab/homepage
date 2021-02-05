import {Button, EditText, useTheme} from 'dooboo-ui';
import {Platform, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import type {FC} from 'react';
import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

// eslint-disable-next-line
fbt;

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 48px;

  align-items: center;
`;

const HeadingText = styled.Text`
  margin-top: 40px;
  margin-bottom: 28px;
  font-size: 28px;
  color: ${({theme}): string => theme.text};
`;

type Props = {
  navigation: RootStackNavigationProps<'SignIn'>;
};

const SignIn: FC<Props> = ({navigation}) => {
  navigation.setOptions({
    headerShown: Platform.select({
      web: false,
      default: true,
    }),
    title: '',
  });

  const [email, setEmail] = useState<string>('');

  const {theme} = useTheme();

  return (
    <Container>
      {Platform.OS === 'web' && <Header hideMenus />}
      <ScrollView style={{alignSelf: 'stretch'}}>
        <Content>
          <HeadingText>
            <fbt desc="find password">Find Password</fbt>
          </HeadingText>
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Email', 'email')}
            value={email}
            onChangeText={setEmail}
            placeholder="email@email.com"
          />
          <Button
            text={fbt('Send', 'send')}
            style={{marginTop: 30, alignSelf: 'stretch'}}
            styles={{
              container: {
                borderRadius: 30,
                alignSelf: 'stretch',
              },
              text: {
                paddingHorizontal: 20,
                paddingVertical: 8,
              },
            }}
          />
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            text={fbt('Go back', 'go back')}
            style={{marginTop: 16, alignSelf: 'stretch'}}
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
        </Content>
      </ScrollView>
    </Container>
  );
};

export default withScreen(SignIn);
