import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { useGlobalContext } from '../../context/globalcontext';
import { Props } from '../../navigator/props';
import { getGlobalStyles } from '../../styles/globalstyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserDashboard: React.FC<Props> = ({ navigation }) => {
  const styles = getGlobalStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateStatus, setSelectedDateStatus] = useState<'approved' | 'completed' | 'other' | 'rejected' | 'cancelled' | null>(null);

  const { user, reservations, cancelReservation, logout } = useGlobalContext();
  const data = reservations.filter(r => r.accId === user!.id);
  const displayData = data.filter(r => r.status != 'cancelled' && r.status != 'rejected')
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (!user) return null;

  const ListHeader = () => (
    <>
      <Text style={styles.header}>Welcome, {user.username}!</Text>

      <CalendarPicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onDateStatusChange={setSelectedDateStatus}  // pass callback here
      />

      <View style={styles.headerGroup}>
        <Text style={styles.header}>
          <Icon name="event" size={18} color="purple" /> Appointments
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserCurrentAppointments')}>
          <Text style={styles.headerRight}>View All</Text>
        </TouchableOpacity>
      </View>
      {displayData.length === 0 && <Text style={[styles.detail, styles.card]}>No appointments here!</Text>}
    </>
  );

  const FooterButton = ({ icon, label, onPress, disabled, style }) => (
    <TouchableOpacity
      style={[styles.squareButton, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.squareButtonContent}>
        <Icon name={icon} size={28} color="white" style={styles.squareButtonIcon} />
        <Text style={styles.squareButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  const ListFooter = () => {
    // Check if user has appointment on selectedDate
    const appointment = data.find(r => r.date === selectedDate);

    // Determine button label & icon based on appointment status and if appointment exists
    let buttonLabel = 'Book';
    let buttonIcon = 'event';
    let buttonDisabled = !selectedDate;

    if (appointment) {
      if (selectedDateStatus === 'approved') {
        buttonLabel = 'Cancel';
        buttonIcon = 'cancel';
        buttonDisabled = false;
      } else if (selectedDateStatus === 'completed') {
        buttonLabel = 'Completed';
        buttonIcon = 'done-all';
        buttonDisabled = true;
      } else if (selectedDateStatus !== 'rejected' && selectedDateStatus !== 'cancelled') {
        // For other statuses, fallback to edit
        buttonLabel = 'Edit';
        buttonIcon = 'edit';
        buttonDisabled = false;
      }
    }

    const handlePress = () => {
      if (buttonLabel === 'Cancel' && appointment) {
        Alert.alert(
          'Confirm Cancellation',
          'Are you sure you want to cancel this appointment?',
          [
            { text: 'No', style: 'cancel' },
            {
              text: 'Yes',
              onPress: () => {
                cancelReservation(appointment.id)
              }
            },
          ],
          { cancelable: true }
        );
      } else if (buttonLabel === 'Edit' && appointment) {
        navigation.navigate('UserReservation', { selectedDate });
      } else if (buttonLabel === 'Book') {
        navigation.navigate('UserReservation', { selectedDate });
      }
    };

    return (
      <View style={styles.squareButtonGroup}>
        <FooterButton
          icon={buttonIcon}
          label={buttonLabel}
          onPress={handlePress}
          disabled={buttonDisabled}
        />
        <FooterButton
          icon="check-circle"
          label="View Appointments"
          onPress={() => navigation.navigate('UserCurrentAppointments')}
          disabled={false}
        />
        <FooterButton
          icon="history"
          label="History"
          onPress={() => navigation.navigate('UserHistory')}
          disabled={false}
        />
        <FooterButton
          icon="logout"
          label="Logout"
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
            logout();
          }}
          disabled={false}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={displayData}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      renderItem={({ item }) => (
        <View style={[styles.card, { marginHorizontal: 16 }]}>
          <Text style={styles.name}>{item.date} - {item.time}</Text>
          <Text style={styles.detail}>Reason: {item.reason}</Text>
          <Text style={[
            styles.status,
            item.status === 'approved'
              ? styles.approvedStatus
              : styles.pendingStatus,
          ]}>Status: {capitalize(item.status)}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      ListFooterComponentStyle={{ paddingBottom: 20 }}
    />
  );
};

export default UserDashboard;