import React, {FC} from 'react';

import {Description} from './Typography';
import Hoverable from '../../utils/Hoverable';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../providers/ThemeProvider';

// eslint-disable-next-line
fbt;

const Container = styled.View`
  min-height: 110px;
  padding: 12px 0;
  align-self: stretch;
  background-color: ${({theme}) => theme.background};

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const AddressColumn = styled.View`
  flex: 1;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CopyrightColumn = styled.View`
  flex: 1;
  padding: 4px 0;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkTouch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.accent};
  text-decoration-line: underline;
`;

const CopyrightText = styled.Text`
  margin-top: 10px;
  font-size: 10px;
  text-align: center;
  color: ${({theme}) => theme.text};
`;

type Props = {};

const Footer: FC<Props> = () => {
  const {theme} = useTheme();
  const year = new Date().getFullYear();
  const navigation = useNavigation<RootStackNavigationProps<'Home'>>();

  return (
    <Container>
      <AddressColumn>
        <Description
          style={{
            fontSize: 14,
          }}
        >
          <fbt desc="address">Address</fbt>
        </Description>
        <Description
          style={{
            marginTop: 4,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          <fbt desc="address value">
            7th Floor, Twin City Namsan Mountain, 366, Hangang-daero,
            Yongsan-gu, Seoul, Korea
          </fbt>
        </Description>
      </AddressColumn>
      <CopyrightColumn>
        <Hoverable>
          {(isHovered) => (
            <LinkTouch
              style={{marginHorizontal: 10}}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('VisionAndMission')}
            >
              <LinkText
                style={[
                  isHovered && {
                    color: theme.heading,
                    textDecorationLine: 'underline',
                  },
                ]}
              >
                <fbt desc="vision and mission">Vision & Mission</fbt>
              </LinkText>
            </LinkTouch>
          )}
        </Hoverable>
        <Hoverable>
          {(isHovered) => (
            <LinkTouch
              style={{marginHorizontal: 10, marginTop: 4}}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CodeOfConduct')}
            >
              <LinkText
                style={[
                  isHovered && {
                    color: theme.heading,
                    textDecorationLine: 'underline',
                  },
                ]}
              >
                <fbt desc="code of conduct">Code of conduct</fbt>
              </LinkText>
            </LinkTouch>
          )}
        </Hoverable>
        <CopyrightText>
          ©2017-{year}{' '}
          <fbt desc="vision and mission">dooboolab, All Rights Reserved</fbt>
        </CopyrightText>
      </CopyrightColumn>
    </Container>
  );
};

export default Footer;
