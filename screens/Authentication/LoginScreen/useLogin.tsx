import {signInWithEmailAndPassword} from 'firebase/auth';
import {useEffect, useState} from 'react';

import {auth} from '../../../constants/firebaseConfig';

export default function useLogin() {
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmailErr('');
  }, [email]);

  useEffect(() => {
    setPasswordErr('');
  }, [password]);

  const authenticate_login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        return Promise.resolve(1);
      })
      .catch(error => {
        setIsLoading(false);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailErr('Email Already in use');
            break;

          case 'auth/invalid-email':
            setEmailErr('Invalid email address');
            break;

          case 'auth/user-disabled':
            setEmailErr('User account is disabled');
            break;

          case 'auth/user-not-found':
            setEmailErr('User not found');
            break;

          case 'auth/wrong-password':
            setPasswordErr('Wrong password');
            break;

          default:
            break;
        }
      });
  };

  return {
    authenticate_login,
    passwordErr,
    emailErr,
    ifEmailErr: emailErr !== '',
    ifPasswordErr: passwordErr !== '',
    isloading,
    email,
    password,
    setEmail,
    setPassword,
  };
}
