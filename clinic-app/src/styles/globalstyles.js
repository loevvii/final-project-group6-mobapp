import { StyleSheet } from 'react-native';
export const getGlobalStyles = () =>
  StyleSheet.create({
    // probably define all the styles we're gonna use like header, subheader, subtitle, formInput, formButton, button, confirmButton, etc.
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