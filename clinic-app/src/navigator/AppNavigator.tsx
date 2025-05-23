import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// removed global provider cause we're gonna useGlobalContext instead but for no real reason other than "im used to it :joy:"
import DoctorDashboard from '../pages/doctorview/dashboard/doctordashboard';
import UserDashboard from '../pages/userview/dashboard/userdashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="DoctorHome" >
                    <Stack.Screen name="UserHome" component={UserDashboard} />
                    <Stack.Screen name="DoctorHome" component={DoctorDashboard} />
                </Stack.Navigator>
            </NavigationContainer>
    );
};
export default AppNavigator;