import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import {AuthProp} from '../../../../navigation/types';

export default function useProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImageLocalUrl, setProfileImageLocalUrl] = useState('');

  const navigation = useNavigation<AuthProp>();
  const go_back_to_login = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return {
    go_back_to_login,
    setFirstName,
    setLastName,
    setDateOfBirth,
    profileImageLocalUrl,
    setProfileImageLocalUrl,
  };
}
