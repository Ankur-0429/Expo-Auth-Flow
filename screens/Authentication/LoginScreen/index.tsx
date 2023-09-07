import {
  Button,
  Text,
  Input,
  Spacer,
  VStack,
  Flex,
  Divider,
  HStack,
} from 'native-base';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useColorScheme from '../../../hooks/useColorScheme';
import AuthButtons from '../AuthButtons';

const LoginScreen = () => {
  const PasswordRef = useRef<TextInput>(null);
  const currTheme = useColorScheme();

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

        <HStack alignSelf="center" my={3}>
          <Divider
            bg={currTheme + '.text'}
            thickness="1"
            my="auto"
            mx="2"
            w="1/3"
            bgColor="constants.greyText"
            orientation="horizontal"
          />
          <Text color="constants.greyText">or</Text>
          <Divider
            bg={currTheme + '.text'}
            thickness="1"
            my="auto"
            mx="2"
            w="1/3"
            bgColor="constants.greyText"
            orientation="horizontal"
          />
        </HStack>

        <AuthButtons />

        <Spacer />
      </VStack>
    </SafeAreaView>
  );
};

export default LoginScreen;
