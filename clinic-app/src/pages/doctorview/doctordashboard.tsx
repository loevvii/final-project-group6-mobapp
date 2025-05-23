import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { getGlobalStyles } from '../../styles/globalstyles';
import { useGlobalContext } from '../../context/globalcontext';

const DoctorDashboard: React.FC<Props> = ({ route, navigation }) => {
  const styles = getGlobalStyles();

  const [selectedDate, setSelectedDate] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const { user } = useGlobalContext();

  if (!user) {
    return
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>

        <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <Text style={styles.header}>Welcome, {user.username}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('DoctorAppointments')}
        >
          <Text style={styles.buttonText}>View Current Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
