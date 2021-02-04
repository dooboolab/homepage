import {Alert, Platform} from 'react-native';
import {Button, useTheme} from 'dooboo-ui';
import React, {FC, useState} from 'react';
import styled, {css} from 'styled-components/native';

import {IMG_LABTOP} from '../../utils/Icons';
import {fbt} from 'fbt';
import firebase from 'firebase/app';
import {validateEmail} from '../../utils/functions';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 600px;
  align-self: stretch;
  background-color: ${({theme}) => theme.background};
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  padding: 0 24px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      align-items: flex-start;
      padding: 0 80px;
    `}
`;

const Content = styled.View`
  align-self: stretch;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex-direction: row;
      justify-content: space-between;
    `}
`;

const Title = styled.Text`
  flex: 1;
  font-size: 30px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: futura;
  font-weight: 500;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 42px;
      max-width: 480px;
      text-align: flex-start;
      margin-right: 80px;
    `}
`;

const Form = styled.View`
  align-self: center;
  width: 86%;
  margin-top: 56px;

  flex-direction: column;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex: 1;
      margin-top: 0px;
      align-self: stretch;
      max-width: 480px;
    `}
`;

const Input = styled.TextInput`
  font-size: 14px;
  align-self: stretch;
  margin-bottom: 12px;
  padding: 16px 18px;
  border-radius: 10px;
  color: ${({theme}) => theme.accent};
  background-color: ${({theme}) => theme.textContrast};
  opacity: 0.6;
  color: ${({theme}) => theme.text};
  border-width: 1px;
  border-color: ${({theme}) => theme.primary};
`;

type Props = {};

const ContactSection: FC<Props> = () => {
  const {theme, colors} = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [story, setStory] = useState<string>('');

  const sendContact = async (): Promise<void> => {
    if (!name || !email || !story) return;

    if (!validateEmail(email))
      return Platform.select({
        // eslint-disable-next-line no-alert
        web: alert(
          fbt('Email is not a valid email address', 'email not valid'),
        ),
        default: Alert.alert(
          fbt('Error', 'error'),
          fbt('Email is not a valid email address', 'email not valid'),
        ),
      });

    const db = firebase.firestore();

    try {
      setLoading(true);

      await db
        .collection('contacts')
        .add({email, name, message: story, createdAt: new Date()});

      Platform.select({
        // eslint-disable-next-line no-alert
        web: alert(
          fbt(
            'Thanks for sharing your story 🤩. We will get back to you soon!',
            'thanks to story',
          ),
        ),
        default: Alert.alert(
          fbt('Success', 'success'),
          fbt(
            'Thanks for sharing your story 🤩. We will get back to you soon!',
            'thanks to story',
          ),
        ),
      });

      setEmail('');
      setName('');
      setStory('');
    } catch (err) {
      Alert.alert(fbt('Error', 'error'), err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundImage
        source={IMG_LABTOP}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.65,
        }}>
        <Content>
          <Title>
            <fbt desc="who is next">Who's next? Feel free to talk.</fbt>
          </Title>
          <Form>
            <Input
              value={name}
              placeholder={fbt(
                'Please write your name',
                'name placeholder',
              ).toString()}
              placeholderTextColor={theme.placeholder}
              onChangeText={(text) => setName(text)}
            />
            <Input
              value={email}
              placeholder="email@email.com"
              placeholderTextColor={theme.placeholder}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              numberOfLines={10}
              multiline={true}
              value={story}
              placeholder={fbt(
                'Please tell us your stories',
                'story placeholder',
              ).toString()}
              placeholderTextColor={theme.placeholder}
              onChangeText={(text) => setStory(text)}
            />
            <Button
              loading={loading}
              onPress={sendContact}
              activeOpacity={0.7}
              style={{
                marginTop: 36,
              }}
              styles={{
                container: {
                  backgroundColor: colors.success,
                  paddingHorizontal: 40,
                  borderRadius: 20,
                  height: 44,
                },
                text: {
                  color: theme.text,
                  fontFamily: 'avenir',
                  fontSize: 16,
                },
                hovered: {
                  backgroundColor: colors.darkGray,
                },
              }}
              text={fbt('Send', 'send')}
            />
          </Form>
        </Content>
      </BackgroundImage>
    </Container>
  );
};

export default ContactSection;
