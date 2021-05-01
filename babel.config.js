// eslint-disable-next-line
const path = require('path');

const fbtEnumPath = path.join(
  __dirname,
  'src/utils/i18n/fbt/.enum_manifest.json',
);

const babel = {
  presets: [
    ['module:metro-react-native-babel-preset'],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'babel-plugin-fbt',
      {
        fbtEnumPath,
        extraOptions: {__self: true},
      },
    ],
    'babel-plugin-fbt-runtime',
    '@babel/plugin-syntax-class-properties',
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ],
};

module.exports = babel;
