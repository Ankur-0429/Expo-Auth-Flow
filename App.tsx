import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from './hooks/useCurrentTheme';
import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NativeBaseWrapper>
            <BottomSheetModalProvider>
              <Navigation />
              <StatusBar style="auto" />
            </BottomSheetModalProvider>
          </NativeBaseWrapper>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
