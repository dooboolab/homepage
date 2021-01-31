import './GestureHandler';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import CodeOfConduct from '../pages/CodeOfConduct';
import Home from '../pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import React from 'react';
import VisionAndMission from '../pages/VisionAndMission';
import {useTheme} from '../../providers/ThemeProvider';

export type RootStackParamList = {
  Home: undefined;
  VisionAndMission: undefined;
  CodeOfConduct: undefined;
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'dooboolab',
          }}
        />
        <Stack.Screen name="VisionAndMission" component={VisionAndMission} />
        <Stack.Screen name="CodeOfConduct" component={CodeOfConduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
