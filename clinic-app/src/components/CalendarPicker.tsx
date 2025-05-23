import React from 'react';
import { Calendar } from 'react-native-calendars';

interface CalendarPickerProps {
  selectedDate: string;
  onDateChange: (dateString: string) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onDateChange }) => {
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
