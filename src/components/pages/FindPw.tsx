import {Alert, Platform, ScrollView} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {useState} from 'react';

import type {FC} from 'react';
import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import firebase from 'firebase';
import {sendPasswordResetEmail} from '../../services/firebase';
import styled from 'styled-components/native';
import {validateEmail} from '../../utils/common';
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

const FindPw: FC<Props> = ({navigation}) => {
  navigation.setOptions({
    headerShown: Platform.select({
      web: false,
      default: true,
    }),
    title: '',
  });

  const {theme} = useTheme();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const findPw = async (): Promise<void> => {
    setEmailError('');

    if (!email || !validateEmail(email))
      return setEmailError(
        fbt('Not a valid email address', 'invalid email address'),
      );

    setSendingEmail(true);

    try {
      await sendPasswordResetEmail(email);
    } catch (err) {
      setEmailError(err.message);
    } finally {
      const successFbtString = fbt(
        // eslint-disable-next-line max-len
        'Resetting password link has been sent. Please check your inbox. Sometimes it maybe filtered in your spam box so please check there too.',
        'password email link sent',
      ).toString();

      Platform.select({
        // eslint-disable-next-line no-alert
        web: alert(successFbtString),
        default: Alert.alert(
          fbt('Success', 'success').toString(),
          successFbtString,
        ),
      });

      setSendingEmail(false);
    }
  };

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
            loading={sendingEmail}
            text={fbt('Send', 'send')}
            style={{marginTop: 30, alignSelf: 'stretch'}}
            onPress={findPw}
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

export default withScreen(FindPw);
