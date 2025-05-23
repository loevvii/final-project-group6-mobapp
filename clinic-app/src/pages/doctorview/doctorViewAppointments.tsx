import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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

const DoctorAppointments: React.FC<Props> = ({ navigation }) => {
  const {
    reservations,
    user,
    approveReservation,
    rejectReservation,
    completeReservation,
    cancelReservation
  } = useGlobalContext();
  const [category, setCategory] = useState('pending');
  const styles = getGlobalStyles();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const categories = ['pending', 'approved', 'rejected', 'cancelled', 'completed', 'missed'];

  const isDoctor = user?.username === 'Doctor';

  const filtered = reservations.filter((res) => res.status === category);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{capitalize(category)} Appointments</Text>

      <View style={styles.tabContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[styles.tabButton, category === cat && styles.activeTab]}
          >
            <Icon
              name={iconMap[cat] || 'help-outline'}
              size={24}
              color={category === cat ? 'white' : 'gray'}
            />
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
              <Text style={styles.name}>
                Date: <Text style={styles.detail}>{item.date}</Text>
              </Text>
              <Text style={styles.name}>
                Time: <Text style={styles.detail}>{item.time}</Text>
              </Text>
              <Text style={styles.name}>
                Reason: <Text style={styles.detail}>{item.reason}</Text>
              </Text>
              <Text style={[styles.status, styles[`${item.status}Status`] || styles.detail]}>
                Status: {capitalize(item.status)}
              </Text>

              {isDoctor && item.status === 'pending' && (
                <View style={[styles.buttonGroup, { justifyContent: 'center' }]}>
                  <TouchableOpacity onPress={() => approveReservation(item.id)}>
                    <Text style={[styles.primaryButton, { textAlign: 'center' }]}>
                      <Icon name="check" /> Approve
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => rejectReservation(item.id)}>
                    <Text style={[styles.secondaryButton, { textAlign: 'center' }]}>
                      <Icon name="cancel" /> Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {isDoctor && item.status === 'approved' && (
                <View style={[styles.buttonGroup, { justifyContent: 'center' }]}>
                  <TouchableOpacity onPress={() => completeReservation(item.id)}>
                    <Text style={[styles.primaryButton, { textAlign: 'center' }]}>
                      <Icon name="done" /> Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => cancelReservation(item.id)}>
                    <Text style={[styles.secondaryButton, { textAlign: 'center' }]}>
                      <Icon name="block" /> Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DoctorAppointments;
