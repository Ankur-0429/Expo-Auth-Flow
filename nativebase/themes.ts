import customStyleDark from '../constants/mapStyle/customStyleDark';
import customStyleLight from '../constants/mapStyle/customStyleLight';

export interface ThemeProps {
  navigation: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  map: any;
  background: string;
  text: string;
  textField: string;
  error: string;
}

const constants = {
  primary: '#1DA1F2',
  transparentDark: 'rgba(0, 0, 0, 0.5)',
};

const LightTheme: ThemeProps = {
  navigation: {
    primary: '#1DA1F2',
    background: '#FFFFFF',
    card: '#F6F6F6',
    text: '#000',
    border: '#888',
    notification: '#FF881E',
  },
  map: customStyleLight,
  background: 'rgba(247, 248, 250, 1)',
  text: '#000',
  textField: '#f7f7f7',
  error: '#FF8A8A',
};

const DarkTheme: ThemeProps = {
  navigation: {
    primary: '#1DA1F2',
    background: '#05121F',
    card: '#1E2F47',
    text: '#E5E6E7',
    border: 'transparent',
    notification: '#FF881E',
  },
  map: customStyleDark,
  background: 'rgba(13, 28, 45, 1)',
  text: '#E5E6E7',
  textField: '#1E2F47',
  error: '#FF8A8A',
};

export const Themes = {
  light: LightTheme,
  dark: DarkTheme,
  constants,
};

export type ThemeType = 'light' | 'dark';
