import {useNavigation} from '@react-navigation/native';

import {AuthProp} from '../../../../navigation/types';

export default function useProfile() {
  const navigation = useNavigation<AuthProp>();
  const go_back_to_login = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return {
    go_back_to_login,
  };
}
