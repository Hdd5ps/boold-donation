import React, {createContext, useContext, useReducer} from 'react';

const BloodContext = createContext();

const bloodReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOOD_REQUESTS':
      return {
        ...state,
        bloodRequests: action.payload,
      };
    case 'ADD_BLOOD_REQUEST':
      return {
        ...state,
        bloodRequests: [action.payload, ...state.bloodRequests],
      };
    case 'SET_DONATION_HISTORY':
      return {
        ...state,
        donationHistory: action.payload,
      };
    case 'ADD_DONATION':
      return {
        ...state,
        donationHistory: [action.payload, ...state.donationHistory],
      };
    case 'SET_DONORS':
      return {
        ...state,
        availableDonors: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    default:
      return state;
  }
};

const initialState = {
  bloodRequests: [],
  donationHistory: [],
  availableDonors: [],
  notifications: [],
};

export const BloodProvider = ({children}) => {
  const [state, dispatch] = useReducer(bloodReducer, initialState);

  const addBloodRequest = (request) => {
    const newRequest = {
      id: Date.now().toString(),
      ...request,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    dispatch({type: 'ADD_BLOOD_REQUEST', payload: newRequest});
  };

  const addDonation = (donation) => {
    const newDonation = {
      id: Date.now().toString(),
      ...donation,
      donatedAt: new Date().toISOString(),
    };
    dispatch({type: 'ADD_DONATION', payload: newDonation});
  };

  const findDonors = (bloodType, location) => {
    // Mock data - in real app, this would be an API call
    const mockDonors = [
      {
        id: '1',
        name: 'John Doe',
        bloodType: bloodType,
        location: 'Downtown Hospital',
        distance: '2.5 km',
        lastDonation: '2024-01-15',
        phone: '+1234567890',
      },
      {
        id: '2',
        name: 'Jane Smith',
        bloodType: bloodType,
        location: 'City Medical Center',
        distance: '3.2 km',
        lastDonation: '2024-02-10',
        phone: '+1234567891',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        bloodType: bloodType,
        location: 'Community Health Center',
        distance: '4.1 km',
        lastDonation: '2024-01-28',
        phone: '+1234567892',
      },
    ];
    dispatch({type: 'SET_DONORS', payload: mockDonors});
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
    };
    dispatch({type: 'ADD_NOTIFICATION', payload: newNotification});
  };

  return (
    <BloodContext.Provider
      value={{
        ...state,
        addBloodRequest,
        addDonation,
        findDonors,
        addNotification,
      }}>
      {children}
    </BloodContext.Provider>
  );
};

export const useBlood = () => {
  const context = useContext(BloodContext);
  if (!context) {
    throw new Error('useBlood must be used within a BloodProvider');
  }
  return context;
};
