import './GestureHandler';

import {LoadingIndicator, useTheme} from 'dooboo-ui';
import {Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {doc, getDoc} from 'firebase/firestore';
import {fireAuth, firestore} from '../../App';

import CodeOfConduct from '../pages/CodeOfConduct';
import FindPw from '../pages/FindPw';
import Home from '../pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import ProfileEdit from '../pages/ProfileEdit';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sponsor from '../pages/Sponsor';
import Todo from '../pages/Todo';
import {User} from '../../types';
import VisionAndMission from '../pages/VisionAndMission';
import WebView from '../pages/WebView';
import firebase from 'firebase/app';
import {useAuthContext} from '../../providers/AuthProvider';

export type RootStackParamList = {
  Home: undefined;
  ProfileEdit: undefined;
  WebView: {uri: string};
  VisionAndMission: undefined;
  CodeOfConduct: undefined;
  Todo: undefined;
  Sponsor: undefined;
  SignUp: undefined;
  SignIn: undefined;
  FindPw: undefined;
};

const commonScreens = {
  Home,
  WebView,
  VisionAndMission,
  CodeOfConduct,
};

const authScreens = {
  SignIn,
  SignUp,
  FindPw,
};

const userScreens = {
  Todo,
  Sponsor,
  ProfileEdit,
};

const webConfig = {
  screens: {
    SignIn: 'sign_in',
    SignUp: 'sign_up',
    FindPw: 'find_password',
    Home: 'home',
    ProfileEdit: 'profile_edit',
    VisionAndMission: 'vision_and_mission',
    CodeOfConduct: 'code_of_conduct',
    Sponsor: 'sponsor',
    Todo: 'todo',
  },
};

export type RootStackNavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useTheme();

  const {
    resetUser,
    setUser,
    state: {user},
  } = useAuthContext();

  const [authInitiated, setAuthInitiated] = useState<boolean>(false);

  const [fireAuthStateChanged, setFireAuthStateChanged] =
    useState<boolean>(false);

  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    if (authInitiated) {
      return;
    }

    setAuthInitiated(true);

    fireAuth.onAuthStateChanged((fireUser) => {
      setFireAuthStateChanged(true);

      if (fireUser) {
        const docRef = doc(firestore, `users/${fireUser.uid}`);

        getDoc(docRef).then((userDoc) => {
          const updatedUser: User = {
            uid: fireUser.uid,
            email: fireUser.email,
            displayName: fireUser.displayName,
            emailVerified: fireUser.emailVerified,
            photoURL: fireUser.photoURL,
            introduction: '',
          };

          if (userDoc.exists()) {
            updatedUser.introduction = (userDoc.data() as User).introduction;
          }

          setUser(updatedUser);
        });

        return;
      }

      resetUser();
    });
  }, [authInitiated, resetUser, setUser]);

  const linking = {
    prefixes: ['https://dooboolab.com', 'dooboolab://'],
    enabled: true,
    config: webConfig,
  };

  if (!fireAuthStateChanged) {
    return (
      <View
        style={{
          height: Platform.select({
            web: '100vh',
            default: '100%',
          }),
          alignSelf: 'stretch',
          backgroundColor: theme.background,
        }}
      >
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={Platform.select({
        web: linking,
      })}
      theme={{
        colors: {
          background: theme.background,
          border: theme.disabled,
          card: theme.paper,
          primary: theme.link,
          notification: theme.disabled,
          text: theme.text,
        },
        dark: true,
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerBackTitle: '',
        }}
      >
        {Object.entries({
          ...commonScreens,
          ...(user ? userScreens : authScreens),
        }).map(([name, component]) => (
          <Stack.Screen
            key={name}
            name={name as keyof RootStackParamList}
            component={component}
            options={{
              headerShown: Platform.OS !== 'web' && name !== 'Home',
              headerBackTitle: undefined,
              // headerTitle: '',
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
