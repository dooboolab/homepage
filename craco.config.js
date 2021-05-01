const path = require('path');
const babel = require('./babel.config');

module.exports = {
  babel,
  webpack: {
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
