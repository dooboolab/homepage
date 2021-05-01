// eslint-disable-next-line
const path = require('path');

const fbtEnumPath = path.join(
  __dirname,
  'src/utils/i18n/fbt/.enum_manifest.json',
);

const babel = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {useTransformReactJSXExperimental: true},
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', {runtime: 'automatic'}],
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
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    '@emotion/babel-plugin',
    'react-native-reanimated/plugin',
    '@babel/plugin-syntax-class-properties',
  ],
};

module.exports = babel;
