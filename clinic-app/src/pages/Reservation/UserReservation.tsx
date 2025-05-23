import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useGlobalContext } from '../../context/globalcontext';
import { getGlobalStyles } from '../../styles/globalstyles';
import uuid from 'react-native-uuid';
import { Props } from '../../navigator/props';
import { sendNotification, registerForPushNotificationsAsync } from '../../utils/notifications';
import { Formik } from 'formik';
import * as Yup from 'yup';

const timeSlots = {
  Morning: ['10:10 am', '10:30 am', '10:50 am', '11:20 am', '11:40 am'],
  Afternoon: ['02:00 pm', '02:20 pm', '02:40 pm'],
  Evening: ['07:00 pm', '07:20 pm', '07:40 pm', '08:00 pm', '08:20 pm'],
};

const validationSchema = Yup.object().shape({  // yk yup is such a fun name like why is it called yup again i kinda doint remember i just think its nice
  name: Yup.string().required('Name is required'),
  age: Yup.string().required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string().required('Contact number is required'),
  reason: Yup.string().required('Reason is required'),
}); // validation schema  my beloved

const UserReservation: React.FC<Props> = ({ route, navigation }) => {
  const styles = getGlobalStyles(); // styles... oh styles..
  const [selectedSlot, setSelectedSlot] = useState('');
  const { user, addReservation, updateReservation, reservations } = useGlobalContext();

  if (!user) return null;

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const routeDate = route.params.selectedDate;

  const existingReservation = reservations.find(
    (r) => r.accId === user.id && r.date === routeDate
  );

  useEffect(() => {
    if (existingReservation) setSelectedSlot(existingReservation.time);
  }, [existingReservation]);

  const takenSlots = reservations
    .filter(
      (r) =>
        r.status === 'approved' &&
        r.date === routeDate &&
        (!existingReservation || r.id !== existingReservation.id)
    )
    .map((r) => r.time.trim().toLowerCase());

  const handleSubmit = async (values: any) => {
    if (!selectedSlot) {
      Alert.alert('Please select a time slot.');
      return;
    }

    if (existingReservation) {
      const updated = {
        ...existingReservation,
        ...values,
        time: selectedSlot,
        status: 'pending',
      };
      updateReservation(updated);
      Alert.alert('Reservation updated!');
    } else {
      const newRes = {
        id: uuid.v4() as string,
        accId: user.id,
        date: routeDate,
        time: selectedSlot,
        status: 'pending',
        ...values,
      };
      addReservation(newRes, user.id);
      Alert.alert('Reservation submitted!');
    }

    navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] });

    await sendNotification(
      existingReservation ? 'Reservation Updated' : 'Reservation Made',
      `Reservation on ${routeDate}, ${selectedSlot} has been ${existingReservation ? 'updated' : 'made'}.`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {existingReservation ? 'Edit' : 'Booking for'} {routeDate}
      </Text>

      <Formik
        initialValues={{
          name: existingReservation?.name || '',
          age: existingReservation?.age || '',
          email: existingReservation?.email || '',
          contact: existingReservation?.contact || '',
          reason: existingReservation?.reason || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Full Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Age"
              keyboardType="numeric"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
            />
            {touched.age && errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              onChangeText={handleChange('contact')}
              onBlur={handleBlur('contact')}
              value={values.contact}
            />
            {touched.contact && errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

            <Text style={styles.label}>Reason for Appointment</Text>
            <TextInput
              style={[styles.formInput, { height: 80 }]}
              placeholder="Reason for Appointment"
              multiline
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              value={values.reason}
            />
            {touched.reason && errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

            {Object.entries(timeSlots).map(([period, slots]) => (
              <View key={period} style={styles.card}>
                <Text style={styles.subheader}>{period} Slots</Text>
                <View style={styles.buttonRow}>
                  {slots.map((slot) => {
                    const normalized = slot.trim().toLowerCase();
                    const isTaken = takenSlots.includes(normalized);

                    return (
                      <TouchableOpacity
                        key={slot}
                        onPress={() => !isTaken && setSelectedSlot(slot)}
                        disabled={isTaken}
                        style={[
                          styles.slotButton,
                          isTaken && styles.disabledSlot,
                          selectedSlot === slot && styles.selectedSlot,
                        ]}
                      >
                        <Text
                          style={[
                            styles.slotText,
                            isTaken && styles.disabledSlotText,
                            selectedSlot === slot && styles.selectedSlotText,
                          ]}
                        >
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {existingReservation ? 'Update Appointment' : 'Confirm Appointment'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default UserReservation;