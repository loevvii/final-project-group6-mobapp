import React from 'react';
import { Calendar } from 'react-native-calendars';
import { useGlobalContext } from '../context/globalcontext';
import { format } from 'date-fns';

interface CalendarPickerProps {
  selectedDate: string;
  onDateChange: (dateString: string) => void;
  onDateStatusChange?: (
    status: 'approved' | 'completed' | 'other' | 'rejected' | 'cancelled' | null
  ) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onDateChange,
  onDateStatusChange,
}) => {
  const { user, reservations } = useGlobalContext();
  const today = format(new Date(), 'yyyy-MM-dd');

  if (!user) return null;

  const isDoctor = user.username === 'Doctor';
  const visibleReservations = isDoctor  // r u the doctor? if yes you see everything. if not you only see your self stuff yeah
    ? reservations
    : reservations.filter(
      (res) =>
        res.accId === user.id &&
        res.status !== 'cancelled' &&
        res.status !== 'rejected' &&
        res.status !== 'completed'
    );

  const markedDates: Record<string, any> = {};
  visibleReservations.forEach((res) => {
    markedDates[res.date] = {
      marked: true,
      dotColor: 'black',
    };
  });

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: 'purple',
    };
  }

  const onDayPress = ({ dateString }: { dateString: string }) => {
    onDateChange(dateString);

    if (!isDoctor && onDateStatusChange) {
      const match = reservations.find(
        (r) => r.accId === user.id && r.date === dateString
      );

      if (match) {
        if (
          match.status === 'approved' ||
          match.status === 'completed' ||
          match.status === 'rejected' ||
          match.status === 'cancelled'
        ) {
          onDateStatusChange(match.status);
        } else {
          onDateStatusChange('other');
        }
      } else {
        onDateStatusChange(null);
      }
    }
  };

  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={markedDates}
      minDate={today}
    />
  );
};

export default CalendarPicker;