import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { Props } from '../../navigator/props';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <View>
      <Text>
        Welcome, Username
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
