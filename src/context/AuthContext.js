import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {...state.user, ...action.payload},
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        dispatch({type: 'LOGIN', payload: JSON.parse(userData)});
      } else {
        dispatch({type: 'SET_LOADING', payload: false});
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      dispatch({type: 'LOGIN', payload: userData});
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch({type: 'LOGOUT'});
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = {...state.user, ...profileData};
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      dispatch({type: 'UPDATE_PROFILE', payload: profileData});
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
