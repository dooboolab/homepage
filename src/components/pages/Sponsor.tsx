import {Button, useTheme} from 'dooboo-ui';
import IAPCard, {IAPCardProps} from '../UI/molecules/IAPCard';
import {IC_COFFEE, IC_DOOBOO_IAP, IC_LOGO} from '../../utils/Icons';
import {Platform, ScrollView, Text, View} from 'react-native';
import React, {FC} from 'react';

import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StyledText = styled.Text`
  color: ${({theme}): string => theme.text};
`;

const ListContainer = styled.View`
  height: 352px;
  margin-bottom: 40px;

  flex-direction: column;
`;

type Props = {
  navigation: RootStackNavigationProps<'Sponsor'>;
};

type ItemType = 'onetime' | 'subscription' | 'membership';

const itemTypes: ItemType[] = ['onetime', 'subscription', 'membership'];

const onetimeItems: Omit<IAPCardProps, 'icon' | 'style'>[] = [
  {
    price: 5,
    priceString: '$5',
    name: '1 Coffee',
  },
  {
    price: 15,
    priceString: '$15',
    name: '3 Coffee',
  },
  {
    price: 25,
    priceString: '$25',
    name: '5 Coffee',
  },
  {
    price: 50,
    priceString: '$50',
    name: '10 Coffee',
  },
  {
    price: 100,
    priceString: '$100',
    name: '20 Coffee',
  },
  {
    price: 250,
    priceString: '$250',
    name: '50 Coffee',
  },
  {
    price: 500,
    priceString: '$500',
    name: '100 Coffee',
  },
  {
    price: 1000,
    priceString: '$1000',
    name: '200 Coffee',
  },
];

const subscriptionItems: Omit<IAPCardProps, 'icon' | 'style'>[] = [
  {
    price: 20,
    priceString: '$20',
    name: 'Iron Tier',
  },
  {
    price: 100,
    priceString: '$100',
    name: 'Bronze Tier',
  },
  {
    price: 200,
    priceString: '$300',
    name: 'Silver Tier',
  },
  {
    price: 300,
    priceString: '$300',
    name: 'Gold Tier',
  },
  {
    price: 400,
    priceString: '$400',
    name: 'Platinum Tier',
  },
  {
    price: 500,
    priceString: '$500',
    name: 'Diamond Tier',
  },
  {
    price: 1000,
    priceString: '$1,000',
    name: 'Challenger',
  },
];

const membershipItems: Omit<IAPCardProps, 'icon' | 'style'>[] = [
  {
    price: 100,
    priceString: '$100',
    name: 'LITE',
  },
  {
    price: 1000,
    priceString: '$1,000',
    name: 'PRO',
  },
];

const Sponsor: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();

  if (Platform.OS === 'web')
    return (
      <Container>
        <Header hideMenus />
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme.accent,
              lineHeight: 30,
              fontSize: 20,
              textAlign: 'center',
            }}>
            <fbt desc="not supported in web">Not supported in web.</fbt>
            {'\n'}
            <fbt desc="try in ios or android">
              Please try this in iOS or Android app.
            </fbt>
          </Text>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            text={fbt('Go back', 'go back')}
            style={{
              marginTop: 48,
              marginBottom: 80,
              alignSelf: 'center',
              minWidth: 300,
              maxWidth: 500,
            }}
            styles={{
              container: {
                borderRadius: 30,
                alignSelf: 'stretch',
                backgroundColor: theme.background,
                borderWidth: 1,
                borderColor: theme.text,
              },
              text: {
                paddingHorizontal: 20,
                paddingVertical: 8,
                color: theme.text,
              },
            }}
          />
        </View>
      </Container>
    );

  return (
    <Container>
      <Header hideMenus />

      <View
        style={{
          alignSelf: 'stretch',
          paddingTop: 20,
          paddingBottom: 40,
          backgroundColor: theme.background,
        }}>
        {itemTypes.map((type) => {
          return (
            <ListContainer key={type}>
              <StyledText
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  marginLeft: 12,
                  marginBottom: 8,
                  textAlign: 'center',
                }}>
                {type === 'onetime'
                  ? fbt('One-time sponsoring', 'one time sponsoring')
                  : type === 'subscription'
                  ? fbt('Monthly donation', 'monthly donation')
                  : fbt('Forever membership', 'forever membership')}
              </StyledText>
              <ScrollView
                horizontal
                style={{
                  backgroundColor: theme.paper,
                }}
                contentContainerStyle={{
                  paddingVertical: 28,
                  backgroundColor: theme.paper,
                  paddingHorizontal: 40,
                  height: 300,
                }}>
                {type === 'onetime'
                  ? onetimeItems.map((item, i) => {
                      return (
                        <IAPCard
                          key={i.toString()}
                          price={item.price}
                          priceString={item.priceString}
                          name={item.name}
                          icon={IC_COFFEE}
                          style={{marginRight: 16}}
                        />
                      );
                    })
                  : type === 'subscription'
                  ? subscriptionItems.map((item, i) => {
                      return (
                        <IAPCard
                          type="subscription"
                          key={i.toString()}
                          price={item.price}
                          priceString={item.priceString}
                          name={item.name}
                          icon={IC_DOOBOO_IAP}
                          style={{marginRight: 16}}
                        />
                      );
                    })
                  : membershipItems.map((item, i) => {
                      return (
                        <IAPCard
                          type="forever"
                          key={i.toString()}
                          price={item.price}
                          priceString={item.priceString}
                          name={item.name}
                          icon={IC_LOGO}
                          style={{marginRight: 16}}
                        />
                      );
                    })}
              </ScrollView>
            </ListContainer>
          );
        })}
      </View>
    </Container>
  );
};

export default withScreen(Sponsor);
