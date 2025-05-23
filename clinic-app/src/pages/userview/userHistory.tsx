import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import { Props } from '../../navigator/props';

const UserHistory: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>
        User History
      </Text>
    </View >
  );
};

export default UserHistory;
