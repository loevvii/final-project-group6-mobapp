import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity, FlatList } from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import { Props } from '../../navigator/props';

const UserCurrentAppointments: React.FC<Props> = ({ navigation }) => {
  const { reservations, user } = useGlobalContext();
  const [ category, setCategory ] = useState('current');
  const styles = getGlobalStyles();
  
  return (
    <View>
      <Text>
        Current Appointments
      </Text>

      <FlatList
        data={reservations.filter(r => r.accId === user!.id && r.status != 'completed')}
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
