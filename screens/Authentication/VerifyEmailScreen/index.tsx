import * as IntentLauncher from 'expo-intent-launcher';
import {
  Button,
  Text,
  Spacer,
  VStack,
  HStack,
  Pressable,
  Box,
} from 'native-base';
import {Platform} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {SafeAreaView} from 'react-native-safe-area-context';

import useVerify from './useVerify';

const handleOpenEmailboxAsync = async () => {
  if (Platform.OS === 'ios') {
    try {
      await openInbox();
    } catch (error) {
      console.error(`OpenEmailbox > iOS Error > ${error}`);
    }
  }

  if (Platform.OS === 'android') {
    const activityAction = 'android.intent.action.MAIN';
    const intentParams: IntentLauncher.IntentLauncherParams = {
      category: 'android.intent.category.APP_EMAIL',
    };
    IntentLauncher.startActivityAsync(activityAction, intentParams);
  }
};

const VerifyEmailScreen = () => {
  const verify = useVerify();

  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack space={5} px={5} pt={5} h="full" maxW="450px">
        <Spacer />

        <Box>
          <Text fontSize="3xl" fontWeight="bold">
            Check your inbox
          </Text>
          <Text color="constants.greyText">
            We sent an email to{' '}
            <Text fontWeight="bold" color="constants.primary">
              {verify.email}
            </Text>{' '}
            with a link that'll log you in
          </Text>
        </Box>

        <Spacer />

        <Button
          borderRadius={15}
          h={12}
          onPress={() => {
            handleOpenEmailboxAsync();
          }}
          _text={{fontSize: 18}}
          color="constants.primary">
          Open Mail App
        </Button>

        <HStack alignSelf="center" space={1}>
          <Text>No email in your inbox or spam folder?</Text>
          <Pressable
            onPress={() => {
              verify.send_email_verification();
            }}>
            <Text color="constants.primary" fontWeight={600}>
              Let's resend it
            </Text>
          </Pressable>
        </HStack>

        <HStack alignSelf="center" space={1}>
          <Text>Already have an account?</Text>
          <Pressable
            onPress={() => {
              verify.go_back_to_login();
            }}>
            <Text color="constants.primary" fontWeight={600}>
              Log In
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default VerifyEmailScreen;
