import {Box, Input, InputField} from '@gluestack-ui/themed';

const LoginScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignContent="center">
      <Input variant="underlined" size="md">
        <InputField placeholder="Enter Text here" />
      </Input>
    </Box>
  );
};

export default LoginScreen;
