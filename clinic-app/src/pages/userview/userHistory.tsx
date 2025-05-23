import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, FlatList } from 'react-native';
import { Props } from '../../navigator/props';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';

const UserHistory: React.FC<Props> = ({ navigation }) => {
  const { reservations, user } = useGlobalContext();
  const styles = getGlobalStyles();

  return (
    <View>
      <Text>
        Previous Appointments
      </Text>

      <FlatList
        data={reservations.filter(r => r.accId === user!.id && r.status === 'completed')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentContainer}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Reason: {item.reason}</Text>
          </View>
        )}
      />
    </View >
  );
};

export default UserHistory;
