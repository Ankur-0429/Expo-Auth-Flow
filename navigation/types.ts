import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Account: undefined;
};

export type DrawerTabParamList = {
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerTabParamList> | undefined;
  Settings: undefined;
  Account: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Verify: undefined;
  AddName: undefined;
  AddProfileImage: {firstName: string; lastName: string; dateOfBirth: string};
};

export type AuthProp = NativeStackNavigationProp<AuthStackParamList>;
export type RootProp = DrawerNavigationProp<RootStackParamList>;
