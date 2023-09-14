import {Feather} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BlurView} from 'expo-blur';
import {Avatar, Box, Card, Pressable, Spinner, useTheme} from 'native-base';
import React from 'react';
import {Platform, StyleSheet, View, Image, ScrollView} from 'react-native';

import {
  RootStackParamList,
  RootTabParamList,
  AuthStackParamList,
  RootProp,
} from './types';
import useIsAuthenticated from './useIsAuthenticated';
import {auth} from '../constants/firebaseConfig';
import useCachedUserData from '../hooks/useCachedUserData';
import {useCurrentTheme} from '../hooks/useCurrentTheme';
import AddNameScreen from '../screens/Authentication/AddProfileScreen/AddNameScreen';
import AddProfileImageScreen from '../screens/Authentication/AddProfileScreen/AddProfileImageScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import VerifyEmailScreen from '../screens/Authentication/VerifyEmailScreen';

export const uri =
  'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri}} width={200} height={200} />
      </ScrollView>
    </View>
  );
};

const DrawerNavigator = () => {
  const Tab = createDrawerNavigator();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        overlayColor: 'rgba(0, 0, 0, 0.8)',
      }}>
      <Tab.Screen
        name="Initial"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({color, size, focused}) => {
            return (
              <Feather
                name="home"
                size={size}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const {user, isLoading} = useCachedUserData({uid: auth.currentUser!.uid});
  const navigation = useNavigation<RootProp>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerTransparent: true,
        headerLeft: () => {
          return (
            <Box ml={3}>
              {isLoading ? (
                <Card rounded="full" size="10">
                  <Spinner alignSelf="center" my="auto" size="sm" />
                </Card>
              ) : (
                <Pressable onPress={navigation.openDrawer}>
                  <Avatar
                    bg="constants.primary"
                    boxSize="10"
                    source={{uri: user?.profileImageUrl}}
                  />
                </Pressable>
              )}
            </Box>
          );
        },
        headerBackground: () => {
          return Platform.OS === 'ios' ? (
            <BlurView intensity={50} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={StyleSheet.absoluteFill} />
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="home" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verify" component={VerifyEmailScreen} />
      <Stack.Screen name="AddName" component={AddNameScreen} />
      <Stack.Screen name="AddProfileImage" component={AddProfileImageScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Navigation = () => {
  const checkAuth = useIsAuthenticated();
  const {colors} = useTheme();
  const currTheme = useCurrentTheme();

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
      {checkAuth.isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
