import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { useGlobalContext } from '../../context/globalcontext';
import { Props } from '../../navigator/props';
import { getGlobalStyles } from '../../styles/globalstyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const { user, reservations } = useGlobalContext();
  const data = reservations.filter(r => r.accId === user!.id);
  if (!user) return null;

  // Header content above the appointments list
  const ListHeader = () => (
    <>
      <Text style={styles.header}>Welcome, {user.username}</Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <View style={styles.headerGroup}>
        <Text style={styles.header}>
          <Icon name="event" size={18} color="purple" /> Upcoming Appointments
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserCurrentAppointments')}
        >
          <Text style={styles.headerRight}>View All</Text>
        </TouchableOpacity>
      </View>

      {data.length === 0 && <Text>No appointments here!</Text>}
    </>
  );

  // Footer or Buttons below the list
  const ListFooter = () => (
    <View style={styles.squareButtonGroup}>
      <TouchableOpacity
        style={selectedDate ? styles.squareButton : [styles.squareButton, styles.disabled]}
        onPress={() => navigation.navigate('UserReservation', { selectedDate })}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="event" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>Book</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => navigation.navigate('UserCurrentAppointments')}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="check-circle" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>View Appointments</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => navigation.navigate('UserHistory')}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="history" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>History</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => navigation.navigate('UserHistory')}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="logout" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      renderItem={({ item }) => (
        <View style={styles.dashboardAppointment}>
          <Text>Upcoming Appointment:</Text>
          <Text>{item.date} - {item.time}</Text>
          <Text>Reason: {item.reason}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      // optionally add padding bottom for footer buttons
      ListFooterComponentStyle={{ paddingBottom: 20 }}
    />
  );
};

export default UserDashboard;
