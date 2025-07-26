# Backend Integration Plan for Blood Donation App

## 🔥 Firebase Backend Setup (Recommended)

### Why Firebase?
- **Real-time Database**: Perfect for live blood requests
- **Authentication**: Built-in user management
- **Cloud Functions**: Serverless API endpoints
- **Push Notifications**: FCM integration
- **Hosting**: For admin dashboard
- **Fast Setup**: Can be implemented in 1-2 days

### Implementation Steps

#### 1. Install Firebase Dependencies
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/messaging @react-native-firebase/functions
```

#### 2. Data Structure
```javascript
// Users Collection
users: {
  userId: {
    name: string,
    email: string,
    bloodType: string,
    phone: string,
    location: GeoPoint,
    isAvailable: boolean,
    lastDonation: timestamp,
    donationCount: number,
    verified: boolean
  }
}

// Blood Requests Collection
bloodRequests: {
  requestId: {
    bloodType: string,
    urgency: 'normal' | 'urgent' | 'critical',
    hospital: string,
    location: GeoPoint,
    unitsNeeded: number,
    contactInfo: object,
    status: 'open' | 'fulfilled' | 'expired',
    createdAt: timestamp,
    expiresAt: timestamp
  }
}

// Donations Collection
donations: {
  donationId: {
    donorId: string,
    recipientId: string,
    bloodType: string,
    donationDate: timestamp,
    location: string,
    status: 'scheduled' | 'completed' | 'cancelled'
  }
}
```

#### 3. Real-time Features
- Live blood request updates
- Donor availability status
- Push notifications for urgent requests
- Location-based matching

#### 4. Security Rules
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Blood requests are readable by all authenticated users
    match /bloodRequests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.createdBy;
    }
  }
}
```

## 🛠️ Alternative: Express.js + MongoDB Backend

### Quick Setup Option
```bash
# Create backend directory
mkdir blood-donation-backend
cd blood-donation-backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose bcryptjs jsonwebtoken cors dotenv express-rate-limit helmet
npm install -D nodemon

# Create basic server structure
```

### API Endpoints Structure
```javascript
// Authentication
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

// Blood Requests
GET /api/blood-requests
POST /api/blood-requests
PUT /api/blood-requests/:id
DELETE /api/blood-requests/:id

// Donors
GET /api/donors/search
GET /api/donors/nearby
PUT /api/donors/availability

// Donations
GET /api/donations/history
POST /api/donations/schedule
PUT /api/donations/:id/status

// Notifications
POST /api/notifications/send
GET /api/notifications/user/:id
```

## 📱 React Native Integration Updates

### Update AuthContext for Real API
```javascript
// Replace mock login with Firebase/API calls
const login = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    // Fetch additional user data from Firestore
    const userData = await firestore().collection('users').doc(user.uid).get();
    dispatch({type: 'LOGIN', payload: userData.data()});
  } catch (error) {
    throw new Error(error.message);
  }
};
```

### Update BloodContext for Real Data
```javascript
// Replace mock data with Firestore real-time listeners
const subscribeToBloodRequests = () => {
  return firestore()
    .collection('bloodRequests')
    .where('status', '==', 'open')
    .orderBy('urgency')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({type: 'SET_BLOOD_REQUESTS', payload: requests});
    });
};
```

## 🚀 Deployment Options

### Option 1: Vercel + Firebase
- Frontend: Deploy on Vercel
- Backend: Firebase (serverless)
- Database: Firestore
- **Cost**: Free tier available

### Option 2: Railway + MongoDB Atlas
- Backend: Deploy Express.js on Railway
- Database: MongoDB Atlas
- **Cost**: $5-10/month

### Option 3: AWS/Google Cloud
- Full cloud deployment
- Scalable infrastructure
- **Cost**: $20-50/month

## 📋 Implementation Priority

### Phase 1 (Week 1)
1. ✅ Resolve APK build issues
2. 🔥 Setup Firebase project
3. 🔧 Replace authentication system
4. 📱 Update core screens with real data

### Phase 2 (Week 2)
1. 🔄 Implement real-time blood requests
2. 📍 Add location-based features
3. 🔔 Setup push notifications
4. 🧪 Testing and bug fixes

### Phase 3 (Week 3-4)
1. 🏥 Hospital admin dashboard
2. 📊 Analytics and reporting
3. 🎯 Performance optimization
4. 🚀 Production deployment

## 💡 Quick Win Solutions

### Immediate Actions (Today)
1. Try optimized APK build script
2. Setup GitHub Actions for automated builds
3. Create Firebase project
4. Plan backend integration

### This Week
1. Implement Firebase authentication
2. Replace mock data with real database
3. Add push notifications
4. Deploy beta version
