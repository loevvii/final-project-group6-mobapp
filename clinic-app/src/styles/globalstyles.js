import { SafeAreaView, StyleSheet } from 'react-native';
export const getGlobalStyles = () =>
  StyleSheet.create({
 container: {
      flex: 1,
      backgroundColor: '#E6F0FA',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#D1E5FF',
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
      color: '#444',
    },
    activeTab: {
      backgroundColor: '#1E60F0',
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
        backgroundColor: '#1E60F0',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
      },
      secondaryButton: {
        backgroundColor: '#4B7BE5',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
      },
      disabledButton: {
        backgroundColor: '#ccc',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.6,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
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
      borderColor: '#DDD',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    detail: {
      fontSize: 14,
      color: '#555',
    },
    status: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 8,
    },
    approvedStatus: {
      color: '#228B22',
    },
    pendingStatus: {
      color: '#FF8C00',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    approveButton: {
      backgroundColor: '#1E60F0',
    },
    rejectButton: {
      backgroundColor: '#FF4D4D',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    noReservations: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#666',
    },
   safeArea:{
      flex: 1,
      backgroundColor: '#E6F0FA',
      paddingHorizontal: 20,
      paddingTop: 20,
   },

    // --- Additional Global Styles ---
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1E60F0',
      marginBottom: 10,
    },
    subheader: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 6,
    },
    formInput: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#D0D0D0',
      marginBottom: 12,
    },
    formButton: {
      backgroundColor: '#1E60F0',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    confirmButton: {
      backgroundColor: '#1E60F0',
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
      borderColor: '#D0D0D0',
      backgroundColor: '#fff',  // White by default (no blue background)
      marginRight: 10,
      marginBottom: 10,
    },
    selectedSlot: {
      backgroundColor: '#1E60F0',  // Blue only when selected
      borderColor: '#1E60F0',
    },
    slotText: {
      fontSize: 14,
      color: '#333',  // Dark text by default
    },
    selectedSlotText: {
      color: '#fff',  // White text when selected
      fontWeight: '600',
    },
    disabledSlot: {
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
    },
    disabledSlotText: {
      color: '#aaa',
    },


    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
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
      color: '#1E60F0',
    },
    weekDaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    weekDay: {
      fontSize: 14,
      color: '#888',
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
      color: '#333',
    },
    todayCell: {
      backgroundColor: '#D1E5FF',
    },
    selectedDayCell: {
      backgroundColor: '#1E60F0',
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