import './GestureHandler';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import Main from '../screen/Main';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useThemeContext} from '../../providers/ThemeProvider';

export type RootStackParamList = {
  Main: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.background,
          border: theme.border,
          card: theme.itemBackground,
          primary: theme.primary,
          notification: theme.tintColor,
          text: theme.text,
        },
        dark: true,
      }}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
