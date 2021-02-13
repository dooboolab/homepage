import {StyleProp, TextStyle} from 'react-native';

import {SFC} from 'react';
import firebase from 'firebase';

export type User = {
  uid: firebase.User['uid'];
  email: firebase.User['email'];
  displayName: firebase.User['displayName'];
  emailVerified: firebase.User['emailVerified'];
  photoURL: firebase.User['photoURL'];
  introduction?: string;
};

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
