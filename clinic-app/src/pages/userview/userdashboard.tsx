import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { useGlobalContext } from '../../context/globalcontext';
import { Props } from '../../navigator/props';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const { user } = useGlobalContext();

  if (!user) {
    return // user is DEADDDDDD
  }
  return (
    <View>
      <Text>
        Welcome, {user.username}
      </Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <TouchableOpacity onPress={() => navigation.navigate('UserReservation', { date: selectedDate })}>
        Book Appointment
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserCurrentAppointments', { date: selectedDate })}>
        View Current Appointments
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserHistory')}>
        View Previous Appointments
      </TouchableOpacity>
    </View >
  );
};

export default UserDashboard;
