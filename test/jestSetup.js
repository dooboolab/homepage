import React from 'react';

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

jest.mock('react-native/Libraries/Utilities/Appearance.js', () => {
  return {
    getColorScheme: jest.fn(),
    addChangeListener: jest.fn(),
    removeChangeListener: jest.fn(),
    useColorScheme: jest.fn(),
  };
});

/**
 * Temporarily test files that resolves https://github.com/facebook/react-native/issues/27721
 */

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
  () => {
    const {View} = require('react-native');

    const MockTouchable = (props): ReactElement => {
      const moreProps = {
        onPress: jest.fn(),
      };

      return <View {...props} {...moreProps} />;
    };

    MockTouchable.displayName = 'TouchableOpacity';

    return MockTouchable;
  },
);

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableHighlight.js',
  () => {
    const {View} = require('react-native');

    const MockTouchable = (props): ReactElement => {
      return <View {...props} />;
    };

    MockTouchable.displayName = 'TouchableHighlight';

    return MockTouchable;
  },
);
