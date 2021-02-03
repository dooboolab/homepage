import {Description, SubTitle} from '../UI/Typography';
import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Footer from '../UI/molecules/Footer';
import Header from '../UI/molecules/Header';
import {IMG_SYMBOL} from '../../utils/Icons';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import styled from 'styled-components/native';
import {useTheme} from '../../providers/ThemeProvider';
import {withScreen} from '../../utils/wrapper';

// eslint-disable-next-line
fbt;

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ImageWrapper = styled.View`
  min-height: 300px;
  align-self: stretch;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  padding: 0 24px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MissionWrapper = styled.View`
  padding: 20px 0;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section: FC = () => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.paper,
        paddingVertical: 40,
        paddingHorizontal: 80,
      }}>
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'avenir',
          lineHeight: 24,
          textAlign: 'center',
        }}>
        <fbt desc="vision and mission desc">
          dooboolab wishes to help out those who are in trouble of making better
          society. We are a group of experts who contribute to various platforms
          and open source projects to work publicly for creating benefits.
        </fbt>
      </Text>
    </View>
  );
};

type MissionProps = {
  title: string;
  text: string;
};

const Mission: FC<MissionProps> = ({title, text}) => {
  const {theme, media} = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 80,
        marginTop: 40,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SubTitle
        style={{
          color: theme.primary,
          fontSize: 26,
        }}>
        {title}
      </SubTitle>
      <View
        style={[
          {
            paddingHorizontal: 60,
            paddingVertical: 24,
            marginVertical: 24,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.border,
            alignSelf: 'stretch',

            justifyContent: 'center',
            alignItems: 'center',
          },
          media.isDesktop && {width: 800},
        ]}>
        <Description
          style={{
            textAlign: 'center',
            fontSize: 16,
            maxWidth: '100%',
          }}>
          {text}
        </Description>
      </View>
    </View>
  );
};

type Props = {
  navigation: RootStackNavigationProps<'VisionAndMission'>;
};

const VisionAndMission: FC<Props> = () => {
  return (
    <Container>
      <Header hideMenus />
      <ScrollView style={{width: '100%'}}>
        <ImageWrapper>
          <BackgroundImage
            source={IMG_SYMBOL}
            resizeMode="cover"
            imageStyle={{
              opacity: 0.7,
            }}>
            <SubTitle
              style={{
                marginTop: 200,
                fontSize: 32,
              }}>
              <fbt desc="vision and mission">Vision & Mission</fbt>
            </SubTitle>
          </BackgroundImage>
        </ImageWrapper>
        <Section />
        <MissionWrapper>
          <Mission
            title="01"
            text={fbt(
              'We wish to get connected with great people who meet our vision, which is making a better society.',
              'mission 1',
            )}
          />
          <Mission
            title="02"
            text={fbt(
              // eslint-disable-next-line max-len
              'When faced with limitations in pursing innovation, feel free to contact us. However, please adhere with our Code of Conduct below.',
              'mission 2',
            )}
          />
          <Mission
            title="03"
            text={fbt(
              // eslint-disable-next-line max-len
              'Our goal is to make a just society. Though this may be nearly impossible to fully achieve, we will communicate with others, share our experience and spread ideas to achieve this goal. We are willing to embrace change as we meet with other’s experience and stories.',
              'mission 3',
            )}
          />
          <Mission
            title="04"
            text={fbt(
              // eslint-disable-next-line max-len
              'We wish to grow together with multiple stakeholders working in various fields.',
              'mission 4',
            )}
          />
          <Mission
            title="05"
            text={fbt(
              'We wish to bring justice. Therefore, we will participate in public work as much as possible.',
              'mission 5',
            )}
          />
          <Mission
            title="06"
            text={fbt(
              'We want to become a strong open source community for individuals, companies, and group of societies.',
              'mission 6',
            )}
          />
          <Mission
            title="07"
            text={fbt(
              'Finally, our mission is to contribute in making a reasonable society.',
              'mission 7',
            )}
          />
        </MissionWrapper>
        <Footer />
      </ScrollView>
    </Container>
  );
};

export default withScreen(VisionAndMission);
