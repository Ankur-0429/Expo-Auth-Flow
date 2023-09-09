import {useNavigation} from '@react-navigation/native';
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
  FormControl,
} from 'native-base';
import {useRef} from 'react';
import {Platform, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useLogin from './useLogin';
import useColorScheme from '../../../hooks/useColorScheme';
import {AuthProp} from '../../../navigation/types';
import AuthButtons from '../AuthButtons';

const LoginScreen = () => {
  const PasswordRef = useRef<TextInput>(null);
  const currTheme = useColorScheme();
  const navigation = useNavigation<AuthProp>();
  const login = useLogin();

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
          <FormControl isInvalid={login.ifEmailErr}>
            <Input
              placeholder="Email Address"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={text => {
                login.setEmail(text);
              }}
              value={login.email}
              onSubmitEditing={() => {
                PasswordRef.current && PasswordRef.current.focus();
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {login.emailErr}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={login.ifPasswordErr}>
            <Input
              placeholder="Password"
              returnKeyType="done"
              type="password"
              onChangeText={text => {
                login.setPassword(text);
              }}
              value={login.password}
              ref={PasswordRef}
            />
            <FormControl.ErrorMessage pl={3}>
              {login.passwordErr}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            borderRadius={15}
            h={12}
            _text={{fontSize: 18}}
            isLoading={login.isloading}
            onPress={() => {
              login.authenticate_login();
            }}
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
            <Pressable
              onPress={() => {
                navigation.navigate('Register');
              }}>
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
