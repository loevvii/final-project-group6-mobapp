import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { Props } from '../../navigator/props';
import { getGlobalStyles } from '../../styles/globalstyles'; 

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome, Username</Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.formButton, { marginBottom: 12 }]}
          onPress={() => navigation.navigate('UserReservation', { date: selectedDate })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.formButton, { marginBottom: 12, backgroundColor: '#6C9EFF' }]}
          onPress={() => navigation.navigate('UserCurrentAppointments', { date: selectedDate })}
        >
          <Text style={styles.buttonText}>View Current Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.formButton, { backgroundColor: '#aaa' }]}
          onPress={() => navigation.navigate('UserHistory')}
        >
          <Text style={styles.buttonText}>View Previous Appointments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserDashboard;
