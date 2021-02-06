import {
  Alert,
  EmitterSubscription,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button, useTheme} from 'dooboo-ui';
import IAPCard, {IAPCardProps} from '../UI/molecules/IAPCard';
import {IC_COFFEE, IC_DOOBOO_IAP, IC_LOGO} from '../../utils/Icons';
import RNIap, {
  InAppPurchase,
  Product,
  PurchaseError,
  Subscription,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import React, {FC, useCallback, useEffect, useState} from 'react';

import Header from '../UI/molecules/Header';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {withScreen} from '../../utils/wrapper';

const iapSkus = [
  'com.dooboolab.bean',
  'com.dooboolab.coffee1',
  'com.dooboolab.coffee3',
  'com.dooboolab.coffee5',
  'com.dooboolab.coffee10',
  'com.dooboolab.coffee20',
  'com.dooboolab.coffee50',
  'com.dooboolab.lite', // non-consumable
  'com.dooboolab.pro', // non-consumable
];

const subSkus = [
  'com.dooboolab.iron',
  'com.dooboolab.bronze',
  'com.dooboolab.silver',
  'com.dooboolab.gold',
  'com.dooboolab.platinum',
  'com.dooboolab.diamond',
];

enum ITEM_TYPE {
  PRODUCT = 'product',
  SUBSCRIPTION = 'subscription',
}

function getSkuType(item: Product | Subscription): ITEM_TYPE {
  switch (item.type) {
    case 'iap':
    case 'inapp':
      return ITEM_TYPE.PRODUCT;

    case 'sub':
    case 'subs':
      return ITEM_TYPE.PRODUCT;
  }
}

const Container = styled.SafeAreaView`
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
    price: 50,
    priceString: '$50',
    name: 'Bronze Tier',
  },
  {
    price: 100,
    priceString: '$100',
    name: 'Silver Tier',
  },
  {
    price: 200,
    priceString: '$200',
    name: 'Gold Tier',
  },
  {
    price: 300,
    priceString: '$300',
    name: 'Platinum Tier',
  },
  {
    price: 400,
    priceString: '$400',
    name: 'Diamond Tier',
  },
  {
    price: 500,
    priceString: '$500',
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

interface SectionProduct {
  title: string;
  data: Product[];
}

interface SectionSubscription {
  title: string;
  data: Subscription[];
}

type Section = SectionProduct | SectionSubscription;

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

const Sponsor: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPaidAmount, setTotalPaidAmount] = useState<number>(10000);

  const getProducts = useCallback(async (): Promise<void> => {
    RNIap.clearProductsIOS();

    try {
      const result = await RNIap.initConnection();

      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);

            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          Alert.alert('purchase error', JSON.stringify(receipt));
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );

    try {
      const products = await RNIap.getProducts(iapSkus);

      console.log('iap', JSON.stringify(products));

      products.forEach((product) => {
        product.type = 'inapp';
      });

      // console.log('products', JSON.stringify(products));
      const subscriptions = await RNIap.getSubscriptions(subSkus);

      console.log('subscriptions', JSON.stringify(subscriptions));

      subscriptions.forEach((subscription) => {
        subscription.type = 'subs';
      });

      // const list = [
      //   {
      //     title: getString('ONE_TIME_PURCHASE'),
      //     data: products,
      //   },
      //   {
      //     title: getString('SUBSCRIPTION_PURCHASE'),
      //     data: subscriptions,
      //   },
      // ];

      // setSections(list);
      // setLoading(false);
    } catch (err) {
      console.log('iap error', err);
    }
  }, []);

  useEffect(() => {
    getProducts();

    return (): void => {
      if (purchaseUpdateSubscription) purchaseUpdateSubscription.remove();

      if (purchaseErrorSubscription) purchaseErrorSubscription.remove();
    };
  }, [getProducts]);

  const purchase = (item: Product | Subscription): void => {
    if (getSkuType(item) === ITEM_TYPE.PRODUCT)
      RNIap.requestPurchase(item.productId);
    else RNIap.requestSubscription(item.productId);
  };

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
      <ScrollView>
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
      </ScrollView>
    </Container>
  );
};

export default withScreen(Sponsor);
