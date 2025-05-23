// when i look at this, something tells me i should've just made another component for dashboards with conditionals for doctors and users but oh well, life i guess
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { getGlobalStyles } from '../../styles/globalstyles';
import { useGlobalContext } from '../../context/globalcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DoctorDashboard: React.FC<Props> = ({ route, navigation }) => {
  const styles = getGlobalStyles();
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1); // make sthe first word  capital, this too i should've made a component cause i used it in like 6 more pages
  const [selectedDate, setSelectedDate] = useState('');
  const { user, reservations, logout } = useGlobalContext();
  if (!user) {
    return
  }

  const ListHeader = () => (
    <>
      <Text style={styles.header}>Welcome, Dr. {user.username}!</Text>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <View style={styles.headerGroup}>
        <Text style={styles.header}>
          <Icon name="event" size={18} color="purple" /> Appointments
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DoctorAppointments')}
        >
          <Text style={styles.headerRight}>View All</Text>
        </TouchableOpacity>
      </View>

      {reservations.length === 0 && <Text style={[styles.detail, styles.card]}>No appointments here!</Text>}
    </>
  );

  const ListFooter = () => (
    <View style={styles.squareButtonGroup}>
      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => navigation.navigate('DoctorAppointments')}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="check-circle" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>View Appointments</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.squareButton}
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
          logout();
        }}
      >
        <View style={styles.squareButtonContent}>
          <Icon name="logout" size={28} color="white" style={styles.squareButtonIcon} />
          <Text style={styles.squareButtonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View >
  );

  return (
    <FlatList
      data={reservations}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      renderItem={({ item }) => (
        <View style={[styles.card, { marginHorizontal: 16 }]}>
          <Text style={styles.name}>{item.date} - {item.time}</Text>
          <Text style={styles.detail}>Reason: {item.reason}</Text>
          <Text style={styles.detail}>Status: {capitalize(item.status)}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      ListFooterComponentStyle={{ paddingBottom: 20 }}
    />
  );
};

export default DoctorDashboard;
