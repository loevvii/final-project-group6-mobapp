import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useGlobalContext } from '../../global/globalcontext';
import uuid from 'react-native-uuid';

const timeSlots = {
  Morning: ['10:10 am', '10:30 am', '10:50 am', '11:20 am', '11:40 am'],
  Afternoon: ['02:00 pm', '02:20 pm', '02:40 pm'],
  Evening: ['07:00 pm', '07:20 pm', '07:40 pm', '08:00 pm', '08:20 pm']
};

export default function UserReservation() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const { addReservation } = useGlobalContext();

  const handleSubmit = () => {
    if (!selectedSlot || !name || !age || !reason || !email || !contact) {
      Alert.alert('Please fill all fields and select a time slot.');
      return;
    }

    const newReservation = {
      id: uuid.v4(),
      name,
      age,
      reason,
      email,
      contact,
      date: date.toISOString().split('T')[0], 
      time: selectedSlot,
      status: 'pending'
    };

    addReservation(newReservation);
    Alert.alert('Reservation submitted!');
    setSelectedSlot('');
    setName('');
    setAge('');
    setReason('');
    setEmail('');
    setContact('');
    setDate(new Date());
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Appointment</Text>
      <View style={styles.infoSection}>
        <Text style={styles.subHeading}>Patient Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Reason for Appointment"
          value={reason}
          onChangeText={setReason}
          multiline
        />

        <Text style={styles.subHeading}>Select Appointment Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}
      </View>

      {Object.entries(timeSlots).map(([period, slots]) => (
        <View key={period} style={styles.slotGroup}>
          <Text style={styles.slotGroupTitle}>{period} Slots</Text>
          <View style={styles.slotRow}>
            {slots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotButton,
                  selectedSlot === slot && styles.selectedSlot
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={selectedSlot === slot ? styles.selectedSlotText : styles.slotText}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F9FC'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  infoSection: {
    backgroundColor: '#E9F1FF',
    padding: 15,
    borderRadius: 12
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  slotGroup: {
    marginBottom: 10
  },
  slotGroupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  slotButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#D0D0D0'
  },
  selectedSlot: {
    backgroundColor: '#1E60F0',
    borderColor: '#1E60F0'
  },
  slotText: {
    color: '#333'
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  confirmButton: {
    backgroundColor: '#1E60F0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
