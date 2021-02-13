const useIAP = (): Record<string, unknown> => ({
  connected: true,
  getProducts: jest.fn(),
  getSubscriptions: jest.fn(),
  products: [],
  subscriptions: [],
});

export {useIAP};
