import {onAuthStateChanged, User} from 'firebase/auth';
import {useState} from 'react';

import {auth} from '../constants/firebaseConfig';

export default function useIsAuthenticated() {
  const [user, setUser] = useState(null as User | null);

  onAuthStateChanged(auth, firebaseUser => {
    setUser(firebaseUser);
  });

  return {
    isAuthenticated: () => user !== null && user.emailVerified,
  };
}
