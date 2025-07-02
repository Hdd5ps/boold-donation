import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useBlood} from '../context/BloodContext';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const {user} = useAuth();
  const {bloodRequests, addNotification} = useBlood();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const quickActions = [
    {
      id: 'request',
      title: 'Request Blood',
      icon: 'local-hospital',
      color: '#E53E3E',
      screen: 'RequestBlood',
    },
    {
      id: 'donate',
      title: 'Donate Blood',
      icon: 'favorite',
      color: '#38A169',
      screen: 'DonateBlood',
    },
    {
      id: 'find',
      title: 'Find Donors',
      icon: 'search',
      color: '#3182CE',
      screen: 'FindDonors',
    },
    {
      id: 'history',
      title: 'History',
      icon: 'history',
      color: '#805AD5',
      screen: 'History',
    },
  ];

  const urgentRequests = [
    {
      id: '1',
      bloodType: 'O-',
      hospital: 'City General Hospital',
      urgency: 'Critical',
      distance: '2.1 km',
      unitsNeeded: 3,
    },
    {
      id: '2',
      bloodType: 'AB+',
      hospital: 'Memorial Medical Center',
      urgency: 'Urgent',
      distance: '4.5 km',
      unitsNeeded: 2,
    },
  ];

  const handleQuickAction = (action) => {
    if (action.screen === 'FindDonors' || action.screen === 'History') {
      navigation.navigate(action.screen);
    } else {
      navigation.navigate(action.screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#E53E3E', '#C53030']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, {user?.name || 'User'}!</Text>
              <Text style={styles.subGreeting}>Ready to save lives today?</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}>
              <Icon name="person" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.donationCount || 0}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.bloodType || 'N/A'}</Text>
              <Text style={styles.statLabel}>Blood Type</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Lives Saved</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}>
                <View
                  style={[
                    styles.quickActionIcon,
                    {backgroundColor: action.color},
                  ]}>
                  <Icon name={action.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Urgent Blood Requests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Urgent Requests</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {urgentRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.bloodTypeContainer}>
                  <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
                </View>
                <View
                  style={[
                    styles.urgencyBadge,
                    {
                      backgroundColor:
                        request.urgency === 'Critical' ? '#E53E3E' : '#FF8C00',
                    },
                  ]}>
                  <Text style={styles.urgencyText}>{request.urgency}</Text>
                </View>
              </View>
              
              <Text style={styles.hospitalName}>{request.hospital}</Text>
              <View style={styles.requestDetails}>
                <View style={styles.requestDetail}>
                  <Icon name="location-on" size={14} color="#666" />
                  <Text style={styles.detailText}>{request.distance}</Text>
                </View>
                <View style={styles.requestDetail}>
                  <Icon name="opacity" size={14} color="#666" />
                  <Text style={styles.detailText}>
                    {request.unitsNeeded} units needed
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.respondButton}>
                <Text style={styles.respondButtonText}>Respond</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Blood Compatibility Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Type Compatibility</Text>
          <View style={styles.compatibilityCard}>
            <Text style={styles.compatibilityTitle}>
              Your Blood Type: {user?.bloodType || 'Unknown'}
            </Text>
            <Text style={styles.compatibilityDescription}>
              {user?.bloodType === 'O-'
                ? 'You are a universal donor! Your blood can help anyone.'
                : user?.bloodType === 'AB+'
                ? 'You can receive blood from any donor type.'
                : 'Check compatibility chart for donation guidelines.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 10,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bloodTypeContainer: {
    backgroundColor: '#E53E3E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bloodTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  urgencyBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  requestDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  respondButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  respondButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  compatibilityCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  compatibilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  compatibilityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;
