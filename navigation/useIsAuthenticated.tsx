import {onAuthStateChanged, User} from 'firebase/auth';
import {useState, useEffect} from 'react';

import {auth} from '../constants/firebaseConfig';

export default function useIsAuthenticated() {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return {
    isAuthenticated: () => user !== null,
  };
}
