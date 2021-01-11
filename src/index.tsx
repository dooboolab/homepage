import {AppRegistry, Platform} from 'react-native';

import App from './App';

AppRegistry.registerComponent('dooboolab', () => App);

if (Platform.OS === 'web')
  AppRegistry.runApplication('dooboolab', {
    rootTag: document.getElementById('root'),
  });

export default App;
