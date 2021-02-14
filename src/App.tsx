import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import Base64 from 'Base64';
import React from 'react';
import RootNavigator from './components/navigations/RootStackNavigator';
import RootProvider from './providers';
import firebase from 'firebase/app';
import {firebaseConfig} from './config';
import {initFbt} from './utils/fbt';

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

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

export default ProviderWrapper;
