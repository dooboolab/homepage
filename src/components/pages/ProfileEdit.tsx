import {Button, EditText, LoadingIndicator, useTheme} from 'dooboo-ui';
import {IC_CAMERA, IC_GUEST} from '../../utils/Icons';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, ReactElement, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {signOut, updateCurrentUserProfile} from '../../services/firebase';

import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../utils/theme';
import {fbt} from 'fbt';
import firebase from 'firebase';
import {launchImageLibrary} from '../../utils/ImagePicker';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const UserImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-top: 10px;
`;

type Props = {
  navigation: RootStackNavigationProps<'ProfileEdit'>;
};

const ProfileEdit: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const inset = useSafeAreaInsets();

  const {
    state: {user},
    setUser,
  } = useAuthContext();

  const [profilePath, setProfilePath] = useState<string | null>(
    user?.photoURL ?? '',
  );

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName ?? '',
  );

  const [introduction, setIntroduction] = useState<string>('');
  const [displayNameErrorText, setDisplayNameErrorText] = useState<string>('');

  const [introductionErrorText, setIntroductionErrorText] =
    useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const uriToBlob = (uri: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  const pressProfileImage = async (): Promise<void> => {
    if (Platform.OS !== 'web')
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        async (response) => {
          if (response.didCancel) {
            // console.log('User cancelled image picker');
          } else if (response.errorCode) {
            // console.log('ImagePicker Error: ', response.errorMessage);
            // @ts-ignore
          } else if (user && response.uri) {
            setIsLoading(true);

            try {
              // @ts-ignore
              const blob = await uriToBlob(response.uri);

              const snap = await firebase
                .storage()
                .ref(`users/${user.uid}`)
                .put(blob);

              if (snap) {
                const url = await snap.ref.getDownloadURL();

                setProfilePath(url);

                setUser({
                  ...user,
                  photoURL: url,
                });

                const fireUser = firebase.auth().currentUser;

                if (fireUser) {
                  fireUser.updateProfile({photoURL: url});
                  updateCurrentUserProfile({photoURL: url});
                }
              }
            } catch (err) {
              setIntroductionErrorText(err.message);
            } finally {
              setIsLoading(false);
            }
          }
        },
      );
  };

  const updateProfile = async (): Promise<void> => {
    if (!displayName)
      return setDisplayNameErrorText(
        fbt('Display name must not be empty', 'display name must not be empty'),
      );

    setIsLoading(true);

    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        currentUser.updateProfile({displayName});

        updateCurrentUserProfile({
          displayName,
          introduction,
        });

        if (user)
          setUser({
            ...user,
            displayName,
            introduction,
          });
      }
    } catch (err) {
      setIntroductionErrorText(err.message);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={{
            alignSelf: 'stretch',
          }}
          contentContainerStyle={{
            paddingTop: 24 - inset.top,
            paddingHorizontal: 16,
            alignSelf: 'stretch',
          }}>
          <Container>
            <View>
              <TouchableOpacity
                style={{marginTop: 12}}
                onPress={pressProfileImage}>
                <UserImage
                  source={profilePath ? {uri: profilePath} : IC_GUEST}
                />
              </TouchableOpacity>
              {isLoading && <LoadingIndicator />}
            </View>
            <EditText
              type="row"
              placeholder={fbt(
                'Please write your display name.',
                'please write your display name',
              ).toString()}
              errorText={displayNameErrorText}
              style={{
                marginTop: 24,
                marginHorizontal: 24,
                paddingHorizontal: 20,
              }}
              styles={{
                container: {
                  height: displayNameErrorText ? 80 : 54,
                },
                errorText: {
                  marginBottom: 20,
                },
              }}
              focusColor={theme.primary}
              labelText={fbt('Nickanme', 'nickname')}
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
            />
            <EditText
              textInputProps={{
                multiline: true,
                numberOfLines: 8,
                textAlignVertical: 'center',
              }}
              placeholder={fbt(
                'Please introduce yourself.',
                'please introduce yourself',
              ).toString()}
              errorText={introductionErrorText}
              style={{
                marginTop: 8,
                marginHorizontal: 24,
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              styles={{
                container: {
                  marginTop: 8,
                  width: '100%',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: theme.disabled,
                  height: 200,
                  paddingHorizontal: 20,
                },
                input: {
                  textAlignVertical: 'center',
                },
                errorText: {
                  alignSelf: 'flex-start',
                },
              }}
              focusColor={theme.primary}
              type="row"
              labelText={fbt('Introduction', 'intro')}
              onChangeText={(text) => setIntroduction(text)}
              value={introduction}
            />
          </Container>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',

            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 60 + inset.bottom,
          }}>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={updateProfile}
            text={fbt('Update', 'update')}
            indicatorColor={theme.accent}
            styles={{
              container: {
                marginTop: 20,
                marginBottom: 4,
                borderRadius: 6,
                backgroundColor: theme.positive,
                borderWidth: 1,
                borderColor: colors.white,
                height: 44,
              },
              text: {
                fontSize: 14,
                width: 240,
                textAlign: 'center',
                color: colors.white,
                alignSelf: 'center',
                paddingBottom: 2,
              },
            }}
          />
          <View
            style={{
              marginTop: 24,
              marginHorizontal: 40,

              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              loading={isSigningOut}
              onPress={() => {
                navigation.goBack();
              }}
              text={fbt('Go Back', 'go back')}
              indicatorColor={theme.accent}
              styles={{
                container: {
                  borderRadius: 6,
                  backgroundColor: theme.background,
                  borderWidth: 0.5,
                  borderColor: theme.text,
                  height: 44,
                },
                text: {
                  fontSize: 14,
                  width: 100,
                  textAlign: 'center',
                  color: theme.text,
                  alignSelf: 'center',
                },
              }}
            />
            <Button
              loading={isSigningOut}
              onPress={async () => {
                setIsSigningOut(true);
                await signOut();
                setIsSigningOut(false);
              }}
              text={fbt('Logout', 'logout')}
              indicatorColor={theme.accent}
              styles={{
                container: {
                  borderRadius: 6,
                  marginLeft: 12,
                  backgroundColor: theme.background,
                  borderWidth: 1,
                  borderColor: theme.negative,
                  height: 44,
                },
                text: {
                  fontSize: 14,
                  width: 100,
                  textAlign: 'center',
                  color: theme.negative,
                  alignSelf: 'center',
                },
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withScreen(ProfileEdit);
