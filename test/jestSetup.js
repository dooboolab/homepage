jest.mock('@react-navigation/stack', () => ({
  ...jest.requireActual('@react-navigation/stack'),
  useHeaderHeight: () => 12,
}));

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
