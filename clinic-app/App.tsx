import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigator/AppNavigator';
import { GlobalProvider } from './src/context/globalcontext';

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <AppNavigator />
      </SafeAreaView>
    </GlobalProvider>
  );
}