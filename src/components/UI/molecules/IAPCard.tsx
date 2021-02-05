import {Image, Text, View, ViewStyle} from 'react-native';
import type {ImageSourcePropType, TouchableOpacityProps} from 'react-native';
import React, {FC, ReactElement} from 'react';

import RoundedButton from '../atoms/RoundedButton';
import {fbt} from 'fbt';
import {useTheme} from 'dooboo-ui';

//eslint-disable-next-line
fbt;

export type IAPCardProps = {
  style?: ViewStyle;
  onPress?: TouchableOpacityProps['onPress'];
  priceString: string;
  price: number;
  name: string;
  icon: ImageSourcePropType;
  type?: 'onetime' | 'subscription' | 'forever';
};

const IAPCard: FC<IAPCardProps> = ({
  style,
  type = 'onetime',
  onPress,
  priceString,
  name,
  icon,
}): ReactElement => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          paddingVertical: 20,
          width: 160,
          backgroundColor:
            type === 'subscription'
              ? colors.eastBay
              : type === 'onetime'
              ? colors.deYork
              : colors.fuchsiaBlue,
          borderRadius: 24,

          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Image
        source={icon}
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 14,
          color: type === 'onetime' ? colors.darkGray : colors.white,
        }}>
        {name}
      </Text>
      <RoundedButton
        onPress={onPress}
        text={priceString}
        style={{
          alignSelf: 'stretch',
          marginTop: 28,
          marginHorizontal: 20,
        }}
        containerStyle={{
          backgroundColor:
            type === 'subscription'
              ? colors.scampi
              : type === 'onetime'
              ? colors.magicMint
              : colors.helioTrope,
          borderRadius: 20,
        }}
        textStyle={{
          fontSize: 14,
          fontWeight: '400',
          color: type === 'forever' ? colors.white : colors.downRiver,
        }}
      />
    </View>
  );
};

export default IAPCard;
