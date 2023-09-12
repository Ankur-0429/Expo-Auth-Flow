import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';

import {Themes} from './themes';
import {useCurrentTheme} from '../hooks/useCurrentTheme';

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
  const currTheme = useCurrentTheme();

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
    Card: {
      defaultProps: {
        backgroundColor: `${currTheme}.background`,
      },
    },
    Input: {
      defaultProps: {
        bg: `${currTheme}.textField`,
        borderColor: `${currTheme}.textField`,
        borderRadius: 15,
        fontSize: 18,
        height: 12,
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
        borderRadius: 15,
        fontSize: 18,
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
