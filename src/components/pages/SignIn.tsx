import {
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {signInWithEmail, signOut} from '../../services/firebase';

import {Button} from '../uis/Button';
import {EditText} from '../uis/EditText';
import type {FC} from 'react';
import Header from '../uis/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import WebView from '../pages/WebView';
import {fbt} from 'fbt';
import {fireAuth} from '../../App';
import firebase from 'firebase/app';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {useTheme} from '../../providers/ThemeProvider';
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

const StyledAgreementTextWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  padding: 0 0 40px 0;
`;

const StyledAgreementText = styled.Text`
  line-height: 22px;
  color: #777;
`;

const StyledAgreementLinedText = styled.Text`
  line-height: 22px;
  color: ${({theme}): string => theme.link};
  text-decoration-line: underline;
`;

type Props = {
  navigation: RootStackNavigationProps<'SignIn'>;
};

const SignIn: FC<Props> = ({navigation}) => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const {setUser} = useAuthContext();
  const {theme} = useTheme();

  const signIn = async (): Promise<void> => {
    setEmailError('');
    setPasswordError('');

    const currentUser = fireAuth.currentUser;

    if (currentUser) {
      await signOut();
    }

    if (!email || !validateEmail(email)) {
      return setEmailError(
        fbt('Not a valid email address', 'invalid email address'),
      );
    }

    if (!password) {
      return setPasswordError(
        fbt('Password is not correct', 'incorrect password'),
      );
    }

    setIsLoggingIn(true);

    try {
      const {user} = await signInWithEmail(email, password);

      if (user && !user.emailVerified) {
        signOut();

        return setPasswordError(
          fbt(
            'Please verify your email address in your email inbox',
            'verify your email address',
          ),
        );
      }

      if (user) {
        setUser({
          displayName: user?.displayName,
          email: user?.email,
          uid: user?.uid,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        });
      }
    } catch (err: any) {
      setPasswordError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const goToWebView = (uri: string): void => {
    navigation.navigate('WebView', {uri});
  };

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
            errorText={emailError}
            placeholder="email@email.com"
            onSubmitEditing={signIn}
          />
          <EditText
            type="column"
            style={{marginTop: 20}}
            labelText={fbt('Password', 'password')}
            value={password}
            onChangeText={setPassword}
            errorText={passwordError}
            placeholder="********"
            secureTextEntry={true}
            onSubmitEditing={signIn}
          />
          <Button
            loading={isLoggingIn}
            onPress={signIn}
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
            onPress={() => navigation.navigate('SignUp')}
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
            onPress={() => navigation.navigate('FindPw')}
            style={{
              marginTop: 12,
            }}
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                color: theme.link,
              }}
            >
              <fbt desc="forgot password">Forgot password</fbt>?
            </Text>
          </TouchableOpacity>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>
              <fbt desc="agreement1">We consider that you agree with</fbt>{' '}
            </StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={(): Promise<void> | undefined => {
                if (Platform.OS === 'web') {
                  return Linking.openURL(
                    'https://legacy.dooboolab.com/termsofservice',
                  );
                }

                goToWebView('https://legacy.dooboolab.com/termsofservice');
              }}
            >
              <fbt desc="agreement2">Terms of Agreement</fbt>
            </StyledAgreementLinedText>
            <StyledAgreementText>
              {' '}
              <fbt desc="agreement3">and</fbt>{' '}
            </StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={(): Promise<void> | undefined => {
                if (Platform.OS === 'web') {
                  return Linking.openURL(
                    'https://legacy.dooboolab.com/privacyandpolicy',
                  );
                }

                goToWebView('https://legacy.dooboolab.com/privacyandpolicy');
              }}
            >
              <fbt desc="agreement4">Privary Policy</fbt>
            </StyledAgreementLinedText>
            <StyledAgreementText>
              {' '}
              <fbt desc="agreement5">by going onto next step</fbt>
            </StyledAgreementText>
          </StyledAgreementTextWrapper>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default withScreen(SignIn);
