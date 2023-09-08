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
} from 'native-base';
import {useRef} from 'react';
import {Platform, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useColorScheme from '../../../hooks/useColorScheme';
import {AuthProp} from '../../../navigation/types';
import AuthButtons from '../AuthButtons';

const RegisterScreen = () => {
  const PasswordRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);
  const currTheme = useColorScheme();
  const navigation = useNavigation<AuthProp>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={5} px={5} pt={5} h="full" maxW="450px">
          <Spacer />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Sign Up
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
            returnKeyType="next"
            ref={PasswordRef}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              ConfirmPasswordRef.current && ConfirmPasswordRef.current.focus();
            }}
          />
          <Input
            placeholder="Confirm Password"
            returnKeyType="done"
            ref={ConfirmPasswordRef}
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
            <Text>Already have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text color="constants.primary" fontWeight={600}>
                Log In
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
