import {onAuthStateChanged, onIdTokenChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';

import {auth} from '../constants/firebaseConfig';

export default function useIsAuthenticated() {
  const [ifAuth, setIfAuth] = useState(false);

  useEffect(() => {
    console.log(auth);
    setIfAuth(auth.currentUser !== null && auth.currentUser.emailVerified);
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, user => {
      if (user) {
        setIfAuth(user.emailVerified);
      } else {
        setIfAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log(user);
      if (user) {
        setIfAuth(user.emailVerified);
      } else {
        setIfAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isAuthenticated: ifAuth,
  };
}
