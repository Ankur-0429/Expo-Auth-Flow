import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  Text,
  Input,
  Spacer,
  VStack,
  HStack,
  Pressable,
  KeyboardAvoidingView,
  Box,
  FormControl,
  Divider,
} from 'native-base';
import {useRef, useState} from 'react';
import {Platform, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useName from './useName';
import {useCurrentTheme} from '../../../../hooks/useCurrentTheme';

const AddNameScreen = () => {
  const LastNameRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);
  const name = useName();
  const currTheme = useCurrentTheme();

  const [date, setDate] = useState(new Date());

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={5} px={5} pt={5} h="full" maxW="450px">
          <Spacer />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Add Name
            </Text>
          </Box>

          <FormControl isInvalid={name.ifFirstNameErr}>
            <Input
              placeholder="First Name"
              returnKeyType="next"
              value={name.firstName}
              onChangeText={text => {
                name.setFirstName(text);
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                LastNameRef.current && LastNameRef.current.focus();
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {name.firstNameErr}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={name.ifLastNameErr}>
            <Input
              placeholder="Last Name"
              returnKeyType="next"
              value={name.lastName}
              onChangeText={text => {
                name.setLastName(text);
              }}
              ref={LastNameRef}
              onSubmitEditing={() => {
                ConfirmPasswordRef.current &&
                  ConfirmPasswordRef.current.focus();
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {name.lastNameErr}
            </FormControl.ErrorMessage>
          </FormControl>

          <VStack>
            <Divider mb={3} />

            <HStack
              bg={currTheme + '.textField'}
              borderColor={currTheme + '.textField'}
              borderRadius={15}
              px={3}
              h={12}>
              <Text my="auto" fontSize={18} color="constants.greyText">
                Date of birth
              </Text>
              <DateTimePicker
                mode="date"
                display="default"
                value={date}
                onChange={(_, d) => {
                  if (d) {
                    setDate(d);
                  }
                }}
              />
              <Spacer />
            </HStack>
          </VStack>

          <Button
            borderRadius={15}
            h={12}
            _text={{fontSize: 18}}
            onPress={() => {
              name.handle_add_name();
            }}
            color="constants.primary">
            Next
          </Button>

          <Spacer />

          <HStack alignSelf="center" space={1}>
            <Text>Already have an account?</Text>
            <Pressable
              onPress={() => {
                name.go_back_to_login();
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

export default AddNameScreen;
