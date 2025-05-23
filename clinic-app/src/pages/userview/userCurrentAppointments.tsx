import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import { Props } from '../../navigator/props';

const UserCurrentAppointments: React.FC<Props> = () => {
  const { reservations, user } = useGlobalContext();
  const styles = getGlobalStyles();

  if (!user) return null;

  const currentReservations = reservations.filter(
    r => r.accId === user.id && r.status !== 'completed'
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Current Appointments</Text>

      {currentReservations.length === 0 ? (
        <Text style={styles.noReservations}>No current appointments found.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={currentReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
                Status: {item.status}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default UserCurrentAppointments;
