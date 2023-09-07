import {
  Button,
  Text,
  Input,
  Spacer,
  VStack,
  Divider,
  HStack,
  Pressable,
  KeyboardAvoidingView,
  Box,
} from 'native-base';
import {useRef} from 'react';
import {Platform, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useColorScheme from '../../../hooks/useColorScheme';
import AuthButtons from '../AuthButtons';

const LoginScreen = () => {
  const PasswordRef = useRef<TextInput>(null);
  const currTheme = useColorScheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={5} px={5} pt={5} h="full" maxW="450px">
          <Spacer />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Log In
            </Text>
          </Box>

          <Input
            placeholder="Email Address"
            returnKeyType="next"
            blurOnSubmit={false}
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

          <HStack alignSelf="center" space={1}>
            <Text>Don't have an account?</Text>
            <Pressable onPress={() => {}}>
              <Text color="constants.primary" fontWeight={600}>
                Sign Up
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
