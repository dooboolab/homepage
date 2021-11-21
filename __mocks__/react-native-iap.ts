const useIAP = (): Record<string, unknown> => ({
  connected: true,
  getProducts: jest.fn(),
  getSubscriptions: jest.fn(),
  products: [],
  subscriptions: [],
});

const withIAPContext = jest.fn();

export {useIAP, withIAPContext};
