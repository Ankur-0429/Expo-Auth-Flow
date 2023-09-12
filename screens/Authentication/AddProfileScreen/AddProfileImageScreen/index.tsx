import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Text,
  Spacer,
  VStack,
  HStack,
  Pressable,
  KeyboardAvoidingView,
  Box,
} from 'native-base';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useProfile from './useProfile';
import {AuthProp} from '../../../../navigation/types';

const AddProfileImageScreen = () => {
  const navigation = useNavigation<AuthProp>();
  const profile = useProfile();

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={5} px={5} pt={5} h="full" maxW="450px">
          <Spacer />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Add Profile Image
            </Text>
          </Box>

          <Button
            borderRadius={15}
            h={12}
            _text={{fontSize: 18}}
            onPress={() => {}}
            color="constants.primary">
            Next
          </Button>

          <Spacer />

          <HStack alignSelf="center" space={1}>
            <Text>Already have an account?</Text>
            <Pressable
              onPress={() => {
                profile.go_back_to_login();
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

export default AddProfileImageScreen;
