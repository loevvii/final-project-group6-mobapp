import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../../components/CalendarPicker';
import { getGlobalStyles } from '../../styles/globalstyles';

const DoctorDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const styles = getGlobalStyles(); // NEW: it just grabs global styles its. yeah.  y ep

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
    <View>
      <Text>Book an Appointment</Text>

      <Text>Select Date:</Text>
      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <Text>Patient Name:</Text>
      <TextInput
        placeholder="Enter patient name"
        value={patientName}
        onChangeText={setPatientName}
      />

      <Button title={`Select Time: ${time.toLocaleTimeString()}`} onPress={() => setShowTimePicker(true)} />

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <View>
        <Button title="Book Appointment" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default DoctorDashboard;