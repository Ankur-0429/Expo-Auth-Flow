import {HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

import Google from '../../../assets/SignIn/Google';
import {useCurrentTheme} from '../../../hooks/useCurrentTheme';

const styles = StyleSheet.create({
  google: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  apple: {
    width: 230,
    height: 50,
    alignSelf: 'center',
  },
});

const AuthButtons = () => {
  const currTheme = useCurrentTheme();
  return (
    <Stack space={4}>
      <Pressable
        onPress={() => {}}
        bg={currTheme + '.navigation.card'}
        w="full"
        h={50}
        borderRadius={15}>
        <HStack justifyContent="center" my="auto" space={2}>
          <Google width={35} height={35} style={styles.google} />
          <Text
            my="auto"
            fontSize={18}
            fontWeight={600}
            color="constants.greyText">
            Continue with Google
          </Text>
        </HStack>
      </Pressable>
    </Stack>
  );
};

export default AuthButtons;
