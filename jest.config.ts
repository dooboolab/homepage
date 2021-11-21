import type {Config} from '@jest/types';

process.env.TZ = 'Asia/Seoul';

export default async (): Promise<Config.InitialOptions> => {
  return {
    automock: false,
    preset: 'jest-expo',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'svg', 'png', 'json'],
    globals: {
      'ts-jest': {tsconfig: 'tsconfig.spec.json'},
    },
    modulePathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/.history/',
    ],
    moduleNameMapper: {
      '\\.svg': '<rootDir>/__mocks__/svgMock.js',
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
    },
    setupFiles: ['<rootDir>/test/jestSetup.js', '<rootDir>/test/jestSetup.ts'],
    cacheDirectory: '.jest/cache',
    setupFilesAfterEnv: ['./test/setupTest.ts'],
    transformIgnorePatterns: [
      // eslint-disable-next-line
      'node_modules/(?!(jest-)?(@react-native|react-native)|react-clone-referenced-element|@react-native-community|@unimodules|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-*|native-base|dooboo-ui|@dooboo-ui|@sentry/.*|sentry-expo|toggle-switch-react-native)',
    ],
    haste: {
      defaultPlatform: 'ios',
      platforms: ['android', 'ios', 'native'],
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
  };
};
