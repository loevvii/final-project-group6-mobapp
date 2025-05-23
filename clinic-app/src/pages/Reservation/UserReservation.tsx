import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Props } from '../../navigator/props';

const timeSlots = {
  Morning: ['10:10 am', '10:30 am', '10:50 am', '11:20 am', '11:40 am'],
  Afternoon: ['02:00 pm', '02:20 pm', '02:40 pm'],
  Evening: ['07:00 pm', '07:20 pm', '07:40 pm', '08:00 pm', '08:20 pm']
};

const UserReservation: React.FC<Props> = ({ route, navigation }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const styles = getGlobalStyles();
  const { selectedDate } = route.params;
  const { user, addReservation, reservations } = useGlobalContext();

  if (!user) return null;

  const formattedDate = format(date, 'yyyy-MM-dd');

  const takenSlots = reservations
    .filter((r) => r.status === 'approved' && r.date === formattedDate)
    .map((r) => r.time.trim().toLowerCase());

  const handleSubmit = () => {
    if (!selectedSlot || !name || !age || !reason || !email || !contact) {
      Alert.alert('Please fill all fields and select a time slot.');
      return;
    }

    const newReservation = {
      id: uuid.v4(),
      accId: 'string',
      name,
      age,
      reason,
      email,
      contact,
      date: formattedDate,
      time: selectedSlot,
      status: 'pending'
    };

    addReservation(newReservation, user.id);
    Alert.alert('Reservation submitted!');

    setSelectedSlot('');
    setName('');
    setAge('');
    setReason('');
    setEmail('');
    setContact('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Book Appointment</Text>

          <Text style={styles.subheader}>Patient Information</Text>

          <TextInput
            style={styles.formInput}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            style={[styles.formInput, { height: 80 }]}
            placeholder="Reason for Appointment"
            value={reason}
            onChangeText={setReason}
            multiline
          />

          <TouchableOpacity
            style={[styles.formButton, { marginBottom: 12 }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonText}>Select Date: {formattedDate}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {Object.entries(timeSlots).map(([period, slots]) => (
            <View key={period} style={{ marginVertical: 10 }}>
              <Text style={styles.subheader}>{period} Slots</Text>
              <View style={styles.buttonRow}>
                {slots.map((slot) => {
                  const normalizedSlot = slot.trim().toLowerCase();
                  const isTaken = takenSlots.includes(normalizedSlot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <TouchableOpacity
                      key={slot}
                      onPress={() => !isTaken && setSelectedSlot(slot)}
                      disabled={isTaken}
                      style={[
                        styles.button,
                        isSelected && styles.confirmButton,
                        isTaken && { backgroundColor: '#ccc' }
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          isTaken && { color: '#999' }
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.formButton, styles.confirmButton, { marginTop: 20 }]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserReservation;
