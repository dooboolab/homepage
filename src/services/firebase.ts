import firebase from 'firebase';

export const signInWithEmail = (
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOut = (): Promise<void> => {
  return firebase.auth().signOut();
};

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const sendPasswordResetEmail = (email: string): Promise<void> => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const updateCurrentUserProfile = async (
  data: Record<string, unknown>,
): Promise<void> => {
  const currentUser = firebase.auth().currentUser;

  if (currentUser)
    return firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set(
        {...data},
        {
          merge: true,
        },
      );
};
