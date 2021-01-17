module.exports = {
  babel: {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['module:react-native-dotenv'],
      [
        'babel-plugin-fbt',
        {
          fbtEnumManifest: require('./src/utils/i18n/fbt/.enum_manifest.json'),
          extraOptions: {__self: true},
        },
      ],
      '@babel/plugin-syntax-class-properties',
      'babel-plugin-fbt-runtime',
    ],
  },
};
