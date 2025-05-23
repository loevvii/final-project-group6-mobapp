import { StyleSheet } from 'react-native';

export const getGlobalStyles = () =>
  StyleSheet.create({
    squareButtonGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    },

    squareButton: {
      width: '48%',
      aspectRatio: 1,
      backgroundColor: '#9D7AC4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      padding: 10,
    },

    squareButtonContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    squareButtonIcon: {
      marginBottom: 6,
    },

    squareButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },

    login: {
      justifyContent: 'center',
    },

    container: {
      backgroundColor: '#fff', // soft lavender background
      paddingHorizontal: 20,
      paddingTop: 20,
      flexGrow: 1, 
      paddingBottom: 20
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#E8DFF5', // pastel lavender
      borderRadius: 10,
      overflow: 'hidden',
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
    },
    tabText: {
      fontSize: 16,
      color: '#5A4E7C', // muted lavender
    },
    activeTab: {
      backgroundColor: '#9D7AC4', // dark lavender
    },
    activeTabText: {
      color: '#fff',
      fontWeight: '600',
    },
    scrollContent: {
      paddingBottom: 40,
    },

    buttonGroup: {
      marginTop: 20,
      flexDirection: 'column',
      gap: 12,
      paddingHorizontal: 8,
    },
    primaryButton: {
      backgroundColor: '#9D7AC4',
      paddingVertical: 18,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    secondaryButton: {
      backgroundColor: '#BFA2DB',
      paddingVertical: 18,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    disabled: {
      backgroundColor: '#ddd',
      opacity: 0.6,
    },
    disabledButton: {
      backgroundColor: '#ddd',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      opacity: 0.6,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 18,
    },

    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 15,
      shadowColor: '#7E6CA6',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#D9CBE8',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#5A4E7C',
    },
    detail: {
      fontSize: 14,
      color: '#6B5A8E',
    },
    status: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 8,
    },
    approvedStatus: {
      color: '#7B68EE', // soft indigo accent
    },
    pendingStatus: {
      color: '#B57EDC', // soft purple
    },
    buttonRow: {
      marginTop: 12,
      // Add these flexbox properties:
  flexDirection: 'row',   // layout items horizontally
  flexWrap: 'wrap',       // allow items to wrap to next line
  justifyContent: 'flex-start',  // align items at start of each line
  alignItems: 'flex-start',      // align items at top of each line
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    approveButton: {
      backgroundColor: '#9D7AC4',
    },
    rejectButton: {
      backgroundColor: '#C89EC4', // soft mauve
    },
    noReservations: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#777',
    },
    headerGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',  // pushes children to opposite ends
      alignItems: 'center',             // vertically center texts if needed
      paddingHorizontal: 16,            // optional padding
      paddingVertical: 8,
    },
    headerRight: {
      color: '#fff',
      backgroundColor: '#9D7AC4',
      padding: 6,
      borderRadius: 12,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#9D7AC4',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center',
    },
    subheader: {
      fontSize: 18,
      fontWeight: '600',
      color: '#5A4E7C',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: '#8D77A7',
      marginBottom: 6,
    },
    formInput: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#D9CBE8',
      marginBottom: 12,
    },
    formButton: {
      backgroundColor: '#9D7AC4',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    confirmButton: {
      backgroundColor: '#7E6CA6',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    slotButton: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#D0C6E3',
      backgroundColor: '#fff',
      marginRight: 10,
      marginBottom: 10,
    },
    selectedSlot: {
      backgroundColor: '#9D7AC4',
      borderColor: '#9D7AC4',
    },
    slotText: {
      fontSize: 14,
      color: '#5A4E7C',
    },
    selectedSlotText: {
      color: '#fff',
      fontWeight: '600',
    },
    disabledSlot: {
      backgroundColor: '#F1ECF9',
      borderColor: '#E0D4F5',
    },
    disabledSlotText: {
      color: '#aaa',
    },

    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#7E6CA6',
      shadowOpacity: 0.06,
      shadowRadius: 5,
      elevation: 3,
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    calendarHeaderText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#9D7AC4',
    },
    weekDaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    weekDay: {
      fontSize: 14,
      color: '#A390BF',
      textAlign: 'center',
      flex: 1,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    dayCell: {
      width: '13%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
      borderRadius: 8,
    },
    dayText: {
      fontSize: 14,
      color: '#5A4E7C',
    },
    todayCell: {
      backgroundColor: '#E3D1F5',
    },
    selectedDayCell: {
      backgroundColor: '#9D7AC4',
    },
    selectedDayText: {
      color: '#fff',
      fontWeight: '600',
    },
    disabledDayText: {
      color: '#ccc',
    },
  });

/* mari's stuff
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
*/