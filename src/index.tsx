import {AppRegistry, Platform} from 'react-native';

import App from './App';
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// @ts-ignore
import MaterialCommunityFont from './assets/MaterialCommunityIcons.ttf';
// @ts-ignore
import MaterialFont from './assets/MaterialIcons.ttf';

AppRegistry.registerComponent('dooboolab', () => App);

if (Platform.OS === 'web') {
  const iconFontStyles = `@font-face {
    src: url(${MaterialFont});
    font-family: MaterialIcons;
  }
  @font-face {
    src: url(${MaterialCommunityFont});
    font-family: MaterialCommunityIcons;
  }
`;

  // Create stylesheet
  const style = document.createElement('style');

  style.type = 'text/css';

  // @ts-ignore
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  // Inject stylesheet
  document.head.appendChild(style);

  AppRegistry.runApplication('dooboolab', {
    rootTag: document.getElementById('root'),
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      `${process.env.PUBLIC_URL}/service-worker.js`,
    );
  }
}

export default App;
