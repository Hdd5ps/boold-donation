import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useBlood} from '../context/BloodContext';

const DonationHistoryScreen = () => {
  const {donationHistory} = useBlood();

  const mockHistory = [
    {
      id: '1',
      type: 'donation',
      date: '2024-06-15',
      location: 'City General Hospital',
      bloodType: 'O+',
      units: 1,
      status: 'completed',
    },
    {
      id: '2',
      type: 'request',
      date: '2024-05-20',
      location: 'Memorial Medical Center',
      bloodType: 'O+',
      units: 2,
      status: 'fulfilled',
    },
    {
      id: '3',
      type: 'donation',
      date: '2024-03-10',
      location: 'Red Cross Blood Center',
      bloodType: 'O+',
      units: 1,
      status: 'completed',
    },
    {
      id: '4',
      type: 'scheduled',
      date: '2024-07-08',
      location: 'Community Health Center',
      bloodType: 'O+',
      units: 1,
      status: 'upcoming',
    },
  ];

  const allHistory = [...donationHistory, ...mockHistory];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'fulfilled':
        return '#38A169';
      case 'upcoming':
      case 'scheduled':
        return '#3182CE';
      case 'cancelled':
        return '#E53E3E';
      default:
        return '#666';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'donation':
        return 'favorite';
      case 'request':
        return 'local-hospital';
      case 'scheduled':
        return 'schedule';
      default:
        return 'history';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'donation':
        return '#38A169';
      case 'request':
        return '#E53E3E';
      case 'scheduled':
        return '#3182CE';
      default:
        return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderHistoryItem = ({item}) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <View style={[styles.typeIcon, {backgroundColor: getTypeColor(item.type)}]}>
            <Icon name={getTypeIcon(item.type)} size={20} color="#fff" />
          </View>
          <View style={styles.typeInfo}>
            <Text style={styles.typeTitle}>
              {item.type === 'donation' ? 'Blood Donation' : 
               item.type === 'request' ? 'Blood Request' : 'Scheduled Donation'}
            </Text>
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item.status)}]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="opacity" size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.bloodType} • {item.units} unit(s)
          </Text>
        </View>
      </View>
      
      {item.status === 'upcoming' && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const statsData = [
    {
      title: 'Total Donations',
      value: allHistory.filter(item => item.type === 'donation' && item.status === 'completed').length,
      icon: 'favorite',
      color: '#38A169',
    },
    {
      title: 'Lives Saved',
      value: allHistory.filter(item => item.type === 'donation' && item.status === 'completed').length * 3,
      icon: 'people',
      color: '#3182CE',
    },
    {
      title: 'Units Donated',
      value: allHistory.filter(item => item.type === 'donation' && item.status === 'completed').reduce((total, item) => total + item.units, 0),
      icon: 'opacity',
      color: '#E53E3E',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, {backgroundColor: stat.color}]}>
                  <Icon name={stat.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>History</Text>
          {allHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="history" size={60} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No History Yet</Text>
              <Text style={styles.emptyStateText}>
                Your donation and request history will appear here.
              </Text>
            </View>
          ) : (
            <FlatList
              data={allHistory.sort((a, b) => new Date(b.date) - new Date(a.date))}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
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
  statsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  historySection: {
    padding: 20,
  },
  historyCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
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
  actionButton: {
    backgroundColor: '#3182CE',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default DonationHistoryScreen;
