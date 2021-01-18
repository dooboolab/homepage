import {AppRegistry, Platform} from 'react-native';

import App from './App';

AppRegistry.registerComponent('dooboolab', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('dooboolab', {
    rootTag: document.getElementById('root'),
  });

  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register(
      `${process.env.PUBLIC_URL}/service-worker.js`,
    );
}

export default App;
