import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  const onDateChange = (day: any) => {
    setSelectedDate(day.dateString);
  };

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
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Book an Appointment</Text>

      <Text style={{ marginBottom: 5 }}>Select Date:</Text>
      <Calendar
        onDayPress={onDateChange}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />

      <Text style={{ marginTop: 20 }}>Patient Name:</Text>
      <TextInput
        placeholder="Enter patient name"
        value={patientName}
        onChangeText={setPatientName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 5,
          marginBottom: 20,
          borderRadius: 5,
        }}
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

      <View style={{ marginTop: 30 }}>
        <Button title="Book Appointment" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default DoctorDashboard;
