import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import { Props } from '../../navigator/props';

const UserCurrentAppointments: React.FC<Props> = ({ navigation }) => {
  const { reservations, user } = useGlobalContext();
  const [category, setCategory] = useState('pending');
  const styles = getGlobalStyles();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const categories = ['pending', 'approved', 'rejected', 'cancelled', 'completed', 'missed'];
  const filtered = reservations.filter(r => r.accId === user!.id && r.status === category);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{capitalize(category)} Appointments</Text>

      <View style={styles.tabContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.tabButton,
              category === cat && styles.activeTab
            ]}
          >
            <Text style={[
              styles.tabText,
              category === cat && styles.activeTabText
            ]}>
              {capitalize(cat)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.noReservations}>No {category} appointments.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>Date: <Text style={styles.detail}>{item.date}</Text></Text>
              <Text style={styles.name}>Time: <Text style={styles.detail}>{item.time}</Text></Text>
              <Text style={styles.name}>Reason: <Text style={styles.detail}>{item.reason}</Text></Text>
              <Text style={[styles.status, styles[`${item.status}Status`] || styles.detail]}>
                Status: {capitalize(item.status)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default UserCurrentAppointments;
