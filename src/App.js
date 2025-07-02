import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabNavigator from './navigation/MainTabNavigator';
import RequestBloodScreen from './screens/RequestBloodScreen';
import DonateBloodScreen from './screens/DonateBloodScreen';
import ProfileScreen from './screens/ProfileScreen';

// Context
import {AuthProvider} from './context/AuthContext';
import {BloodProvider} from './context/BloodContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BloodProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#E53E3E" barStyle="light-content" />
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#E53E3E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: 'Create Account'}}
              />
              <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RequestBlood"
                component={RequestBloodScreen}
                options={{title: 'Request Blood'}}
              />
              <Stack.Screen
                name="DonateBlood"
                component={DonateBloodScreen}
                options={{title: 'Donate Blood'}}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{title: 'Profile'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BloodProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
