import {Alert, Platform, ScrollView, View} from 'react-native';
import IAPCard, {IAPCardProps} from '../UI/molecules/IAPCard';
import {IC_COFFEE, IC_DOOBOO_IAP, IC_LOGO} from '../../utils/Icons';
import type {Product, Purchase, Subscription} from 'react-native-iap';
import {
  PurchaseStateAndroid,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getAvailablePurchases,
  requestPurchase,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ReceiptValidationResponse,
  ReceiptValidationStatus,
} from 'react-native-iap/src/types/apple';
import {androidIAPEndPoint, itunesConnectSharedSecret} from '@env';

import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {User} from '../../types';
import {fbt} from 'fbt';
import firebase from 'firebase';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {useTheme} from 'dooboo-ui';
import {withScreen} from '../../utils/wrapper';

const consumableSkus = [
  'com.dooboolab.bean',
  'com.dooboolab.coffee1',
  'com.dooboolab.coffee3',
  'com.dooboolab.coffee5',
  'com.dooboolab.coffee10',
  'com.dooboolab.coffee20',
  'com.dooboolab.coffee50',
];

const membershipSkus = ['com.dooboolab.lite', 'com.dooboolab.pro'];

const iapSkus = [...consumableSkus, ...membershipSkus];

const subSkus = [
  'com.dooboolab.skeleton',
  'com.dooboolab.iron',
  'com.dooboolab.bronze',
  'com.dooboolab.silver',
  'com.dooboolab.gold',
  'com.dooboolab.platinum',
  'com.dooboolab.diamond',
];

const getActiveSubscriptionId = async (): Promise<string | undefined> => {
  if (Platform.OS === 'ios') {
    const availablePurchases = await getAvailablePurchases();

    const sortedAvailablePurchases = availablePurchases.sort(
      (a, b) => b.transactionDate - a.transactionDate,
    );

    const latestAvailableReceipt =
      sortedAvailablePurchases[0].transactionReceipt;

    const isTestEnvironment = __DEV__;

    const decodedReceipt = await validateReceiptIos(
      {
        'receipt-data': latestAvailableReceipt,
        password: itunesConnectSharedSecret,
      },
      isTestEnvironment,
    );

    if (decodedReceipt) {
      const {
        latest_receipt_info: latestReceiptInfo,
      } = decodedReceipt as ReceiptValidationResponse;

      const expirationInMilliseconds = Number(
        latestReceiptInfo?.expires_date_ms,
      );

      const nowInMilliseconds = Date.now();

      if (expirationInMilliseconds > nowInMilliseconds)
        return sortedAvailablePurchases[0].productId;
    }

    return undefined;
  }

  if (Platform.OS === 'android') {
    const availablePurchases = await getAvailablePurchases();

    for (let i = 0; i < availablePurchases.length; i++)
      if (subSkus.includes(availablePurchases[i].productId))
        return availablePurchases[i].productId;

    return undefined;
  }
};

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
  margin-bottom: 40px;

  flex-direction: column;
