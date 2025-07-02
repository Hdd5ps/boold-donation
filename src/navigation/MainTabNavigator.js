import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DonationHistoryScreen from '../screens/DonationHistoryScreen';
import FindDonorsScreen from '../screens/FindDonorsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'FindDonors') {
            iconName = 'search';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E53E3E',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#E53E3E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="History"
        component={DonationHistoryScreen}
        options={{title: 'History'}}
      />
      <Tab.Screen
        name="FindDonors"
        component={FindDonorsScreen}
        options={{title: 'Find Donors'}}
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
