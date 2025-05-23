import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { getGlobalStyles } from '../../styles/globalstyles';

const DoctorDashboard: React.FC = () => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  const onTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const onSubmit = () => {
    if (!selectedDate || !patientName) {
      alert('Please fill all fields.');
      return;
    }
    alert(`Appointment booked for ${patientName} on ${selectedDate} at ${time.toLocaleTimeString()}`);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Doctor Dashboard</Text>

        <Text style={styles.subheader}>Select Date:</Text>
        <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <Text style={styles.subheader}>Patient Name:</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter patient name"
          placeholderTextColor="#888"
          value={patientName}
          onChangeText={setPatientName}
        />

        <TouchableOpacity
          style={[styles.formButton, { marginBottom: 12 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.buttonText}>Select Time: {time.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity
          style={[styles.formButton, styles.confirmButton]}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DoctorDashboard;
