import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { useGlobalContext } from '../../context/globalcontext';
import { Props } from '../../navigator/props';
import { getGlobalStyles } from '../../styles/globalstyles';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const { user } = useGlobalContext();

  if (!user) return null; // no undead rendering :)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome, {user.username}</Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('UserReservation', { date: selectedDate })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('UserCurrentAppointments', { date: selectedDate })}
        >
          <Text style={styles.buttonText}>View Current Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('UserHistory')}
        >
          <Text style={styles.buttonText}>View Previous Appointments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserDashboard;
