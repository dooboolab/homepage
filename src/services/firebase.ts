import {
  UserCredential,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordFire,
  sendPasswordResetEmail as sendPasswordResetEmailFire,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFire,
} from 'firebase/auth';
import {collection, doc, setDoc} from 'firebase/firestore';
import {fireAuth, firestore} from '../App';

export const signInWithEmail = (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPasswordFire(fireAuth, email, password);
};

export const signOut = (): Promise<void> => {
  return fireAuth.signOut();
};

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return createUserWithEmailAndPasswordFire(fireAuth, email, password);
};

export const sendPasswordResetEmail = (email: string): Promise<void> => {
  return sendPasswordResetEmailFire(fireAuth, email);
};

export const updateCurrentUserProfile = async (
  data: Record<string, unknown>,
): Promise<void> => {
  const currentUser = fireAuth.currentUser;

  if (currentUser) {
    const docRef = doc(firestore, `users/${currentUser.uid}`);

    return setDoc(docRef, {...data}, {merge: true});
  }
};
