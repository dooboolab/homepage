jest.mock('@react-navigation/stack', () => ({
  ...jest.requireActual('@react-navigation/stack'),
  useHeaderHeight: () => 12,
}));

/**
 * Below mock is to prevent test failing from `dooboo-ui`
 */
jest.mock('dooboo-ui/theme/useColorScheme.js', () => {
  return jest.fn().mockReturnValue('dark');
});

jest.mock('@react-navigation/stack', () => {
  return {
    // @ts-ignore
    ...jest.requireActual('@react-navigation/stack'),
    createStackNavigator: jest.fn(),
  };
});

jest.mock('react-native/Libraries/Utilities/Appearance.js', () => {
  return {
    getColorScheme: jest.fn(),
    addChangeListener: jest.fn(),
    removeChangeListener: jest.fn(),
    useColorScheme: jest.fn(),
  };
});
