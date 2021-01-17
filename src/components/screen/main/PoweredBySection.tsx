import {Description, SubTitle} from '../../ui/Text';
import React, {FC} from 'react';
import {ThemeType, useTheme} from '../../../providers/ThemeProvider';

import Hoverable from '../../../utils/Hoverable';
import {Linking} from 'react-native';
import {fbt} from 'fbt';
import styled from 'styled-components/native';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 200px;
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
`;

type Props = {};

const PoweredBySection: FC<Props> = () => {
  const {theme} = useTheme();

  return (
    <Container>
      <SubTitle>
        <fbt desc="powered by">Powered by</fbt>
      </SubTitle>
      <Description
        style={{
          lineHeight: 60,
        }}>
        <fbt desc="everyone in">Everyone in</fbt>
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
                  {color: theme.primary, fontWeight: 'bold'},
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
