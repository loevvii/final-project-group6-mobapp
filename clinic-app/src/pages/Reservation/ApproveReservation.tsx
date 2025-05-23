import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useGlobalContext } from '../../global/globalcontext';

export default function ApproveReservation() {
  const { reservations, approveReservation, removeReservation } = useGlobalContext();

  const handleApprove = (id: string) => {
    approveReservation(id);
    Alert.alert('Reservation approved!');
  };

  const handleReject = (id: string) => {
    removeReservation(id);
    Alert.alert('Reservation rejected.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Pending Reservations</Text>

      {reservations.length === 0 ? (
        <Text style={styles.noReservations}>No pending reservations.</Text>
      ) : (
        reservations.map((res) => (
          <View key={res.id} style={styles.card}>
            <Text style={styles.name}>{res.name}</Text>
            <Text style={styles.detail}>Age: {res.age}</Text>
            <Text style={styles.detail}>Reason: {res.reason}</Text>
            <Text style={styles.detail}>Date: {res.date}</Text>
            <Text style={styles.detail}>Time: {res.time}</Text>
            <Text style={styles.status}>Status: {res.status}</Text>

            {res.status === 'pending' && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.approveButton]}
                  onPress={() => handleApprove(res.id)}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.rejectButton]}
                  onPress={() => handleReject(res.id)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F9FC'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  noReservations: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 50
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  detail: {
    fontSize: 14,
    color: '#555'
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#333'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5
  },
  approveButton: {
    backgroundColor: '#1E60F0'
  },
  rejectButton: {
    backgroundColor: '#FF4D4D'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});
