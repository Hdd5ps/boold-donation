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

const NotificationsScreen = () => {
  const {notifications} = useBlood();

  const mockNotifications = [
    {
      id: '1',
      title: 'Blood Request Nearby',
      message: 'Emergency blood request for O+ at City General Hospital, 2.1 km away.',
      type: 'urgent',
      timestamp: '2024-07-02T10:30:00Z',
      read: false,
    },
    {
      id: '2',
      title: 'Donation Reminder',
      message: 'Your scheduled donation at Red Cross Center is tomorrow at 2:00 PM.',
      type: 'reminder',
      timestamp: '2024-07-01T16:00:00Z',
      read: false,
    },
    {
      id: '3',
      title: 'Thank You!',
      message: 'Your blood donation helped save 3 lives. Thank you for your contribution!',
      type: 'success',
      timestamp: '2024-06-30T14:22:00Z',
      read: true,
    },
    {
      id: '4',
      title: 'Blood Drive Event',
      message: 'Join the community blood drive this weekend at Memorial Hospital.',
      type: 'info',
      timestamp: '2024-06-29T09:15:00Z',
      read: true,
    },
    {
      id: '5',
      title: 'Eligibility Update',
      message: 'You are now eligible to donate blood again. Schedule your next donation!',
      type: 'info',
      timestamp: '2024-06-28T11:45:00Z',
      read: true,
    },
  ];

  const allNotifications = [...notifications, ...mockNotifications];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return 'warning';
      case 'reminder':
        return 'schedule';
      case 'success':
        return 'check-circle';
      case 'info':
        return 'info';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent':
        return '#E53E3E';
      case 'reminder':
        return '#FF8C00';
      case 'success':
        return '#38A169';
      case 'info':
        return '#3182CE';
      default:
        return '#666';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
      <View style={styles.notificationHeader}>
        <View style={[styles.notificationIcon, {backgroundColor: getNotificationColor(item.type)}]}>
          <Icon name={getNotificationIcon(item.type)} size={20} color="#fff" />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
              {item.title}
            </Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const unreadCount = allNotifications.filter(notification => !notification.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllButtonText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {allNotifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="notifications-none" size={60} color="#ccc" />
          <Text style={styles.emptyStateTitle}>No Notifications</Text>
          <Text style={styles.emptyStateText}>
            You'll receive notifications about blood requests, donation reminders, and updates here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={allNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  markAllButton: {
    alignSelf: 'flex-start',
  },
  markAllButtonText: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsList: {
    padding: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadCard: {
    backgroundColor: '#FFF8F8',
    borderLeftWidth: 4,
    borderLeftColor: '#E53E3E',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53E3E',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
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
    paddingHorizontal: 20,
  },
});

export default NotificationsScreen;
