import {Feather} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BlurView} from 'expo-blur';
import {
  Avatar,
  Box,
  Card,
  Pressable,
  Spinner,
  useTheme,
  Text,
} from 'native-base';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

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
import SettingsAccountScreen from '../screens/Settings/SettingsAccountScreen';
import SettingsAuthScreen from '../screens/Settings/SettingsAuthScreen';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {navigation} = props; // Destructure navigation from props
  const {colors} = useTheme();

  const uid = auth.currentUser?.uid || '';

  const {user} = useCachedUserData({uid});

  const navigateAndCloseDrawer = (screenName: string) => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <Pressable
        bg="transparent"
        px={3}
        onPress={() => navigateAndCloseDrawer('ProfileScreen')}>
        <Avatar size="lg" source={{uri: user?.profileImageUrl}} mb={2} />
        <Text fontSize={18} bold>
          {user?.firstName + ' ' + user?.lastName}
        </Text>
      </Pressable>
      <Box mt={5} backgroundColor="transparent">
        <DrawerItem
          label="Settings"
          icon={({color, size, focused}) => (
            <Feather
              name="settings"
              size={size}
              color={focused ? colors.constants.primary : color}
            />
          )}
          onPress={() => navigateAndCloseDrawer('Settings')}
        />
      </Box>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const Tab = createDrawerNavigator();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      drawerContent={CustomDrawerContent}
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
        component={() => {
          return <Text>Helo World</Text>;
        }}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="home" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

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
        screenOptions={{headerShown: false}}
        initialRouteName={checkAuth.isAuthenticated ? 'Root' : 'Login'}>
        {checkAuth.isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Root" component={DrawerNavigator} />
            <Stack.Screen
              name="Settings"
              component={SettingsAuthScreen}
              options={{
                headerTransparent: true,
                headerBlurEffect: 'systemThinMaterial',
              }}
            />
            <Stack.Screen
              name="Account"
              component={SettingsAccountScreen}
              options={{
                headerTransparent: true,
                headerBlurEffect: 'systemThinMaterial',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
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
