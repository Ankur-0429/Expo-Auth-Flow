import {Button, Text, Input, Spacer, VStack} from 'native-base';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const PasswordRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack space={5} px={5} pt={5} h="lg" maxW="450px">
        <Spacer />
        <Text fontSize="3xl" fontWeight="bold">
          Log In
        </Text>
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
        <Button
          borderRadius={15}
          h={12}
          _text={{fontSize: 18}}
          color="constants.primary">
          Login
        </Button>
        <Spacer />
      </VStack>
    </SafeAreaView>
  );
};

export default LoginScreen;
