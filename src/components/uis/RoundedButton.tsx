import React, {FC, ReactElement} from 'react';
import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {Button} from './Button';
import {fbt} from 'fbt';

//eslint-disable-next-line
fbt;

type Props = {
  onPress?: TouchableOpacityProps['onPress'];
  text?: string;
  style?: TouchableOpacityProps['style'];
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const RoundedButton: FC<Props> = ({
  onPress,
  text = '',
  style,
  containerStyle,
  textStyle,
}): ReactElement => {
  return (
    <Button
      onPress={onPress}
      text={text}
      style={style}
      styles={{
        container: [
          {
            borderRadius: 20,
          },
          containerStyle,
        ],
        text: textStyle,
      }}
    />
  );
};

export default RoundedButton;
