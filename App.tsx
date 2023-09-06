import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseWrapper>
        <Navigation />
        <StatusBar style="auto" />
      </NativeBaseWrapper>
    </SafeAreaProvider>
  );
}
