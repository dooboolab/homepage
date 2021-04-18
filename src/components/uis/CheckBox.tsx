import React, {FC, ReactElement} from 'react';

import {Platform} from 'react-native';
import styled from '@emotion/native';
import {useTheme} from 'dooboo-ui';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Touch = styled.TouchableOpacity``;

const Circle = styled.View`
  width: 16px;
  height: 16px;
  border-width: 1px;

  justify-content: center;
  align-items: center;
`;

const CircleDot = styled.View`
  align-self: center;
  width: 9px;
  height: 9px;
`;

const Text = styled.Text`
  font-size: 14px;
`;

type Props = {
  checked?: boolean;
  text?: string;
  onPress?: () => void;
  renderElement?: () => ReactElement;
};

const CheckBox: FC<Props> = ({
  checked = false,
  text = '',
  onPress,
  renderElement,
}) => {
  const {theme} = useTheme();

  return (
    <Container>
      <Touch
        activeOpacity={0.7}
        delayPressIn={100}
        onPress={onPress}
        style={{
          marginTop: 2,
        }}>
        <Circle
          style={{
            borderColor: checked ? theme.primary : theme.text,
            marginRight: 8,
          }}>
          <CircleDot
            style={Platform.select({
              default: {
                backgroundColor: checked ? theme.primary : 'transparent',
              },
              web: {
                backgroundColor: checked ? theme.primary : 'transparent',
                width: 8,
                height: 8,
              },
            })}
          />
        </Circle>
      </Touch>
      {!renderElement ? (
        <Text
          style={{
            color: checked ? theme.primary : theme.text,
          }}>
          {text}
        </Text>
      ) : (
        renderElement()
      )}
    </Container>
  );
};

export default CheckBox;
