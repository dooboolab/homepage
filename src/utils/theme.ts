export interface ThemeParam {
  light: Partial<Theme>;
  dark: Partial<Theme>;
}

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const colors = {
  black: 'black',
  white: 'white',
  charcoalGray: '#414141',
  gray: '#6D6D6D',
  cloud: '#C4C4C4',
  lightGray: '#EDEDED',
  brightTurquoise: '#00D9D5',
  ruddy: '#FF002E',
  yellow: '#FFEB14',
  blueberry: '#5398FF',
  harlequin: '#33FF2F',
  apple: '#151E22',
  google: '#E04238',
  facebook: '#345997',
  negative: '#ff7676',
  positive: '#00BA90',
  helioTrope: '#9A77FF',
  mauve: '#cfa7ff',
  fuchsiaBlue: '#664acb',
  eastBay: '#3d3f77',
  scampi: '#6b6aa6',
  downRiver: '#0c194b',
  magicMint: '#a5f4cc',
  babyBlue: '#d8ffff',
  deYork: '#74c19b',
  aquaMarine: '#44D1A6',
  salmon: '#FF7676',
  brownGray: '#999999',
  darkGray: '#00000070',
  mediumGray: '#00000030',
  paleViolet: '#F2F2F2',
  mineShaftDark: '#222222',
  mineShaft: '#333333',
  light: '#F3F3F3',
  success: '#00BA90',
};

export type Colors = typeof colors;

export const light = {
  background: colors.white,
  paper: '#EAEBF4',
  primary: '#393D7A',
  secondary: colors.brightTurquoise,
  danger: colors.ruddy,
  warning: colors.yellow,
  light: colors.lightGray,
  info: colors.blueberry,
  success: colors.harlequin,
  textPrimary: colors.black,
  placeholder: colors.gray,
  textDisabled: colors.charcoalGray,
  textValidation: colors.ruddy,
  accent: '#B446BF',
  link: '#393D7A',
  heading: '#393D7A',
  titleText: '#000000',
  subText: '#404040',
  text: '#000000',
  textContrast: '#D3D8E8',
  disabled: colors.mediumGray,
  border: '#EDEDED',
  positive: colors.success,
  negative: colors.negative,
};

export type Theme = typeof light;

export const dark: Theme = {
  background: '#232323',
  paper: '#2C2C2C',
  primary: '#8A96DC',
  secondary: colors.brightTurquoise,
  danger: colors.ruddy,
  warning: colors.yellow,
  light: colors.charcoalGray,
  info: colors.blueberry,
  success: colors.harlequin,
  textPrimary: colors.white,
  placeholder: colors.gray,
  textDisabled: colors.cloud,
  textValidation: colors.ruddy,
  accent: '#8A96DC',
  link: '#E0E0E0',
  heading: '#FFFFFF',
  titleText: '#8A96DC',
  subText: '#D3D8E8',
  text: '#D3D8E8',
  textContrast: '#000000',
  disabled: colors.mediumGray,
  border: '#EDEDED',
  positive: colors.success,
  negative: colors.negative,
};

export const theme = {
  light,
  dark,
};
