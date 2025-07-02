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
import Modal from 'react-native-modal';
import {useBlood} from '../context/BloodContext';
import {useAuth} from '../context/AuthContext';

const RequestBloodScreen = ({navigation}) => {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [unitsNeeded, setUnitsNeeded] = useState('1');
  const [hospitalName, setHospitalName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  
  const {addBloodRequest, addNotification} = useBlood();
  const {user} = useAuth();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Normal', 'Urgent', 'Critical'];

  const handleSubmitRequest = () => {
    if (!selectedBloodType || !hospitalName || !contactNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const request = {
      bloodType: selectedBloodType,
      urgency: urgency,
      unitsNeeded: parseInt(unitsNeeded),
      hospitalName: hospitalName,
      contactNumber: contactNumber,
      additionalInfo: additionalInfo,
      requesterName: user?.name,
      location: user?.location,
    };

    addBloodRequest(request);
    addNotification({
      title: 'Blood Request Submitted',
      message: `Your request for ${unitsNeeded} unit(s) of ${selectedBloodType} blood has been submitted.`,
      type: 'success',
    });

    Alert.alert(
      'Success',
      'Your blood request has been submitted successfully. We will notify nearby donors.',
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
            <Icon name="local-hospital" size={40} color="#E53E3E" />
            <Text style={styles.headerTitle}>Request Blood</Text>
            <Text style={styles.headerSubtitle}>
              Help us find the right donors for you
            </Text>
          </View>

          <View style={styles.form}>
            {/* Blood Type Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Blood Type Required <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowBloodTypeModal(true)}>
                <Text style={[styles.dropdownText, !selectedBloodType && styles.placeholder]}>
                  {selectedBloodType || 'Select Blood Type'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Urgency Level */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Urgency Level</Text>
              <View style={styles.urgencyContainer}>
                {urgencyLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.urgencyButton,
                      urgency === level && styles.urgencyButtonActive,
                    ]}
                    onPress={() => setUrgency(level)}>
                    <Text
                      style={[
                        styles.urgencyButtonText,
                        urgency === level && styles.urgencyButtonTextActive,
                      ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Units Needed */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Units Needed</Text>
              <TextInput
                style={styles.input}
                value={unitsNeeded}
                onChangeText={setUnitsNeeded}
                keyboardType="numeric"
                placeholder="Number of units"
              />
            </View>

            {/* Hospital Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Hospital/Medical Center <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={hospitalName}
                onChangeText={setHospitalName}
                placeholder="Enter hospital name"
              />
            </View>

            {/* Contact Number */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Contact Number <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Emergency contact number"
                keyboardType="phone-pad"
              />
            </View>

            {/* Additional Information */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Additional Information</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                placeholder="Any additional details about the requirement"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Blood Type Selection Modal */}
      <Modal
        isVisible={showBloodTypeModal}
        onBackdropPress={() => setShowBloodTypeModal(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Blood Type</Text>
          <View style={styles.bloodTypeGrid}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.bloodTypeOption}
                onPress={() => {
                  setSelectedBloodType(type);
                  setShowBloodTypeModal(false);
                }}>
                <Text style={styles.bloodTypeOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowBloodTypeModal(false)}>
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#E53E3E',
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
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f8f9fa',
  },
  urgencyButtonActive: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  urgencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  urgencyButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  bloodTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bloodTypeOption: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bloodTypeOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  modalCloseButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});

export default RequestBloodScreen;
