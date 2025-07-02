import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useAuth} from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const {user, logout, updateProfile} = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodType: user?.bloodType || '',
    location: user?.location || '',
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSave = () => {
    if (!editData.name || !editData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    updateProfile(editData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const profileStats = [
    {
      title: 'Total Donations',
      value: user?.donationCount || 0,
      icon: 'favorite',
      color: '#E53E3E',
    },
    {
      title: 'Lives Saved',
      value: (user?.donationCount || 0) * 3,
      icon: 'people',
      color: '#38A169',
    },
    {
      title: 'Requests Fulfilled',
      value: '2',
      icon: 'local-hospital',
      color: '#3182CE',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}>
            <Icon name={isEditing ? 'close' : 'edit'} size={20} color="#E53E3E" />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person" size={50} color="#E53E3E" />
            </View>
            <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
            <View style={styles.bloodTypeBadge}>
              <Text style={styles.bloodTypeBadgeText}>
                {user?.bloodType || 'Unknown'}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, {backgroundColor: stat.color}]}>
                  <Icon name={stat.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.name}
                onChangeText={(text) => setEditData({...editData, name: text})}
                placeholder="Enter your full name"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.name || 'Not set'}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.email}
                onChangeText={(text) => setEditData({...editData, email: text})}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.email || 'Not set'}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.phone}
                onChangeText={(text) => setEditData({...editData, phone: text})}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.phone || 'Not set'}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Blood Type</Text>
            {isEditing ? (
              <TouchableOpacity
                style={styles.bloodTypeSelector}
                onPress={() => setShowBloodTypeModal(true)}>
                <Text style={styles.bloodTypeSelectorText}>
                  {editData.bloodType || 'Select Blood Type'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
              </TouchableOpacity>
            ) : (
              <Text style={styles.fieldValue}>{user?.bloodType || 'Not set'}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Location</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.location}
                onChangeText={(text) => setEditData({...editData, location: text})}
                placeholder="Enter your location"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.location || 'Not set'}</Text>
            )}
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="notifications" size={24} color="#666" />
            <Text style={styles.settingText}>Notification Settings</Text>
            <Icon name="arrow-forward-ios" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="security" size={24} color="#666" />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <Icon name="arrow-forward-ios" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="help" size={24} color="#666" />
            <Text style={styles.settingText}>Help & Support</Text>
            <Icon name="arrow-forward-ios" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Icon name="info" size={24} color="#666" />
            <Text style={styles.settingText}>About</Text>
            <Icon name="arrow-forward-ios" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#E53E3E" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
                  setEditData({...editData, bloodType: type});
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 0,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#E53E3E',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#E53E3E',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bloodTypeBadge: {
    backgroundColor: '#E53E3E',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  bloodTypeBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  settingsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
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
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
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
  bloodTypeSelector: {
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
  bloodTypeSelectorText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
    marginLeft: 15,
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
});

export default ProfileScreen;
