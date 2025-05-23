import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import uuid from 'react-native-uuid';
import { format } from 'date-fns';
import { Props } from '../../navigator/props';

const timeSlots = {
  Morning: ['10:10 am', '10:30 am', '10:50 am', '11:20 am', '11:40 am'],
  Afternoon: ['02:00 pm', '02:20 pm', '02:40 pm'],
  Evening: ['07:00 pm', '07:20 pm', '07:40 pm', '08:00 pm', '08:20 pm'],
};

const UserReservation: React.FC<Props> = ({ route, navigation }) => {
  const styles = getGlobalStyles();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const { user, addReservation, reservations } = useGlobalContext();

  if (!user) return null;

  const routeDate = route.params.selectedDate;
  // Normalize taken slots to lowercase trimmed for matching
  const takenSlots = reservations
    .filter((r) => r.status === 'approved' && r.date === routeDate)
    .map((r) => r.time.trim().toLowerCase());

  const handleSubmit = () => {
    if (!selectedSlot || !name || !age || !reason || !email || !contact) {
      Alert.alert('Please fill all fields and select a time slot.');
      return;
    }

    const newReservation = {
      id: uuid.v4() as string,
      accId: 'string',
      name,
      age,
      reason,
      email,
      contact,
      date: routeDate,
      time: selectedSlot,
      status: 'pending',
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Booking for {routeDate}</Text>
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
          keyboardType="email-address"
          autoCapitalize="none"
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
        
        {Object.entries(timeSlots).map(([period, slots]) => (
          <View key={period} style={styles.card}>
            <Text style={styles.subheader}>{period} Slots</Text>
            <View style={styles.buttonRow}>
              {slots.map((slot) => {
                const normalizedSlot = slot.trim().toLowerCase();
                const isTaken = takenSlots.includes(normalizedSlot);

                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => !isTaken && setSelectedSlot(slot)}
                    disabled={isTaken}
                    style={[
                      styles.slotButton,
                      isTaken && styles.disabledSlot,
                      selectedSlot === slot && styles.selectedSlot,
                    ]}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        isTaken && styles.disabledSlotText,
                        selectedSlot === slot && styles.selectedSlotText,
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

        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

export default UserReservation;
