import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { useGlobalContext } from '../../context/globalcontext';
import { Props } from '../../navigator/props';
import { getGlobalStyles } from '../../styles/globalstyles';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const { user, reservations, } = useGlobalContext();
  const data = reservations.filter(r => r.accId === user!.id);
  if (!user) return null; // no undead rendering :)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome, {user.username}</Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <View style={styles.headerGroup}>
        <Text style={styles.header}>Upcoming Appointments</Text>
        <Text style={styles.headerRight}>Show All</Text>
      </View>

      {data.length === 0 ? (
        <Text>No appointments here!</Text>
      ) : (
        <View>
          <FlatList style={styles.appointmentList}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.dashboardAppointment}>
                <Text>Upcoming Appointment:</Text>
                <Text>{item.date} - {item.time}</Text>
                <Text>Reason: {item.reason}</Text>
                <Text>Status: {item.status}</Text>
              </View>
            )}
          />
        </View>

      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('UserReservation', { selectedDate: selectedDate })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('UserCurrentAppointments', { selectedDate: selectedDate })}
        >
          <Text style={styles.buttonText}>View Current Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.disabledButton}
          onPress={() => navigation.navigate('UserHistory')}
        >
          <Text style={styles.buttonText}>View Previous Appointments</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDashboard;
