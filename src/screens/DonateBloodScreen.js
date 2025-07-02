import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {useBlood} from '../context/BloodContext';
import {useAuth} from '../context/AuthContext';

const DonateBloodScreen = ({navigation}) => {
  const [donationCenter, setDonationCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState('');
  
  const {addDonation, addNotification} = useBlood();
  const {user} = useAuth();

  const donationCenters = [
    'City General Hospital Blood Bank',
    'Red Cross Blood Center',
    'Memorial Medical Center',
    'Community Health Blood Drive',
    'University Hospital Blood Bank',
  ];

  const handleScheduleDonation = () => {
    if (!donationCenter) {
      Alert.alert('Error', 'Please select a donation center');
      return;
    }

    const donation = {
      donorName: user?.name,
      bloodType: user?.bloodType,
      donationCenter: donationCenter,
      scheduledDate: selectedDate.toISOString(),
      notes: notes,
      status: 'scheduled',
    };

    addDonation(donation);
    addNotification({
      title: 'Donation Scheduled',
      message: `Your blood donation has been scheduled for ${selectedDate.toLocaleDateString()} at ${donationCenter}.`,
      type: 'success',
    });

    Alert.alert(
      'Success',
      `Your donation has been scheduled for ${selectedDate.toLocaleDateString()} at ${donationCenter}. You will receive a reminder notification.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerCard}>
            <Icon name="favorite" size={40} color="#38A169" />
            <Text style={styles.headerTitle}>Donate Blood</Text>
            <Text style={styles.headerSubtitle}>
              Schedule your blood donation and save lives
            </Text>
          </View>

          <View style={styles.donorInfoCard}>
            <Text style={styles.cardTitle}>Donor Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{user?.name || 'Not available'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Blood Type:</Text>
              <Text style={styles.infoValue}>{user?.bloodType || 'Not available'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Donation:</Text>
              <Text style={styles.infoValue}>{user?.lastDonation || 'First time'}</Text>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Schedule Donation</Text>

            {/* Donation Center */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Donation Center <Text style={styles.required}>*</Text>
              </Text>
              {donationCenters.map((center) => (
                <TouchableOpacity
                  key={center}
                  style={[
                    styles.centerOption,
                    donationCenter === center && styles.centerOptionSelected,
                  ]}
                  onPress={() => setDonationCenter(center)}>
                  <View style={styles.radioButton}>
                    {donationCenter === center && <View style={styles.radioButtonSelected} />}
                  </View>
                  <Text style={styles.centerOptionText}>{center}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Date Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Preferred Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}>
                <Icon name="event" size={20} color="#666" />
                <Text style={styles.dateButtonText}>
                  {selectedDate.toLocaleDateString()}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Additional Notes */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Additional Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special instructions or medical information"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.eligibilityCard}>
              <Text style={styles.eligibilityTitle}>Donation Eligibility</Text>
              <Text style={styles.eligibilityText}>
                • You must be at least 17 years old
              </Text>
              <Text style={styles.eligibilityText}>
                • Weigh at least 110 pounds
              </Text>
              <Text style={styles.eligibilityText}>
                • Wait 56 days between whole blood donations
              </Text>
              <Text style={styles.eligibilityText}>
                • Be in good health and feeling well
              </Text>
            </View>

            <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleDonation}>
              <Text style={styles.scheduleButtonText}>Schedule Donation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <DatePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  donorInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  required: {
    color: '#E53E3E',
  },
  centerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  centerOptionSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#38A169',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#38A169',
  },
  centerOptionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 100,
  },
  eligibilityCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#E53E3E',
  },
  eligibilityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
    marginBottom: 10,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  scheduleButton: {
    backgroundColor: '#38A169',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DonateBloodScreen;
