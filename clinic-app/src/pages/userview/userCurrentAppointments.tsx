import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import { Props } from '../../navigator/props';
import Icon from 'react-native-vector-icons/MaterialIcons';
const iconMap: Record<string, string> = {
  pending: 'access-time',
  approved: 'check-circle',
  rejected: 'cancel',
  cancelled: 'block',
  completed: 'done-all',
  missed: 'error',
};
const UserCurrentAppointments: React.FC<Props> = () => {
  const { reservations, user } = useGlobalContext();
  const styles = getGlobalStyles();
  const [category, setCategory] = useState('');
  const categories = ['pending', 'approved', 'rejected', 'cancelled', 'completed', 'missed'];
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (!user) return null;

  const currentReservations = reservations.filter(
    r => r.accId === user.id && r.status == category
  );

  return (
    <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Your {capitalize(category)} Appointments</Text>
      
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
            <Icon
              name={iconMap[cat] || 'help-outline'}
              size={24}
              color={category === cat ? 'white' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {currentReservations.length === 0 && category != '' ? (
        <Text style={styles.noReservations}>No {category} appointments found.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={currentReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { marginHorizontal: 16 }]}>
              <Text style={styles.name}>Date: {item.date}</Text>
              <Text style={styles.detail}>Time: {item.time}</Text>
              <Text style={styles.detail}>Reason: {item.reason}</Text>
              <Text
                style={[
                  styles.status,
                  item.status === 'approved'
                    ? styles.approvedStatus
                    : styles.pendingStatus,
                ]}
              >
                Status: {capitalize(item.status)}
              </Text>
            </View>
          )}
        />
      )}

    </SafeAreaView>
  );
};

export default UserCurrentAppointments;