`;

type Props = {
  navigation: RootStackNavigationProps<'Sponsor'>;
};

type ItemType = 'onetime' | 'subscription' | 'membership';

const itemTypes: ItemType[] = ['onetime', 'subscription', 'membership'];

const addPurchaseRecord = (
  user: User | null,
  purchase: Purchase,
  receipt,
): void => {
  if (user) {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('purchases')
      .add({
        purchase,
        receipt,
      });

    const db = firebase.firestore();

    db.collection('sponsors').add({
      purchase,
      user,
    });
  }
};

const Sponsor: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();

  const {
    state: {user},
  } = useAuthContext();

  const {
    connected,
    products,
    subscriptions,
    getProducts,
    getSubscriptions,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const [subscribedProductId, setSubscribedProdutId] = useState<string>();

  const sortedProducts = useMemo(
    () =>
      products.sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10)),
    [products],
  );

  const sortedSubscriptions = useMemo(
    () =>
      subscriptions.sort(
        (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
      ),
    [subscriptions],
  );

  const getSubcribedProuduct = useCallback(async (): Promise<void> => {
    setSubscribedProdutId(await getActiveSubscriptionId());
  }, []);

  const fetchProducts = useCallback(async (): Promise<void> => {
    await flushFailedPurchasesCachedAsPendingAndroid();
    getProducts(iapSkus);
    getSubscriptions(subSkus);
    getSubcribedProuduct();
  }, [getProducts, getSubcribedProuduct, getSubscriptions]);

  useEffect(() => {
    if (connected) fetchProducts();
  }, [fetchProducts, connected]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          if (Platform.OS === 'ios') {
            const isTestEnvironment = __DEV__;

            const appleReceiptResponse = await validateReceiptIos(
              {
                'receipt-data': receipt,
                password: itunesConnectSharedSecret,
              },
              isTestEnvironment,
            );

            if (appleReceiptResponse) {
              const {
                status,
              } = appleReceiptResponse as ReceiptValidationResponse;

              if (status === ReceiptValidationStatus.SUCCESS)
                try {
                  await finishTransaction(
                    purchase,
                    consumableSkus.includes(purchase.productId),
                  );

                  addPurchaseRecord(
                    user,
                    purchase,
                    appleReceiptResponse.receipt,
                  );
                } catch (ackErr) {
                  console.warn('ackErr', ackErr);
                }
            }

            return;
          }

          if (Platform.OS === 'android')
            try {
              const body = {
                packageName: 'com.dooboolab.app',
                productId: purchase.productId,
                productToken: purchase.purchaseToken as string,
                type: !!purchase.autoRenewingAndroid,
              };

              const response = await fetch(
                `${androidIAPEndPoint}/validateGoogleIAP`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                  },
                  body: JSON.stringify(body),
                },
              );

              const androidReceipt = await response.json();

              if (androidReceipt) {
                const {purchaseState} = androidReceipt;

                if (purchaseState === PurchaseStateAndroid.PURCHASED) {
                  await finishTransaction(
                    purchase,
                    consumableSkus.includes(purchase.productId),
                  );

                  addPurchaseRecord(user, purchase, androidReceipt);
                }
              }

              return;
            } catch (err) {
              console.log('error', JSON.stringify(err));
            }
        }
      }
    };

    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, user]);

  useEffect(() => {
    if (currentPurchaseError)
      Alert.alert(
        'purchase error',
        JSON.stringify(currentPurchaseError?.message),
      );
  }, [currentPurchaseError, currentPurchaseError?.message]);

  const purchase = (item: Product | Subscription): void => {
    if (item.type === 'iap') requestPurchase(item.productId);
    else requestSubscription(item.productId);
  };

  const renderIntro = (): ReactElement => {
    return (
      <StyledText
        style={{
          fontSize: 14,
          color: theme.primary,
          fontWeight: 'bold',
          marginTop: 48,
          marginLeft: 12,
          marginBottom: 8,
          textAlign: 'center',
          lineHeight: 18,
          paddingHorizontal: 32,
        }}>
        {fbt(
          // eslint-disable-next-line max-len
          'Your sponsoring will be noted in our homepage and app when transaction is completed 🎉. Your interests will make our community much valuable 🙏.',
          'transaction warning note',
        )}
      </StyledText>
    );
  };

  const renderWarningTextBox = (): ReactElement => {
    return (
      <StyledText
        style={{
          fontSize: 12,
          color: theme.negative,
          marginTop: 16,
          marginLeft: 12,
          marginBottom: 8,
          textAlign: 'center',
          paddingHorizontal: 20,
        }}>
        {fbt(
          'Note that once purchased, it will not be refunded. Please watch out before you continue transactions.',
          'transaction warning note',
        )}
      </StyledText>
    );
  };

  return (
    <Container>
      <ScrollView>
        {renderIntro()}
        <View
          style={{
            alignSelf: 'stretch',
            paddingTop: 20,
            paddingBottom: 40,
            backgroundColor: theme.background,
            marginHorizontal: 16,
          }}>
          {itemTypes.map((type) => {
            return (
              <ListContainer key={type}>
                <StyledText
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginTop: 32,
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
                    borderRadius: 8,
                  }}
                  contentContainerStyle={{
                    paddingVertical: 28,
                    backgroundColor: theme.paper,
                    paddingHorizontal: 40,
                  }}>
                  {type === 'onetime'
                    ? sortedProducts.map((item, i) => {
                        if (membershipSkus.includes(item.productId)) return;

                        return (
                          <IAPCard
                            key={i.toString()}
                            price={parseFloat(item.price)}
                            priceString={item.localizedPrice}
                            name={item.title}
                            icon={IC_COFFEE}
                            style={{marginRight: 16}}
                            onPress={() => purchase(item)}
                          />
                        );
                      })
                    : type === 'subscription'
                    ? sortedSubscriptions.map((item, i) => {
                        return (
                          <IAPCard
                            type="subscription"
                            key={i.toString()}
                            price={parseFloat(item.price)}
                            priceString={item.localizedPrice}
                            name={
                              item.productId === subscribedProductId
                                ? fbt('Subscribing', 'subscribing')
                                : item.title
                            }
                            icon={IC_DOOBOO_IAP}
                            style={{marginRight: 16}}
                            subscribed={item.productId === subscribedProductId}
                            onPress={() => purchase(item)}
                          />
                        );
                      })
                    : sortedProducts.map((item, i) => {
                        if (consumableSkus.includes(item.productId)) return;

                        return (
                          <IAPCard
                            type="forever"
                            key={i.toString()}
                            price={parseFloat(item.price)}
                            priceString={item.localizedPrice}
                            name={item.title}
                            icon={IC_LOGO}
                            style={{marginRight: 16}}
                            onPress={() => purchase(item)}
                          />
                        );
                      })}
                </ScrollView>
                {renderWarningTextBox()}
              </ListContainer>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
};

export default withScreen(Sponsor);
