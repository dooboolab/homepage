import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';

import type {FC} from 'react';
import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

// eslint-disable-next-line
fbt;

const Container = styled.View`
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
  margin: 12px 0;
  font-size: 28px;
  color: ${({theme}): string => theme.text};
`;

type Props = {
  navigation: RootStackNavigationProps<'SignIn'>;
};

const SignIn: FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {theme} = useTheme();

  return (
    <Container>
      <Header hideMenus />
      <ScrollView style={{alignSelf: 'stretch'}}>
        <Content>
          <HeadingText>
            <fbt desc="sign in">Sign In</fbt>
          </HeadingText>
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Email', 'email')}
            value={email}
            onChangeText={setEmail}
            placeholder="email@email.com"
          />
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Password', 'password')}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
          />
          <Button
            text={fbt('Sign In', 'sign in')}
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
            text={fbt('Sign Up', 'sign up')}
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
          <TouchableOpacity
            style={{
              marginTop: 12,
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: theme.link,
              }}>
              <fbt desc="forgot password">Forgot password</fbt>?
            </Text>
          </TouchableOpacity>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default withScreen(SignIn);
