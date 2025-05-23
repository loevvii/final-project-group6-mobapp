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
                      Pending
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCategory('approved')}>
                      Approved
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCategory('rejected')}>
                      Rejected
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCategory('cancelled')}>
                      Cancelled
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCategory('completed')}>
                      Completed
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCategory('missed')}>
                      Missed
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
