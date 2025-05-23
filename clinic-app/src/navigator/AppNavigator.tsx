import React, { useRef, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// removed global provider cause we're gonna useGlobalContext instead but for no real reason other than "im used to it :joy:"
import { GlobalProvider } from '../context/globalcontext';
import DoctorDashboard from '../pages/doctorview/doctordashboard';
import UserDashboard from '../pages/userview/userdashboard';
import LoginScreen from '../pages/login';
import ApproveReservationScreen from '../pages/Reservation/ApproveReservation';
import UserReservationScreen from '../pages/Reservation/UserReservation';
import UserCurrentAppointments from '../pages/userview/userCurrentAppointments';
import UserHistory from '../pages/userview/userHistory';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="UserHome" component={UserDashboard} />
          <Stack.Screen name="DoctorHome" component={DoctorDashboard} />
          <Stack.Screen name="UserReservation" component={UserReservationScreen} />
          <Stack.Screen name="UserCurrentAppointments" component={UserCurrentAppointments} />
          <Stack.Screen name="UserHistory" component={UserHistory} />
          <Stack.Screen name="ApproveReservation" component={ApproveReservationScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};
export default AppNavigator;