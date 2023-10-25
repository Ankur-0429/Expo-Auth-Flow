import {hideAsync} from 'expo-splash-screen';
import {onAuthStateChanged, onIdTokenChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react';

import {auth, firestore} from '../constants/firebaseConfig';

export default function useIsAuthenticated() {
  const [ifAuth, setIfAuth] = useState(false);
  const [hasProfileData, setHasProfileData] = useState(false);

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, user => {
      if (user) {
        setIfAuth(user.emailVerified);
        checkIfProfileDataExists(user.uid);
      } else {
        setIfAuth(false);
        setHasProfileData(false);
      }
    });

    const unsubscribeIdToken = onIdTokenChanged(auth, user => {
      if (user) {
        checkIfProfileDataExists(user.uid);
        setIfAuth(user.emailVerified);
      } else {
        setIfAuth(false);
        setHasProfileData(false);
      }
    });

    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, []);

  const checkIfProfileDataExists = async (userId: string) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userData = await getDoc(userDocRef);

      if (userData.exists()) {
        setHasProfileData(true);
      } else {
        setHasProfileData(false);
      }
    } catch {
      setHasProfileData(false);
    }
  };

  new Promise(resolve => setTimeout(resolve, 400)).then(() => {
    hideAsync();
  });

  return {
    isAuthenticated: ifAuth && hasProfileData,
  };
}
