import React from 'react';
import { Calendar } from 'react-native-calendars';
import { useGlobalContext } from '../context/globalcontext';
interface CalendarPickerProps {
  selectedDate: string;
  onDateChange: (dateString: string) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onDateChange }) => {
  const { user } = useGlobalContext();
  // if( rservation.accId === user.id) or filter or something
  return (
    <Calendar
      onDayPress={(day) => onDateChange(day.dateString)}
      markedDates={{
        [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
      }}
    />
  );
};

export default CalendarPicker;
