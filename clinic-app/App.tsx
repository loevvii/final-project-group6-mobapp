import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigator/AppNavigator';
import { GlobalProvider } from './src/context/globalcontext';
import { useFonts } from 'expo-font';

export default function App() {
  useFonts({
    Montserrat: require('./assets/fonts/Montserrat.ttf')
  });

  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: "#fff" }}>
        <AppNavigator />
      </SafeAreaView>
    </GlobalProvider>
  );
}