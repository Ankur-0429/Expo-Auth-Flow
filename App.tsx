import {StatusBar} from 'expo-status-bar';

import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

export default function App() {
  return (
    <NativeBaseWrapper>
      <Navigation />
      <StatusBar style="auto" />
    </NativeBaseWrapper>
  );
}
