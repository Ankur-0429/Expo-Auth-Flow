import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';
import {useColorScheme} from 'react-native';

import {Themes} from './themes';

interface NativeBaseWrapperProps {
  children: React.ReactNode;
}

const customTheme = extendTheme({
  colors: Themes,
});

type CustomThemeType = typeof customTheme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

const NativeBaseWrapper = ({children}: NativeBaseWrapperProps) => {
  const currTheme = useColorScheme();

  console.log(currTheme);

  const components = {
    Text: {
      defaultProps: {
        color: `${currTheme}.text`,
      },
    },
    Image: {
      defaultProps: {
        alt: 'image',
      },
    },
    Heading: {
      defaultProps: {
        color: `${currTheme}.text`,
      },
    },
    Box: {
      defaultProps: {
        backgroundColor: `${currTheme}.background`,
      },
    },
    Input: {
      defaultProps: {
        bg: `${currTheme}.textField`,
        borderColor: `${currTheme}.textField`,
        borderRadius: 10,
        fontSize: 16,
        invalidOutlineColor: `${currTheme}.error`,
        color: `${currTheme}.text`,
        varient: 'filled',
        placeholderTextColor: '#ababab',
      },
    },
    TextArea: {
      defaultProps: {
        placeholderTextColor: '#ababab',
        bg: `${currTheme}.textField`,
        borderColor: `${currTheme}.textField`,
        borderRadius: 10,
        fontSize: 16,
        invalidOutlineColor: `${currTheme}.error`,
        color: `${currTheme}.text`,
      },
    },
    Pressable: {
      defaultProps: {
        _pressed: {opacity: 0.8},
      },
    },
  };

  const theme = extendTheme({
    colors: Themes,
    components,
    config: {
      useSystemColorMode: true,
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export default NativeBaseWrapper;
