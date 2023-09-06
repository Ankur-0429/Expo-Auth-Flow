import {Feather} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BlurView} from 'expo-blur';
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import {
  RootStackParamList,
  RootTabParamList,
  AuthStackParamList,
} from './types';
import useIsAuthenticated from './useIsAuthenticated';
import LoginScreen from '../screens/Authentication/LoginScreen/LoginScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

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

const CreateTitleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Ro</Text>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerTransparent: true,
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
          tabBarIcon: ({color, focused}) => {
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
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Group>
        <Stack.Screen name="CreateTitle" component={CreateTitleScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
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
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      {isAuthenticated.isAuthenticated() ? (
        <RootNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;