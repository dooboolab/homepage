import './GestureHandler';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import CodeOfConduct from '../pages/CodeOfConduct';
import FindPw from '../pages/FindPw';
import Home from '../pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sponsor from '../pages/Sponsor';
import VisionAndMission from '../pages/VisionAndMission';
import {useTheme} from '../../providers/ThemeProvider';

export type RootStackParamList = {
  Home: undefined;
  VisionAndMission: undefined;
  CodeOfConduct: undefined;
  Sponsor: undefined;
  SignUp: undefined;
  SignIn: undefined;
  FindPw: undefined;
};

const commonScreens = {
  Home: Home,
  VisionAndMission,
  CodeOfConduct,
};

const authScreens = {
  SignIn,
  SignUp,
  FindPw,
};

const userScreens = {
  Sponsor,
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useTheme();

  const linking = {
    prefixes: ['https://dooboolab.com', 'dooboolab://'],
    enabled: true,
  };

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
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        {Object.entries({
          ...commonScreens,
          ...(false ? userScreens : authScreens),
        }).map(([name, component]) => (
          <Stack.Screen
            name={name as keyof RootStackParamList}
            component={component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
