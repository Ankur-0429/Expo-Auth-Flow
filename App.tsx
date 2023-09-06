import {GluestackUIProvider, config} from '@gluestack-ui/themed';
import {StatusBar} from 'expo-status-bar';

import Navigation from './navigation';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Navigation />
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
