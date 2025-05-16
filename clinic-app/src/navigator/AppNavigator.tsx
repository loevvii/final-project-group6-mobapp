import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import globalprovider from '../global/globalcontext.tsx';
import doctordashboard from '../pages/doctorview/dashboard/doctordashboard.tsx';

const Stack = createNativeStackNavigator();

const AppNavigator=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home"
                    component ={doctordashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator;