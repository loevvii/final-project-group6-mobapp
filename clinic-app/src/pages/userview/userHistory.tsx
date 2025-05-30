import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Props } from '../../navigator/props';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';

const UserHistory: React.FC<Props> = () => {
  const { reservations, user } = useGlobalContext();
  const styles = getGlobalStyles();
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (!user) return null;

  const completedReservations = reservations.filter(
    (r) =>
      r.accId === user.id &&
      (r.status === 'completed' || r.status === 'rejected' || r.status === 'cancelled')
  );


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Previous Appointments</Text>

      {completedReservations.length === 0 ? (
        <Text style={styles.noReservations}>No completed appointments found.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={completedReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>Date: {item.date}</Text>
              <Text style={styles.detail}>Time: {item.time}</Text>
              <Text style={styles.detail}>Reason: {item.reason}</Text>
              <Text style={styles.detail}>Status: {capitalize(item.status)}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default UserHistory;
