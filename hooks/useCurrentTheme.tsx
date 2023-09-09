import {ReactNode, createContext, useContext} from 'react';

import useColorScheme from './useColorScheme';

const ThemeContext = createContext('light' as 'light' | 'dark');

export function useCurrentTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({children}: {children: ReactNode}) {
  const currentTheme = useColorScheme(); // Use your theme hook here

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
