import {Box, Input, VStack} from 'native-base';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const PasswordRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack space={5} px={5} pt={5} h="lg" maxW="450px">
        <Input
          placeholder="Email Address"
          returnKeyType="next"
          onSubmitEditing={() => {
            PasswordRef.current && PasswordRef.current.focus();
          }}
        />
        <Input
          placeholder="Password"
          returnKeyType="done"
          ref={PasswordRef}
          secureTextEntry
        />
      </VStack>
    </SafeAreaView>
  );
};

export default LoginScreen;
