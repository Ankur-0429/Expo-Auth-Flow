import {Feather, Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from 'expo-blur';
import {Box, Card, Spinner, Avatar, Pressable, Text} from 'native-base';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {RootTabParamList, RootProp} from './types';
import {auth} from '../constants/firebaseConfig';
import useCachedUserData from '../hooks/useCachedUserData';
import useColorScheme from '../hooks/useColorScheme';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const {user, isLoading} = useCachedUserData({uid: auth.currentUser!.uid});
  const navigation = useNavigation<RootProp>();
  const colorScheme = useColorScheme();
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
                  {user?.profileImageUrl ? (
                    <Avatar
                      boxSize="10"
                      alignItems="center"
                      source={{uri: user.profileImageUrl}}
                    />
                  ) : (
                    <Ionicons
                      name="person-circle-sharp"
                      size={40}
                      color={colorScheme === 'dark' ? 'white' : 'black'}
                    />
                  )}
                </Pressable>
              )}
            </Box>
          );
        },
        headerBackground: () => {
          return Platform.OS === 'ios' ? (
            <BlurView intensity={50} style={StyleSheet.absoluteFill} />
          ) : (
            <Box style={StyleSheet.absoluteFill} />
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

export default BottomTabNavigator;
