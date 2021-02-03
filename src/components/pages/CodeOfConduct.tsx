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
  const {theme, media} = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.paper,
        paddingVertical: 40,
        paddingHorizontal: media.isDesktop ? 140 : 80,
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
        <fbt desc="code of conduct desc">
          We expect dooboolab's contributors to act professionally and
          respectfully. All contributors should have their own self-observation
          ability so that our environment can grow wisely.
        </fbt>
      </Text>
    </View>
  );
};

type MissionProps = {
  title: string;
  texts: string[];
};

const Mission: FC<MissionProps> = ({title, texts}) => {
  const {theme, media} = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: media.isDesktop ? 80 : 40,
        marginTop: 40,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SubTitle
        style={{
          color: theme.primary,
          fontSize: 20,
          marginTop: 24,
          marginBottom: 20,
        }}>
        {title}
      </SubTitle>
      <View
        style={[
          {
            paddingHorizontal: media.isDesktop ? 60 : 32,
            paddingVertical: 24,
            marginVertical: 24,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.border,
            alignSelf: 'center',

            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
          media.isTablet && {width: 660},
          media.isDesktop && {width: 800},
        ]}>
        {texts.map((text, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: theme.text,
                  marginTop: 3,
                  fontSize: 18,
                }}>
                •{' '}
              </Text>
              <Description
                style={{
                  textAlign: 'left',
                  fontSize: 16,
                  maxWidth: media.isMobile ? '95%' : '100%',
                }}>
                {text}
              </Description>
            </View>
          );
        })}
      </View>
    </View>
  );
};

type Props = {
  navigation: RootStackNavigationProps<'CodeOfConduct'>;
};

const CodeOfConduct: FC<Props> = () => {
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
              <fbt desc="code of conduct">Code of Conduct</fbt>
            </SubTitle>
          </BackgroundImage>
        </ImageWrapper>
        <Section />
        <MissionWrapper>
          <Mission
            title={fbt(
              'We expect all contributors to avoid bad behaviors affected by the bad culture',
              'code of conduct 1',
            )}
            texts={[
              fbt(
                'Discrimination. Equal treatment regardless of race, gender, age or sexual orientation',
                'code 1-1',
              ),
              fbt("Pointing out on other's appearance.", 'code 1-2'),
              fbt("Insulting one's parents or family members.", 'code 1-3'),
              fbt(
                // eslint-disable-next-line max-len
                "Any kind of negative office or workplace politics speaking on other's opinion rather than your own. Wrongfully judging and denoucing others.",
                'code 1-4',
              ),
              fbt(
                'Violence and agressive attitudes. We want all people to feel safe in our community.',
                'code 1-5',
              ),
              fbt('Belittling others.', 'code 1-6'),
              fbt('Copyright infringement.', 'code 1-7'),
            ]}
          />
          <Mission
            title={fbt(
              'We hope to contribute in creating a better world',
              'code of conduct 2',
            )}
            texts={[
              fbt('Respect people', 'code 2-1'),
              fbt('Don’t be afraid to speak up.', 'code 2-2'),
              fbt(
                'Help people rather than blaming. Anyone can make mistakes..',
                'code 2-3',
              ),
              fbt(
                'Grow with the community and take advantage of it.',
                'code 2-4',
              ),
              fbt('Try to be rational rather than emotional.', 'code 2-5'),
              fbt(
                'Improve communication skills, which is a challenge for everyone.',
                'code 2-6',
              ),
            ]}
          />
        </MissionWrapper>
        <Footer />
      </ScrollView>
    </Container>
  );
};

export default withScreen(CodeOfConduct);
