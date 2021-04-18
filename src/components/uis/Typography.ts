import styled, {css} from '@emotion/native';

export const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: futura;
  font-weight: 700;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 40px;
    `}
`;

export const SubTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: avenir;
  font-weight: 800;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 28px;
    `}
`;

export const Description = styled.Text`
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  max-width: 60%;
  color: ${({theme}): string => theme.text};
  font-family: avenir;
  font-weight: 300;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 20px;
    `}
`;

export const SubDescription = styled.Text`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  max-width: 70%;
  color: ${({theme}): string => theme.text};
  font-family: avenir;
  font-weight: 300;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 14px;
      line-height: 20px;
    `}
`;
