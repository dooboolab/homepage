import {EditText, LoadingIndicator, useTheme} from 'dooboo-ui';
import React, {FC, ReactElement, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {IC_GUEST} from '../../utils/Icons';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-top: 10px;
`;

const Clickable = styled.TouchableOpacity``;

const ClickableText = styled.Text`
  color: ${({theme}): string => theme.primary};
  font-size: 14px;
  margin-top: 10px;
`;

type Props = {
  navigation: RootStackNavigationProps<'ProfileEdit'>;
};

const regURL = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const ProfileEdit: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();

  const {
    state: {user},
  } = useAuthContext();

  const [profilePath, setProfilePath] = useState<string>(user?.photoURL ?? '');

  const [nickname, setNickname] = useState<string>(user?.displayName ?? '');
  const [introduction, setIntroduction] = useState<string>('');
  const [nickNameErrorText, setNicknameErrorText] = useState<string>('');

  const [introductionErrorText, setIntroductionErrorText] = useState<string>(
    '',
  );

  const [isUploading, setIsUploading] = useState(false);

  const pressProfileImage = (): void => {};

  return (
    <Container>
      <View>
        <UserImage
          style={{marginTop: 12}}
          source={profilePath ? {uri: profilePath} : IC_GUEST}
        />
        {isUploading && <LoadingIndicator />}
      </View>
      <Clickable onPress={pressProfileImage}>
        <ClickableText>
          <fbt desc="change profile image">프로필 사진 바꾸기</fbt>
        </ClickableText>
      </Clickable>
      <EditText
        type="row"
        placeholder={fbt(
          '닉네임을 입력해주세요.',
          'please write your nickname',
        ).toString()}
        errorText={nickNameErrorText}
        style={{marginTop: 24, marginHorizontal: 24}}
        styles={{
          container: {
            height: nickNameErrorText ? 80 : 54,
          },
          errorText: {
            marginBottom: 20,
          },
        }}
        focusColor={theme.primary}
        labelText={fbt('닉네임', 'nickname')}
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <EditText
        textInputProps={{
          multiline: true,
        }}
        placeholder={fbt(
          '본인을 소개 해주세요.',
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
        labelText={fbt('소개', 'intro')}
        onChangeText={(text) => setIntroduction(text)}
        value={introduction}
      />
    </Container>
  );
};

export default withScreen(ProfileEdit);
