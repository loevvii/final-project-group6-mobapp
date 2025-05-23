import React, { useRef, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// removed global provider cause we're gonna useGlobalContext instead but for no real reason other than "im used to it :joy:"
import { GlobalProvider } from '../context/globalcontext';
import DoctorDashboard from '../pages/doctorview/doctordashboard';
import DoctorAppointments from '../pages/doctorview/doctorViewAppointments';
import UserDashboard from '../pages/userview/userdashboard';
import LoginScreen from '../pages/login';
import ApproveReservationScreen from '../pages/Reservation/ApproveReservation';
import UserReservationScreen from '../pages/Reservation/UserReservation';
import UserCurrentAppointments from '../pages/userview/userCurrentAppointments';
import UserHistory from '../pages/userview/userHistory';
// at some point i stopped touching this so if anything broke  then that sucks ig

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: "Login"}} />
          <Stack.Screen name="UserHome" component={UserDashboard} options={{title: "Home"}} />
          <Stack.Screen name="DoctorHome" component={DoctorDashboard} options={{title: "Home"}} />
          <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} options={{title: "Appointments"}} />
          <Stack.Screen name="UserReservation" component={UserReservationScreen} options={{title: "Reservation"}} />
          <Stack.Screen name="UserCurrentAppointments" component={UserCurrentAppointments} options={{title: "Appointments"}} />
          <Stack.Screen name="UserHistory" component={UserHistory} options={{title: "History"}} />
          <Stack.Screen name="ApproveReservation" component={ApproveReservationScreen} options={{title: "Reservation"}} />


        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};
export default AppNavigator;