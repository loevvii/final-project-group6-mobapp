import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ApproveReservation from './src/pages/Reservation/ApproveReservation';
import UserReservation from './src/pages/Reservation/UserReservation';
import { GlobalProvider } from './src/global/globalcontext';

export default function App() {
  return (
   <GlobalProvider>

      <UserReservation/>
   </GlobalProvider>
      

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// insert a test here