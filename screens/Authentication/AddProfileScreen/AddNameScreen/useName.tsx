import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import {AuthProp} from '../../../../navigation/types';

export default function useName() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const navigation = useNavigation<AuthProp>();

  useEffect(() => {
    setFirstNameErr('');
  }, [firstName]);

  useEffect(() => {
    setLastNameErr('');
  }, [lastName]);

  const go_back_to_login = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handle_add_name = () => {
    const namePattern = /^[a-zA-Z]+$/;

    if (firstName === '') {
      setFirstNameErr('First Name should not be empty');
      return;
    }

    if (lastName === '') {
      setLastNameErr('Last Name should not be empty');
      return;
    }

    if (!namePattern.test(firstName)) {
      setFirstNameErr('First Name should only contain letters');
      return;
    }

    if (!namePattern.test(lastName)) {
      setLastNameErr('Last Name should only contain letters');
    }
  };

  return {
    firstNameErr,
    lastNameErr,
    ifFirstNameErr: firstNameErr !== '',
    ifLastNameErr: lastNameErr !== '',
    firstName,
    lastName,
    setFirstName,
    setLastName,
    handle_add_name,
    go_back_to_login,
  };
}
