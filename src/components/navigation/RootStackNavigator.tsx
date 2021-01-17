import './GestureHandler';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import Home from '../screen/Home';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useTheme} from '../../providers/ThemeProvider';

export type RootStackParamList = {
  Home: undefined;
  VisionAndMission: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useTheme();

  return (
    <NavigationContainer
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'dooboolab',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
