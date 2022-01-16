const path = require('path');
const webpack = require('webpack');
const babel = require('./babel.config');

module.exports = {
  babel,
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development',
        ),
        __DEV__: process.env.NODE_ENV !== 'production' || true,
      }),
    ],
    configure: {
      module: {
        rules: [
          {
            test: /\.ttf$/,
            loader: 'url-loader', // or directly file-loader
            include: path.resolve(
              __dirname,
              'node_modules/react-native-vector-icons',
            ),
          },
        ],
      },
    },
  },
};
