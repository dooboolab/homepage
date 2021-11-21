import firebase, {initializeApp} from 'firebase/app';

import Base64 from 'Base64';
import {Platform} from 'react-native';
import React from 'react';
import RootNavigator from './components/navigations/RootStackNavigator';
import RootProvider from './providers';
import {firebaseConfig} from './config';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from '@firebase/storage';
import {initFbt} from './utils/fbt';
import {withIAPContext} from 'react-native-iap';

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const fireAuth = getAuth();
export const firestorage = getStorage();

// @ts-ignore
global.btoa = Base64.btoa;
// @ts-ignore
global.atob = Base64.atob;

initFbt();

function App(): React.ReactElement {
  return <RootNavigator />;
}

function ProviderWrapper(): React.ReactElement {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

const root = Platform.select({
  ios: withIAPContext(ProviderWrapper),
  android: withIAPContext(ProviderWrapper),
  default: ProviderWrapper,
});

export default root;
