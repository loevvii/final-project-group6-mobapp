import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import { Props } from '../../navigator/props';

const UserCurrentAppointments: React.FC<Props> = ({ route, navigation }) => {
    const { selectedDate } = route.params; // Get job details from navigation props

  return (
    <View>
      <Text>
        Current Appointments {selectedDate}
      </Text>
    </View >
  );
};

export default UserCurrentAppointments;
