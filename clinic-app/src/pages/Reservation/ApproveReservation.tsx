import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';

const ApproveReservation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const { reservations, approveReservation, rejectReservation } = useGlobalContext();
  const styles = getGlobalStyles(); // NEW: it just grabs global styles its. yeah.  y ep

  const handleApprove = (id: string) => {
    approveReservation(id);
    Alert.alert('Reservation approved!');
  };

  const handleReject = (id: string) => {
    rejectReservation(id);
    Alert.alert('Reservation rejected.');
  };

  const filteredReservations = reservations.filter(
    (r) => r.status === activeTab
  );

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setActiveTab('pending')}>
          <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('approved')}>
          <Text>Approved</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {filteredReservations.length === 0 ? (
          <Text>No {activeTab} reservations.</Text>
        ) : (
          filteredReservations.map((res) => (
            <View key={res.id}>
              <Text>{res.name}</Text>
              <Text>Age: {res.age}</Text>
              <Text>Reason: {res.reason}</Text>
              <Text>Date: {res.date}</Text>
              <Text>Time: {res.time}</Text>
              <Text>Status: {res.status}</Text>

              {res.status === 'pending' && (
                <View>
                  <TouchableOpacity onPress={() => handleApprove(res.id)}>
                    <Text>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleReject(res.id)}>
                    <Text>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ApproveReservation;