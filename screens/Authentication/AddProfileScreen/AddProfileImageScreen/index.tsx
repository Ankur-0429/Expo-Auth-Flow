import {AntDesign} from '@expo/vector-icons';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  Text,
  Spacer,
  VStack,
  HStack,
  Pressable,
  KeyboardAvoidingView,
  Box,
  useTheme,
  Card,
  Image,
} from 'native-base';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useProfile from './useProfile';
import BottomSheetImagePicker from '../../../../components/BottomSheetImagePicker';
import {useCurrentTheme} from '../../../../hooks/useCurrentTheme';
import {AuthStackParamList} from '../../../../navigation/types';

const AddProfileImageScreen = ({
  route,
}: NativeStackScreenProps<AuthStackParamList, 'AddProfileImage'>) => {
  const profile = useProfile();
  const currTheme = useCurrentTheme();
  const theme = useTheme();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      profile.setDateOfBirth(route.params.dateOfBirth);
      profile.setFirstName(route.params.firstName);
      profile.setLastName(route.params.lastName);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={5} px={5} pt={5} h="full" maxW="450px">
          <Spacer />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Pick a profile picture
            </Text>
          </Box>

          <Spacer />

          <BottomSheetImagePicker
            onImageSelected={image => {
              profile.setProfileImageLocalUrl(image);
            }}>
            <HStack alignSelf="center">
              <Card rounded="full" p={3}>
                {profile.profileImageLocalUrl ? (
                  <Image
                    source={{uri: profile.profileImageLocalUrl}}
                    width={200}
                    height={200}
                    rounded="full"
                  />
                ) : (
                  <AntDesign
                    name="adduser"
                    size={180}
                    style={{padding: 10}}
                    color={theme.colors[currTheme].text}
                  />
                )}
              </Card>
            </HStack>
          </BottomSheetImagePicker>

          <Spacer />

          <Button
            borderRadius={15}
            h={12}
            _text={{fontSize: 18}}
            isDisabled={profile.profileImageLocalUrl === ''}
            isLoading={profile.isLoading}
            onPress={profile.submit_profile}
            color="constants.primary">
            Next
          </Button>

          <Pressable
            alignSelf="center"
            onPress={() => {
              profile.setProfileImageLocalUrl('');
              profile.submit_profile();
            }}>
            <Text color="constants.primary">Skip for now</Text>
          </Pressable>

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
