import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from './hooks/useCurrentTheme';
import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NativeBaseWrapper>
          <Navigation />
          <StatusBar style="auto" />
        </NativeBaseWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
