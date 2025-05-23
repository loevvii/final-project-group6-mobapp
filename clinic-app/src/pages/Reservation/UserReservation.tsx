import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView
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
  const styles = getGlobalStyles(); // NEW: it just grabs global styles its. yeah.  y ep
  const { selectedDate } = route.params; // get date sent
  const { user, addReservation, reservations } = useGlobalContext();  // added user from global context

  if (!user) return;

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
    <SafeAreaView>
      <ScrollView>
        <Text>Appointment</Text>

        <View>
          <Text>Patient Information</Text>

          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            placeholder="Reason for Appointment"
            value={reason}
            onChangeText={setReason}
            multiline
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text>Select Date: {formattedDate}</Text>
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
        </View>

        {Object.entries(timeSlots).map(([period, slots]) => (
          <View key={period}>
            <Text>{period} Slots</Text>
            <View>
              {slots.map((slot) => {
                const normalizedSlot = slot.trim().toLowerCase();
                const isTaken = takenSlots.includes(normalizedSlot);

                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => {
                      if (!isTaken) setSelectedSlot(slot);
                    }}
                    disabled={isTaken}
                  >
                    <Text>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={handleSubmit}>
          <Text>Confirm Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserReservation;
