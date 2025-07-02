import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useBlood} from '../context/BloodContext';

const FindDonorsScreen = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState('10');
  
  const {availableDonors, findDonors} = useBlood();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyOptions = ['All', 'Normal', 'Urgent', 'Critical'];
  const distanceOptions = ['5', '10', '20', '50'];

  const handleSearch = () => {
    if (!selectedBloodType) {
      Alert.alert('Error', 'Please select a blood type to search');
      return;
    }
    findDonors(selectedBloodType, searchLocation);
  };

  const handleCallDonor = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleMessageDonor = (phoneNumber) => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.bloodTypeSelector}
            onPress={() => setShowBloodTypeModal(true)}>
            <Text style={[styles.bloodTypeSelectorText, !selectedBloodType && styles.placeholder]}>
              {selectedBloodType || 'Blood Type'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.locationInput}
            placeholder="Location"
            value={searchLocation}
            onChangeText={setSearchLocation}
          />
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}>
          <Icon name="tune" size={20} color="#E53E3E" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {availableDonors.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="search" size={60} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Donors Found</Text>
            <Text style={styles.emptyStateText}>
              {selectedBloodType 
                ? `Try searching for a different blood type or expand your search radius.`
                : 'Select a blood type and search to find available donors.'
              }
            </Text>
          </View>
        ) : (
          <View style={styles.resultsList}>
            <Text style={styles.resultsHeader}>
              {availableDonors.length} donor(s) found for {selectedBloodType}
            </Text>
            
            {availableDonors.map((donor) => (
              <View key={donor.id} style={styles.donorCard}>
                <View style={styles.donorHeader}>
                  <View style={styles.donorInfo}>
                    <Text style={styles.donorName}>{donor.name}</Text>
                    <View style={styles.bloodTypeBadge}>
                      <Text style={styles.bloodTypeBadgeText}>{donor.bloodType}</Text>
                    </View>
                  </View>
                  <View style={styles.statusContainer}>
                    <View style={styles.availableIndicator} />
                    <Text style={styles.statusText}>Available</Text>
                  </View>
                </View>
                
                <View style={styles.donorDetails}>
                  <View style={styles.detailRow}>
                    <Icon name="location-on" size={16} color="#666" />
                    <Text style={styles.detailText}>{donor.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="near-me" size={16} color="#666" />
                    <Text style={styles.detailText}>{donor.distance} away</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="schedule" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      Last donated {getDaysAgo(donor.lastDonation)} days ago
                    </Text>
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => handleCallDonor(donor.phone)}>
                    <Icon name="phone" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Call</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.messageButton]}
                    onPress={() => handleMessageDonor(donor.phone)}>
                    <Icon name="message" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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

      {/* Filters Modal */}
      <Modal
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Search Filters</Text>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Urgency</Text>
            <View style={styles.optionsContainer}>
              {urgencyOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    urgencyFilter === option && styles.filterOptionSelected,
                  ]}
                  onPress={() => setUrgencyFilter(option)}>
                  <Text style={[
                    styles.filterOptionText,
                    urgencyFilter === option && styles.filterOptionTextSelected,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Distance (km)</Text>
            <View style={styles.optionsContainer}>
              {distanceOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    distanceFilter === option && styles.filterOptionSelected,
                  ]}
                  onPress={() => setDistanceFilter(option)}>
                  <Text style={[
                    styles.filterOptionText,
                    distanceFilter === option && styles.filterOptionTextSelected,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.applyFiltersButton}
            onPress={() => setShowFilters(false)}>
            <Text style={styles.applyFiltersButtonText}>Apply Filters</Text>
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
  searchHeader: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bloodTypeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    minWidth: 100,
  },
  bloodTypeSelectorText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  placeholder: {
    color: '#999',
  },
  locationInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 40,
  },
  resultsList: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  donorCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  donorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  donorInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bloodTypeBadge: {
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  bloodTypeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38A169',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#38A169',
    fontWeight: '600',
  },
  donorDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: '#38A169',
  },
  messageButton: {
    backgroundColor: '#3182CE',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
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
    marginBottom: 20,
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
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterOptionSelected: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  modalCloseButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  applyFiltersButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyFiltersButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FindDonorsScreen;
