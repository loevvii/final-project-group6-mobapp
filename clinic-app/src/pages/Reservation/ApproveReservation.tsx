import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { useGlobalContext } from '../../global/globalcontext';

export default function ApproveReservation() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const { reservations, approveReservation, removeReservation } = useGlobalContext();

  const handleApprove = (id: string) => {
    approveReservation(id);
    Alert.alert('Reservation approved!');
  };

  const handleReject = (id: string) => {
    removeReservation(id);
    Alert.alert('Reservation rejected.');
  };

  const filteredReservations = reservations.filter(
    (r) => r.status === activeTab
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'pending' && styles.activeTab
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'approved' && styles.activeTab
          ]}
          onPress={() => setActiveTab('approved')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'approved' && styles.activeTabText
            ]}
          >
            Approved
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredReservations.length === 0 ? (
          <Text style={styles.noReservations}>
            No {activeTab} reservations.
          </Text>
        ) : (
          filteredReservations.map((res) => (
            <View key={res.id} style={styles.card}>
              <Text style={styles.name}>{res.name}</Text>
              <Text style={styles.detail}>Age: {res.age}</Text>
              <Text style={styles.detail}>Reason: {res.reason}</Text>
              <Text style={styles.detail}>Date: {res.date}</Text>
              <Text style={styles.detail}>Time: {res.time}</Text>
              <Text
                style={[
                  styles.status,
                  res.status === 'approved'
                    ? styles.approvedStatus
                    : styles.pendingStatus
                ]}
              >
                Status: {res.status}
              </Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#D1E5FF',
    borderRadius: 10,
    overflow: 'hidden'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  tabText: {
    fontSize: 16,
    color: '#444'
  },
  activeTab: {
    backgroundColor: '#1E60F0'
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600'
  },
  scrollContent: {
    paddingBottom: 40
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
    borderColor: '#DDD'
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
    marginTop: 8
  },
  approvedStatus: {
    color: '#228B22'
  },
  pendingStatus: {
    color: '#FF8C00'
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
  },
  noReservations: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666'
  }
});
