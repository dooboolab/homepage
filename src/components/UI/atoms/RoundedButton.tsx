import React, {FC, ReactElement} from 'react';
import type {TextStyle, TouchableOpacityProps} from 'react-native';

import {Button} from 'dooboo-ui';
import {fbt} from 'fbt';

//eslint-disable-next-line
fbt;

type Props = {
  onPress?: TouchableOpacityProps['onPress'];
  text?: string;
  style?: TouchableOpacityProps['style'];
  textStyle?: TextStyle;
};

const RoundedButton: FC<Props> = ({
  onPress,
  text = '',
  style,
  textStyle,
}): ReactElement => {
  return (
    <Button
      onPress={onPress}
      text={text}
      style={style}
      styles={{
        container: {
          borderRadius: 20,
        },
        text: textStyle,
      }}
    />
  );
};

export default RoundedButton;
