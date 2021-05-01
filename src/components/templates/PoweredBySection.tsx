import {Description, SubTitle} from '../uis/Typography';
import {Linking, Platform} from 'react-native';
import React, {FC} from 'react';

import Hoverable from '../../utils/Hoverable';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useTheme} from 'dooboo-ui';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 160px;
  align-self: stretch;
  background-color: ${({theme}) => theme.paper};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkTouch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.text};
  text-decoration-line: underline;
`;

type Props = {};

const PoweredBySection: FC<Props> = () => {
  const {theme} = useTheme();

  return (
    <Container>
      <SubTitle
        style={{
          marginTop: 8,
        }}>
        <fbt desc="powered by">Powered by</fbt>
      </SubTitle>
      <Description
        style={{
          marginVertical: 12,
          textAlign: 'center',

          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <fbt desc="everyone">Everyone in</fbt>
        <Hoverable>
          {(isHovered) => (
            <LinkTouch
              style={{marginHorizontal: 10}}
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL(
                  'https://opencollective.com/dooboolab-community',
                )
              }>
              <LinkText
                style={[
                  isHovered && {
                    color: theme.heading,
                    textDecorationLine: 'underline',
                  },
                  {color: theme.accent},
                ]}>
                OpenCollectives
              </LinkText>
            </LinkTouch>
          )}
        </Hoverable>
      </Description>
    </Container>
  );
};

export default PoweredBySection;
