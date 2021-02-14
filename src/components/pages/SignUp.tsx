import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  currentUser,
  updateCurrentUserProfile,
} from '../../services/firebase';

import type {FC} from 'react';
import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import firebase from 'firebase';
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

const SignIn: FC<Props> = ({navigation}) => {
  navigation.setOptions({
    headerShown: Platform.select({
      web: false,
      default: true,
    }),
    title: '',
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorDisplayname, setErrorDisplayName] = useState<string>('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('');

  const {theme} = useTheme();

  const requestSignUp = async (): Promise<void> => {
    setErrorEmail('');
    setErrorPassword('');
    setErrorPasswordConfirm('');
    setErrorDisplayName('');

    if (!email || !validateEmail(email))
      return setErrorEmail(
        fbt('Not a valid email address', 'invalid email address'),
      );

    if (!password)
      setErrorPassword(fbt('Password is missing', 'password missing'));

    if (password !== confirmPassword)
      setErrorPasswordConfirm(
        fbt('Password does not match', 'password does not match'),
      );

    if (!displayName)
      setErrorDisplayName(
        fbt('Please enter display name', 'enter display name'),
      );

    setIsSigningUp(true);

    try {
      await createUserWithEmailAndPassword(email, password);

      if (currentUser)
        await Promise.all([
          currentUser.updateProfile({displayName}),
          updateCurrentUserProfile({
            email,
            displayName,
          }),
          currentUser.sendEmailVerification(),
        ]);

      navigation.goBack();

      const successFbtString = fbt(
        // eslint-disable-next-line max-len
        'Verification email has been sent. Please check your inbox. Sometimes it maybe filtered in your spam box so please check there too.',
        'email verification sent',
      ).toString();

      Platform.select({
        // eslint-disable-next-line no-alert
        web: alert(successFbtString),
        default: Alert.alert(
          fbt('Success', 'success').toString(),
          successFbtString,
        ),
      });

      navigation.goBack();
    } catch (err) {
      setErrorDisplayName(err.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Container>
      {Platform.OS === 'web' && <Header hideMenus />}
      <ScrollView style={{alignSelf: 'stretch'}}>
        <Content>
          <HeadingText>
            <fbt desc="sign in">Sign Up</fbt>
          </HeadingText>
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Email', 'email')}
            value={email}
            onChangeText={setEmail}
            placeholder="email@email.com"
            errorText={errorEmail}
          />
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Password', 'password')}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry={true}
            errorText={errorPassword}
          />
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Confirm password', 'confirm password')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="********"
            secureTextEntry={true}
            errorText={errorPasswordConfirm}
          />
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Display name', 'display name')}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder={fbt(
              'Enter display name',
              'enter display name',
            ).toString()}
            errorText={errorDisplayname}
          />
          <Button
            loading={isSigningUp}
            onPress={requestSignUp}
            text={fbt('Sign Up', 'sign up')}
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
