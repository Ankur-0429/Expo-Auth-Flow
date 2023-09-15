import {Feather} from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Avatar, Box, Pressable, useTheme, Text} from 'native-base';
import React from 'react';

import BottomTabNavigator from './BottomTabNavigator';
import {auth} from '../constants/firebaseConfig';
import useCachedUserData from '../hooks/useCachedUserData';

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

export default DrawerNavigator;
