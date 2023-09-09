import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useEffect, useState} from 'react';

import {auth} from '../../../constants/firebaseConfig';
import {AuthProp} from '../../../navigation/types';

export default function useRegister() {
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<AuthProp>();

  useEffect(() => {
    setEmailErr('');
  }, [email]);

  useEffect(() => {
    setPasswordErr('');
    setConfirmPasswordErr('');
  }, [password, confirmPassword]);

  const authenticate_register = () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setPasswordErr('Passwords do not match');
      setConfirmPasswordErr('Passwords do not match');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          navigation.navigate('Verify');
        }
        return Promise.resolve(1);
      })
      .catch(error => {
        setIsLoading(false);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailErr('Email Already in Use');
            break;

          case 'auth/missing-password':
            setPasswordErr('Missing Password');
            break;

          case 'auth/invalid-email':
            setEmailErr('Invalid Email Address');
            break;

          case 'auth/user-disabled':
            setEmailErr('User Account Disabled');
            break;

          case 'auth/user-not-found':
            setEmailErr('User Not Found');
            break;

          case 'auth/wrong-password':
            setPasswordErr('Incorrect Password');
            break;

          case 'auth/weak-password':
            setPasswordErr('Weak Password (Minimum 6 characters)');
            break;

          case 'auth/network-request-failed':
            setEmailErr('Network Error - Please try again later');
            break;

          case 'auth/operation-not-allowed':
            setEmailErr('Operation Not Allowed - Please contact support');
            break;

          default:
            break;
        }
      });
  };

  return {
    authenticate_register,
    passwordErr,
    emailErr,
    confirmPasswordErr,
    ifEmailErr: emailErr !== '',
    ifPasswordErr: passwordErr !== '',
    ifConfirmPasswordErr: confirmPasswordErr !== '',
    isloading,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
  };
}
