import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {sendEmailVerification} from 'firebase/auth';
import {useEffect} from 'react';

import {auth} from '../../../constants/firebaseConfig';
import {AuthProp} from '../../../navigation/types';

export default function useVerify() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<AuthProp>();

  //   useEffect(() => {
  //     if (isFocused) {
  //       if (!auth.currentUser) {
  //         go_back_to_login();
  //       } else {
  //         send_email_verification();
  //       }
  //     }
  //   }, [isFocused]);

  const go_back_to_login = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const send_email_verification = () => {
    if (!auth.currentUser) {
      go_back_to_login();
      return;
    }
    sendEmailVerification(auth.currentUser);
  };

  const if_email_verified = () => {
    return auth.currentUser && auth.currentUser.emailVerified;
  };

  return {
    send_email_verification,
    if_email_verified,
    go_back_to_login,
    email: auth.currentUser?.email,
  };
}
