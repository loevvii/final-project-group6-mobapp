import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity, FlatList } from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import { Props } from '../../navigator/props';

const UserCurrentAppointments: React.FC<Props> = ({ navigation }) => {
  const { reservations, user } = useGlobalContext();
  const styles = getGlobalStyles();
  const [category, setCategory] = useState('Current');
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (!user) {
    return
  }
  return (
    <View>
      <TouchableOpacity onPress={() => setCategory('pending')}>
        <Text> Pending </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory('approved')}>
        <Text>Approved</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory('rejected')}>
        <Text>Rejected</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory('cancelled')}>
        <Text>Cancelled</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory('completed')}>
        <Text>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory('missed')}>
        <Text>Missed</Text>
      </TouchableOpacity>
      <Text>{capitalize(category)} Appointments</Text>

      <FlatList
        data={reservations.filter(r => r.accId === user!.id && r.status === category)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentContainer}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View >
  );
};

export default UserCurrentAppointments;
