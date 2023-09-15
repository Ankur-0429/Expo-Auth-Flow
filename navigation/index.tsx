import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'native-base';
import React from 'react';

import DrawerNavigator from './DrawerNavigator';
import {RootStackParamList, AuthStackParamList} from './types';
import useIsAuthenticated from './useIsAuthenticated';
import {useCurrentTheme} from '../hooks/useCurrentTheme';
import AddNameScreen from '../screens/Authentication/AddProfileScreen/AddNameScreen';
import AddProfileImageScreen from '../screens/Authentication/AddProfileScreen/AddProfileImageScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import VerifyEmailScreen from '../screens/Authentication/VerifyEmailScreen';
import SettingsAccountScreen from '../screens/Settings/SettingsAccountScreen';
import SettingsAuthScreen from '../screens/Settings/SettingsAuthScreen';

const Navigation = () => {
  const checkAuth = useIsAuthenticated();
  const {colors} = useTheme();
  const currTheme = useCurrentTheme();

  const Stack = createNativeStackNavigator<
    RootStackParamList & AuthStackParamList
  >();

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: colors[currTheme].navigation.primary,
      background: colors[currTheme].navigation.background,
      card: colors[currTheme].navigation.card,
      text: colors[currTheme].navigation.text,
      border: colors[currTheme].navigation.border,
      notification: colors[currTheme].navigation.notification,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={checkAuth.isAuthenticated ? 'Root' : 'Login'}>
        {checkAuth.isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="Root"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Group
              screenOptions={{
                headerTransparent: true,
                headerBlurEffect: 'systemThinMaterial',
              }}>
              <Stack.Screen name="Settings" component={SettingsAuthScreen} />
              <Stack.Screen name="Account" component={SettingsAccountScreen} />
            </Stack.Group>
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                animationTypeForReplace: !checkAuth.isAuthenticated
                  ? 'pop'
                  : 'push',
              }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verify" component={VerifyEmailScreen} />
            <Stack.Screen name="AddName" component={AddNameScreen} />
            <Stack.Screen
              name="AddProfileImage"
              component={AddProfileImageScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
